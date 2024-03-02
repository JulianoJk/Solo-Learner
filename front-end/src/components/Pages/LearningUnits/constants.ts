export const selectionQuestions = [
  {
    type: 'selection',
    questionOrder: 1,
    id: 'question1',
    text: 'Your shoes are ___ the bed.',
    options: [
      [
        { id: '1', label: 'under', isCorrect: true },
        { id: '2', label: 'between', isCorrect: false },
      ],
    ],
  },
  {
    type: 'selection',
    questionOrder: 2,
    id: 'question2',
    text: 'The photo is ___ the self.',
    options: [
      [
        { id: '7', label: 'on', isCorrect: true },
        { id: '8', label: 'behind', isCorrect: false },
      ],
    ],
  },
  {
    type: 'dragNdrop',
    questionOrder: 4,
    id: '1',
    items: ['went', 'goes', 'going'],
    text: 'Yesterday, Sarah ___ (go) to the supermarket.',
    correctAnswers: ['went'],
  },
  {
    type: 'dragNdrop',
    questionOrder: 3,
    id: '2',
    items: ['had', 'have', 'has'],
    text: 'They ___ (have) a picnic in the park last Sunday.',
    correctAnswers: ['had'],
  },
];
