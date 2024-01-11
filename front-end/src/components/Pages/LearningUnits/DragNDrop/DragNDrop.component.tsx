/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableStyle,
  DropResult,
} from '@hello-pangea/dnd';

// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help with reordering the result
const reorder = <TList extends unknown[]>(
  list: TList,
  startIndex: number,
  endIndex: number,
): TList => {
  const result = Array.from(list) as TList;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggableStyle = {},
) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none' as const,
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'red',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'grey',
  padding: grid,
  width: 250,
  margin: '0 16px', // Added margin to separate droppable areas
});

interface Item {
  id: string;
  content: string;
}

interface DraggableListProps {
  items: Item[];
}
interface CustomDraggableProps {
  draggingStyle?: React.CSSProperties;
}

const DraggableList: React.FC<DraggableListProps> = ({ items }) => {
  const [draggableItems, setDraggableItems] = useState(items);
  const [additionalDroppableItems, setAdditionalDroppableItems] = useState<
    Item[]
  >([]);

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === 'droppable2') {
      // Item is dropped in the additional droppable area
      const draggedItem = draggableItems[result.source.index];

      // Remove the item from the first droppable area
      const updatedItems = draggableItems.filter(
        (_, index) => index !== result.source.index,
      );
      setDraggableItems(updatedItems);

      // Insert the item at the specified index in the second droppable area
      const newIndex = result.destination.index;
      setAdditionalDroppableItems((prevItems) => [
        ...prevItems.slice(0, newIndex),
        draggedItem,
        ...prevItems.slice(newIndex),
      ]);
    } else {
      const updatedItems = reorder(
        draggableItems,
        result.source.index,
        result.destination.index,
      );

      setDraggableItems(updatedItems);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={(ref) => droppableProvided.innerRef(ref)}
            style={getListStyle(droppableSnapshot.isDraggingOver)}
          >
            {draggableItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={(ref) => draggableProvided.innerRef(ref)}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    style={{
                      ...getItemStyle(
                        draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style,
                      ),
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Additional Droppable Area */}
      <Droppable droppableId="droppable2">
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={(ref) => droppableProvided.innerRef(ref)}
            style={getListStyle(droppableSnapshot.isDraggingOver)}
          >
            {additionalDroppableItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={(ref) => draggableProvided.innerRef(ref)}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    style={{
                      ...getItemStyle(
                        draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style,
                      ),
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// Example usage:
const DragNDrop: React.FC = () => {
  const items = getItems(10);

  return <DraggableList items={items} />;
};

export default DragNDrop;
