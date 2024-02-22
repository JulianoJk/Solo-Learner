import React, { useState, useMemo } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

interface Item {
  id: string;
  content: string;
}

interface DragNDropProps {
  items: string[];
  text: string;
}

const DragNDrop: React.FC<DragNDropProps> = ({ items, text }) => {
  const initialItems = useMemo(
    () => items.map((content, index) => ({ id: `item-${index}`, content })),
    [items],
  );

  // Adjust the type definition here to allow null values
  const [availableItems, setAvailableItems] = useState<Item[]>(initialItems);
  const [placedItems, setPlacedItems] = useState<(Item | null)[]>(
    Array(text.split('___').length - 1).fill(null),
  );
  const sentenceParts = useMemo(() => text.split('___'), [text]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceIndex = source.index;
    const destinationIndex = parseInt(
      destination.droppableId.split('-')[1],
      10,
    );

    const itemBeingDragged =
      source.droppableId === 'optionsList'
        ? availableItems[sourceIndex]
        : placedItems[sourceIndex];

    if (!itemBeingDragged) return;

    if (
      source.droppableId === 'optionsList' &&
      destination.droppableId.includes('sentenceDropzone')
    ) {
      // Moving from available items to a placeholder
      setAvailableItems((prev) =>
        prev.filter((item) => item.id !== itemBeingDragged.id),
      );
      setPlacedItems((prev) => {
        const newPlacedItems = [...prev];
        newPlacedItems[destinationIndex] = itemBeingDragged; // Place item in the correct spot
        return newPlacedItems;
      });
    } else if (
      source.droppableId.includes('sentenceDropzone') &&
      destination.droppableId === 'optionsList'
    ) {
      // Moving back to available items
      setAvailableItems((prev) => [...prev, itemBeingDragged]);
      setPlacedItems((prev) =>
        prev.map((item, index) => (index === sourceIndex ? null : item)),
      );
    } else if (
      source.droppableId.includes('sentenceDropzone') &&
      destination.droppableId.includes('sentenceDropzone')
    ) {
      // Moving between placeholders
      setPlacedItems((prev) => {
        const newPlacedItems = [...prev];
        newPlacedItems[destinationIndex] = itemBeingDragged;
        if (sourceIndex !== destinationIndex) {
          newPlacedItems[sourceIndex] = null; // Clear the original position
        }
        return newPlacedItems;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <Droppable droppableId="optionsList" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              {availableItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: '6px 12px',
                        margin: '0',
                        background: snapshot.isDragging ? '#4CAF50' : '#2196F3',
                        color: 'white',
                        borderRadius: '20px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        fontSize: '14px',
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div style={{ fontSize: '16px', textAlign: 'center' }}>
          {sentenceParts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < sentenceParts.length - 1 && (
                <Droppable droppableId={`sentenceDropzone-${index}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        display: 'inline-block',
                        minWidth: '60px',
                        background: snapshot.isDraggingOver
                          ? '#F0F0F0'
                          : 'transparent',
                        padding: '4px',
                        borderRadius: '10px',
                        border: '2px dashed #BDBDBD',
                        lineHeight: '20px',
                        textAlign: 'center',
                        margin: '0 4px',
                      }}
                    >
                      {placedItems[index] ? (
                        <Draggable
                          key={placedItems[index]?.id}
                          draggableId={placedItems[index]?.id || 'placeholder'}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                padding: '6px 12px',
                                background: '#2196F3',
                                color: 'white',
                                borderRadius: '20px',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                fontSize: '14px',
                                ...provided.draggableProps.style,
                              }}
                            >
                              {placedItems[index]?.content}
                            </div>
                          )}
                        </Draggable>
                      ) : (
                        '___'
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default DragNDrop;
