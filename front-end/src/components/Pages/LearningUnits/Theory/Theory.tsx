import React, { useState } from 'react';
import TextWithSelection from '../TextWithSelection/TextWithSelection.component';
import { Button, List, Title } from '@mantine/core';
import { selectionQuestions } from '../constants';

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

  return (
    <div>
      <Title>Choose and fill in.</Title>
      <List type="ordered" withPadding>
        {selectionQuestions.map((question) => (
          <List.Item key={question.id} style={{ padding: 8 }}>
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
