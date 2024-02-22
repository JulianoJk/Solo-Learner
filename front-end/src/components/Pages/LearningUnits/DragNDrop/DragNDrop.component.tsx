import React, { useState } from 'react';
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

const initialDraggableItems: Item[] = [
  { id: 'item-1', content: 'I am' },
  { id: 'item-2', content: 'You are' },
  { id: 'item-3', content: 'He is' },
  { id: 'item-4', content: 'She is' },
  { id: 'item-5', content: 'It is' },
  { id: 'item-6', content: 'We are' },
  { id: 'item-7', content: 'You are' },
  { id: 'item-8', content: 'They are' },
];

const GrammarExercise = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.droppableId !== 'sentenceDropzone'
    )
      return;
    const item = initialDraggableItems.find((i) => i.id === result.draggableId);
    setSelectedItem(item ?? null);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        {/* Container for draggable items */}
        <Droppable droppableId="optionsList" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
                marginBottom: '20px', // Adjust spacing as needed
              }}
              {...provided.droppableProps}
            >
              {initialDraggableItems
                .filter((item) => item !== selectedItem)
                .map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: '6px 12px',
                          margin: '0 8px 8px 0',
                          background: snapshot.isDragging
                            ? '#4CAF50'
                            : '#2196F3',
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

        {/* Container for the sentence */}
        <p style={{ fontSize: '16px', textAlign: 'center' }}>
          The dogs{' '}
          <Droppable droppableId="sentenceDropzone">
            {(provided, snapshot) => (
              <span
                ref={provided.innerRef}
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
                }}
                {...provided.droppableProps}
              >
                {selectedItem ? selectedItem.content : '...'}
              </span>
            )}
          </Droppable>{' '}
          running.
        </p>
      </div>
    </DragDropContext>
  );
};

export default GrammarExercise;
