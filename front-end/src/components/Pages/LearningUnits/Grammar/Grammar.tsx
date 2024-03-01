import React from 'react';
import DragNDrop from '../DragNDrop/DragNDrop.component';
import { dragNdropQuestions } from '../constants';

const Grammar: React.FC = () => {
  return (
    <div>
      <DragNDrop questions={dragNdropQuestions} />
    </div>
  );
};

export default Grammar;
