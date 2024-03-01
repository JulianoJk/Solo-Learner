import React, { useState } from 'react';
import TextWithSelection, {
  Option,
} from '../TextWithSelection/TextWithSelection.component';
import { Button, List } from '@mantine/core';

const Theory: React.FC = () => {
  // State to hold selected options for each question
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  // Function to handle option selection for a question
  const handleSelect = (selectedOptionId: string, questionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: selectedOptionId,
    }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    console.log(selectedOptions);
    // Your submission logic here
  };

  const questions: { id: string; text: string; options: Option[][] }[] = [
    {
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
      id: 'question3',
      text: 'The toy is ___ the box.',
      options: [
        [
          { id: '13', label: 'between', isCorrect: false },
          { id: '14', label: 'in', isCorrect: true },
        ],
      ],
    },
    {
      id: 'question4',
      text: 'Look! Linda is ___ that door.',
      options: [
        [
          { id: '19', label: 'in', isCorrect: false },
          { id: '20', label: 'behind', isCorrect: true },
        ],
      ],
    },
    {
      id: 'question5',
      text: 'The sheep is ___ the tree.',
      options: [
        [
          { id: '25', label: 'between', isCorrect: false },
          { id: '26', label: 'in front of', isCorrect: true },
        ],
      ],
    },
    {
      id: 'question6',
      text: 'The wardrobe is ___ the window.',
      options: [
        [
          { id: '27', label: 'next to', isCorrect: true },
          { id: '28', label: 'on', isCorrect: false },
        ],
      ],
    },
  ];

  return (
    <div>
      <List type="ordered" withPadding>
        {questions.map((question) => (
          <List.Item key={question.id} style={{ padding: 5 }}>
            <TextWithSelection
              text={question.text}
              optionsSets={question.options}
              placeholder="Select Option"
              onSelect={(selectedOptionId, questionId) =>
                handleSelect(selectedOptionId, questionId)
              }
              selectedOption={selectedOptions[question.id] || ''}
              questionId={question.id} // Pass question ID
            />
          </List.Item>
        ))}
      </List>
      <Button onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Submit
      </Button>
    </div>
  );
};

export default Theory;
