/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import styles from './DragNDrop.module.css';

const initialWords = ['eat', 'sleep', 'code'];
const initialSentence = ['I', '___', 'and', '___', 'every day.'];

function GrammarExercise() {
  const [words, setWords] = useState(initialWords);
  const [sentence, setSentence] = useState(initialSentence);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // Implement logic to handle the word being dropped into the sentence
    // For simplicity, this example will just replace the first blank
    const newSentence = [...sentence];
    newSentence[destination.index] = words[source.index];
    setSentence(newSentence);

    // Optionally, remove the word from the list or handle as needed
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="wordsList" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.dropzone}
          >
            {words.map((word, index) => (
              <Draggable key={word} draggableId={word} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={
                      snapshot.isDragging
                        ? styles.draggingOver
                        : styles.draggableItem
                    }
                  >
                    {word}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="sentence" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              snapshot.isDraggingOver ? styles.dropzoneHovered : styles.dropzone
            }
          >
            {sentence.map((word, index) => (
              <Draggable
                key={`${word}-${index}`}
                draggableId={`${word}-${index}`}
                index={index}
                isDragDisabled={true}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.draggableItem}
                  >
                    {word}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default GrammarExercise;
