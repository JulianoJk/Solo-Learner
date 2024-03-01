import React from 'react';
import { Select } from '@mantine/core';
// import classes from './TextWithSelection.module.css';

export interface Option {
  id: string;
  label: string;
  isCorrect: boolean;
}

interface TextWithSelectionProps {
  onSelect: (selectedOptionId: string, questionId: string) => void;
  optionsSets: Option[][];
  placeholder: string;
  text: string;
  selectedOption: string; // Change to single selected option
  questionId: string; // Add question ID
}

const TextWithSelection: React.FC<TextWithSelectionProps> = ({
  onSelect,
  optionsSets,
  placeholder,
  text,
  selectedOption,
  questionId,
}) => {
  const handleSelect = (value: string | null) => {
    onSelect(value || '', questionId);
  };

  const textWithPlaceholders = text.split('___');

  return (
    <div>
      {textWithPlaceholders.map(
        (part, index) =>
          part !== '' && (
            <React.Fragment key={index}>
              {part}
              {optionsSets[index]?.length > 0 && (
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Select
                    clearable
                    placeholder={placeholder}
                    value={selectedOption}
                    onChange={(value) => handleSelect(value)}
                    data={optionsSets[index].map((option) => ({
                      value: option.id,
                      label: option.label,
                    }))}
                    style={{ width: '10em', height: '0.4em' }}
                  />
                </div>
              )}
            </React.Fragment>
          ),
      )}
    </div>
  );
};

export default TextWithSelection;
