import React, { useState, useMemo } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { Button } from '@mantine/core';

interface Item {
  id: string;
  content: string;
}

interface Question {
  id: string;
  items: string[];
  text: string;
  correctAnswers: string[];
  questionOrder: number;
}

interface DragNDropProps {
  questions: Question[];
  currentPage: number;
}

const DragNDrop: React.FC<DragNDropProps> = ({ questions, currentPage }) => {
  // Find the current question based on its order
  const currentQuestion = useMemo(() => {
    return questions.find((question) => question.questionOrder === currentPage);
  }, [currentPage, questions]);

  // If current question is not found or is undefined, handle it appropriately
  if (!currentQuestion) {
    return <div>No question found for the current page.</div>;
  }

  const [availableItems, setAvailableItems] = useState<Item[]>([]);
  const [placedItems, setPlacedItems] = useState<(Item | null)[]>([]);

  useMemo(() => {
    setAvailableItems(
      currentQuestion.items.map((content, index) => ({
        id: `item-${index}`,
        content,
      })),
    );
    setPlacedItems(
      Array(currentQuestion.text.split('___').length - 1).fill(null),
    );
  }, [currentQuestion]);

  const sentenceParts = useMemo(
    () => currentQuestion.text.split('___'),
    [currentQuestion],
  );

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
      const newAvailableItems = availableItems.filter(
        (item) => item.id !== itemBeingDragged.id,
      );
      setAvailableItems(newAvailableItems);

      setPlacedItems((prev) => {
        const newPlacedItems = [...prev];
        const replacedItem = newPlacedItems[destinationIndex];
        if (replacedItem) {
          setAvailableItems((prevAvailableItems) => [
            ...prevAvailableItems,
            replacedItem,
          ]);
        }
        newPlacedItems[destinationIndex] = itemBeingDragged;
        return newPlacedItems;
      });
    } else if (
      source.droppableId.includes('sentenceDropzone') &&
      destination.droppableId === 'optionsList'
    ) {
      setAvailableItems((prev) => [...prev, itemBeingDragged]);
      setPlacedItems((prev) =>
        prev.map((item, index) => (index === sourceIndex ? null : item)),
      );
    } else if (
      source.droppableId.includes('sentenceDropzone') &&
      destination.droppableId.includes('sentenceDropzone')
    ) {
      const newPlacedItems = [...placedItems];
      const sourceItem = placedItems[sourceIndex];
      const destinationItem = placedItems[destinationIndex];

      newPlacedItems[sourceIndex] = destinationItem;
      newPlacedItems[destinationIndex] = sourceItem;

      setPlacedItems(newPlacedItems);
    }
  };

  const handleClickOnMobile = (index: number) => {
    if (window.innerWidth <= 600) {
      const clickedItem = availableItems[index];
      const updatedAvailableItems = [...availableItems];
      const updatedPlacedItems = [...placedItems];

      // If the clicked item is from the original list
      if (clickedItem !== null) {
        const placeholderIndex = updatedPlacedItems.indexOf(null);

        // If there's an item in the placeholder, replace it with the clicked item
        if (placeholderIndex !== -1) {
          updatedPlacedItems[placeholderIndex] = clickedItem;
        } else {
          // If no placeholder available, find the first non-placeholder item and replace it
          const firstNonPlaceholderIndex = updatedPlacedItems.findIndex(
            (item) => item !== null,
          );
          updatedAvailableItems.push(
            updatedPlacedItems[firstNonPlaceholderIndex] as Item,
          ); // Cast to Item
          updatedPlacedItems[firstNonPlaceholderIndex] = clickedItem;
        }

        // Remove the clicked item from the available items list
        updatedAvailableItems.splice(index, 1);
      } else {
        // If the clicked item is from the placeholder, return it to the available items list
        const clickedItem = placedItems[index];

        if (clickedItem !== null) {
          // Move the clicked item back to the availableItems list
          setAvailableItems((prevAvailableItems) => [
            ...prevAvailableItems,
            clickedItem,
          ]);
          // Remove the clicked item from placedItems list
          setPlacedItems((prevPlacedItems) =>
            prevPlacedItems.map((item, i) => (i === index ? null : item)),
          );
        }
      }

      setAvailableItems(updatedAvailableItems);
      setPlacedItems(updatedPlacedItems);
    }
  };
  const moveItemToAvailable = (index: number) => {
    const clickedItem = placedItems[index];

    if (clickedItem !== null) {
      // Move the clicked item back to the availableItems list
      setAvailableItems((prevAvailableItems) => [
        ...prevAvailableItems,
        clickedItem,
      ]);
      // Remove the clicked item from placedItems list
      setPlacedItems((prevPlacedItems) =>
        prevPlacedItems.map((item, i) => (i === index ? null : item)),
      );
    }
  };

  const handleSubmit = () => {
    const correctAnswers = currentQuestion.correctAnswers;
    const placedContent = placedItems.map((item) => (item ? item.content : ''));

    const isCorrect =
      JSON.stringify(correctAnswers) === JSON.stringify(placedContent);
    if (isCorrect) {
      console.log('Correct!');
    } else {
      console.log('Incorrect. Please try again.');
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <div>
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
                  <div key={item.id} onClick={() => handleClickOnMobile(index)}>
                    <Draggable draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: '6px 12px',
                            margin: '0',
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
                  </div>
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
                  <Droppable
                    droppableId={`sentenceDropzone-${index}`}
                    direction="horizontal"
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          display: 'inline-block',
                          width: '100px', // Adjust the width here
                          height: '40px', // Adjust the height here
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
                            draggableId={
                              placedItems[index]?.id || 'placeholder'
                            }
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
                                onClick={() => moveItemToAvailable(index)}
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
        <Button onClick={handleSubmit} color="green">
          Submit
        </Button>
      </div>
    </DragDropContext>
  );
};

export default DragNDrop;
