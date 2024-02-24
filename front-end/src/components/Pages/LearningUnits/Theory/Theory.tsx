import React, { useState } from 'react';
import Selection, { Option } from '../Selection/Selection.component';
import { Pagination } from '@mantine/core';

const Theory: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Define questions with text and options
  const questions: { text: string; options: Option[][] }[] = [
    {
      text: '1hello ___ world ___',
      options: [
        [
          { label: 'English', isCorrect: false },
          { label: 'German', isCorrect: false },
          { label: 'Italian', isCorrect: false },
        ],
        [
          { label: 'English', isCorrect: false },
          { label: 'German', isCorrect: false },
          { label: 'Italian', isCorrect: false },
        ],
      ],
    },
    {
      text: '2hello ___ world ___',
      options: [
        [
          { label: 'English', isCorrect: false },
          { label: 'German', isCorrect: false },
          { label: 'Italian', isCorrect: false },
        ],
        [
          { label: 'English', isCorrect: false },
          { label: 'German', isCorrect: false },
          { label: 'Italian', isCorrect: false },
        ],
      ],
    },
    {
      text: '3hello ___ world ___',
      options: [
        [
          { label: 'English', isCorrect: false },
          { label: 'German', isCorrect: false },
          { label: 'Italian', isCorrect: false },
        ],
        [
          { label: 'English', isCorrect: false },
          { label: 'German', isCorrect: false },
          { label: 'Italian', isCorrect: false },
        ],
      ],
    },
    {
      text: '4hello ___ world ___',
      options: [
        [
          { label: 'English', isCorrect: false },
          { label: 'German', isCorrect: false },
          { label: 'Italian', isCorrect: false },
        ],
        [
          { label: 'English', isCorrect: false },
          { label: 'German', isCorrect: false },
          { label: 'Italian', isCorrect: false },
        ],
      ],
    },
    {
      text: '4hello ___ world ___',
      options: [
        [
          { label: 'English', isCorrect: false },
          { label: 'German', isCorrect: false },
          { label: 'Italian', isCorrect: false },
        ],
        [
          { label: 'English', isCorrect: false },
          { label: 'German', isCorrect: false },
          { label: 'Italian', isCorrect: false },
        ],
      ],
    },
    // Add more questions as needed
  ];

  const currentQuestion = questions[currentPageIndex];

  const handlePageChange = (page: number) => {
    setCurrentPageIndex(page - 1);
  };

  const handleSelect = (selectedOption: string, index: number) => {
    console.log(
      `Selected option for placeholder ${index + 1}: ${selectedOption}`,
    );
  };

  return (
    <div>
      <Selection
        text={currentQuestion.text}
        optionsSets={currentQuestion.options}
        placeholder="Select Option"
        onSelect={handleSelect}
      />
      <Pagination
        total={questions.length}
        value={currentPageIndex + 1}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Theory;
