import React from 'react';
import DragNDrop from '../DragNDrop/DragNDrop.component';

const Grammar: React.FC = () => {
  const questions = [
    {
      items: ['went', 'goes', 'going'],
      text: 'Yesterday, Sarah ___ (go) to the supermarket.',
      correctAnswers: ['went'],
    },
    {
      items: ['had', 'have', 'has'],
      text: 'They ___ (have) a picnic in the park last Sunday.',
      correctAnswers: ['had'],
    },
    {
      items: ['played', 'plays', 'playing'],
      text: 'My brother ___ (play) football with his friends yesterday evening.',
      correctAnswers: ['played'],
    },
    {
      items: ['visited', 'visit', 'visits'],
      text: 'We ___ (visit) the museum when we were on vacation.',
      correctAnswers: ['visited'],
    },
    {
      items: ['read', 'reads', 'reading'],
      text: 'She ___ (read) a book before going to bed.',
      correctAnswers: ['read'],
    },
    {
      items: ['watched', 'watch', 'watching'],
      text: 'Tom and Mary ___ (watch) a movie at home last night.',
      correctAnswers: ['watched'],
    },
    {
      items: ['traveled', 'travel', 'travels'],
      text: 'Last summer, they ___ (travel) to Europe.',
      correctAnswers: ['traveled'],
    },
    {
      items: ['ate', 'eat', 'eating'],
      text: 'The children ___ (eat) pizza for dinner yesterday.',
      correctAnswers: ['ate'],
    },
  ];

  return (
    <div>
      <DragNDrop questions={questions} />
    </div>
  );
};

export default Grammar;
