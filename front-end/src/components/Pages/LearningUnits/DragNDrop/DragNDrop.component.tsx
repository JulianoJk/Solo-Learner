import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from '@hello-pangea/dnd';

interface Item {
  id: string;
  content: string;
}

// Initial draggable items for the exercise
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

// Styles
const grid = 4;
const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: React.CSSProperties,
): React.CSSProperties => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'lightgrey',
  border: '1px solid black',
  borderRadius: '4px',
  ...draggableStyle,
  display: 'inline-flex', // Make it inline for fitting in text
  width: 'auto', // Adjust width based on content
  height: 'auto', // Adjust height based on content
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '12px',
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? 'lightblue' : 'transparent', // Make droppable area less visible
  display: 'inline-block',
  padding: grid,
  minHeight: '2rem',
  minWidth: '5rem',
  lineHeight: '20px', // Align with text
});

const GrammarExercise: React.FC = () => {
  const [items] = useState<Item[]>(initialDraggableItems); // Removed setItems as it's unused
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.droppableId === 'sentenceDropzone') {
      const item = items.find((i) => i.id === result.draggableId);
      if (item) setSelectedItem(item); // Set or replace the item in the sentence
    } else if (selectedItem?.id === result.draggableId) {
      setSelectedItem(null); // Remove from sentence if dragged back
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="optionsList" direction="horizontal">
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            style={{ display: 'flex', padding: '8px', overflow: 'auto' }}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided: DraggableProvided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
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
      <div style={{ marginTop: '20px', fontSize: '16px' }}>
        The dogs
        <Droppable droppableId="sentenceDropzone" direction="horizontal">
          {(provided: DroppableProvided, snapshot) => (
            <span
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {selectedItem ? selectedItem.content : '...'}
            </span>
          )}
        </Droppable>{' '}
        running.
      </div>
    </DragDropContext>
  );
};

export default GrammarExercise;
