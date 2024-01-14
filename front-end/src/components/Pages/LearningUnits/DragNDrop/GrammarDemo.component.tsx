import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  backgroundColor: 'red',
  border: '9px solid red',
  ...draggableStyle,
});

const dropAreaStyle: React.CSSProperties = {
  background: 'lightblue',
  padding: grid,
  backgroundColor: 'red',
  border: '9px solid red',
  width: 10,
  textAlign: 'center',
};

const verbs = ['I', 'is', 'are'];

const SentenceText = ({
  word,
  isPlaceholder,
}: {
  word: string;
  isPlaceholder?: boolean;
}) => (
  <div style={{ marginRight: '5px' }}>
    {isPlaceholder ? (
      <Droppable droppableId="drop-container">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              ...dropAreaStyle,
              background: snapshot.isDraggingOver
                ? 'lightyellow'
                : dropAreaStyle.background,
            }}
          >
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ) : (
      word
    )}
  </div>
);

const GrammarExercise = () => {
  const [sentence, setSentence] = useState(['Alicia', '___', 'working']);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const updatedSentence = [...sentence];
    const droppedVerb = verbs[result.source.index];

    // Check if there is already a verb in the drop area
    const existingVerbIndex = updatedSentence.findIndex((word) =>
      verbs.includes(word),
    );

    // Only allow one verb in the drop area
    if (existingVerbIndex !== -1) {
      updatedSentence[existingVerbIndex] = droppedVerb;
    } else {
      // Find the index of the first placeholder '___' in the sentence
      const placeholderIndex = updatedSentence.indexOf('___');

      if (placeholderIndex !== -1) {
        // Replace the first '___' with the dropped verb
        updatedSentence[placeholderIndex] = droppedVerb;
      }
    }

    setSentence(updatedSentence);
  };

  useEffect(() => {
    // Log the new sentence whenever it changes
    console.log('New Sentence:', sentence);
  }, [sentence]);

  return (
    <div style={{ width: '300px' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="draggable-verbs" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              {verbs.map((verb, index) => (
                <Draggable key={index} draggableId={verb} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      {verb}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              {sentence.map((word, index) => (
                <SentenceText
                  key={index}
                  word={word}
                  isPlaceholder={word === '___'}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default GrammarExercise;
