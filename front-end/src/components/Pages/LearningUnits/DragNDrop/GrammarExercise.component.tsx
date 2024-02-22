import React from 'react';
import DragNDrop from './DragNDrop.component'; // Assuming the DragNDrop component is in a separate file

const Grammar: React.FC = () => {
  // const lists = ['I', 'YOU', 'HE', 'SHE', 'IT', 'WE', 'THEY'];
  // make the list with numbers 1 to 5
  const lists = ['1', '2', '3', '4', '5'];
  const listsss = 'The pronouns are: ___ ___, hello there, ___.';

  return (
    <div>
      <h2>{'asduasdu'}</h2>
      <DragNDrop items={lists} text={listsss} />
    </div>
  );
};

export default Grammar;
