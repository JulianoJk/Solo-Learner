import React from 'react';
import DragNDrop from './DragNDrop.component';

const Grammar: React.FC = () => {
  const questions = [
    {
      items: ['I', 'YOU', 'HE', 'SHE', 'IT', 'WE', 'THEY'],
      text: 'The pronouns are: ___, hello there.',
      correctAnswers: ['I'],
    },
    {
      items: ['1', '2', '3', '4', '5'],
      text: 'Question 2: 2 + 2 = ___.',
      correctAnswers: ['4'],
    },
    // Add more questions as needed
  ];

  return (
    <div>
      <h2>{'asduasdu'}</h2>
      <DragNDrop questions={questions} />
    </div>
  );
};

export default Grammar;
