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
    () =>
      items.map((content, index) => ({
        id: `item-${index}`,
        content,
      })),
    [items],
  );

  const [availableItems, setAvailableItems] = useState<Item[]>(initialItems);
  console.log('🚀 ~ availableItems:', availableItems);
  const [placedItems, setPlacedItems] = useState<Item[]>([]);
  console.log('🚀 ~ placedItems:', placedItems);

  const sentenceParts = useMemo(() => text.split('___'), [text]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;

    const draggedItemId =
      sourceId === 'optionsList'
        ? availableItems[result.source.index].id
        : placedItems[result.source.index].id;
    const draggedItem =
      availableItems.find((item) => item.id === draggedItemId) ||
      placedItems.find((item) => item.id === draggedItemId);

    if (!draggedItem) return;

    if (sourceId === destinationId) {
      // Rearrange within the same list
      if (sourceId === 'optionsList') {
        const newAvailableItems = Array.from(availableItems);
        newAvailableItems.splice(result.source.index, 1);
        newAvailableItems.splice(result.destination.index, 0, draggedItem);
        setAvailableItems(newAvailableItems);
      } else {
        const newPlacedItems = Array.from(placedItems);
        newPlacedItems.splice(result.source.index, 1);
        newPlacedItems.splice(result.destination.index, 0, draggedItem);
        setPlacedItems(newPlacedItems);
      }
    } else {
      // Move between lists
      if (destinationId === 'optionsList') {
        setPlacedItems((prev) =>
          prev.filter((item) => item.id !== draggedItem.id),
        );

        const itemExists = availableItems.some(
          (item) => item.id === draggedItem.id,
        );
        if (!itemExists) {
          setAvailableItems((prev) => {
            const newAvailableItems = [...prev];
            if (result.destination) {
              newAvailableItems.splice(result.destination.index, 0, {
                ...draggedItem,
              });
            }
            return newAvailableItems;
          });
        }
      } else {
        setAvailableItems((prev) =>
          prev.filter((item) => item.id !== draggedItem.id),
        );

        const itemExists = placedItems.some(
          (item) => item.id === draggedItem.id,
        );
        if (!itemExists) {
          setPlacedItems((prev) => {
            const newPlacedItems = [...prev];
            if (result.destination) {
              newPlacedItems.splice(result.destination.index, 0, {
                ...draggedItem,
              });
            }
            return newPlacedItems;
          });
        }
      }
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
                <Draggable
                  key={`available-${item.id}`}
                  draggableId={`available-${item.id}`}
                  index={index}
                >
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
                          draggableId={placedItems[index].id}
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
                              {placedItems[index].content}
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
