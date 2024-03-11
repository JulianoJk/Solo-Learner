import React from 'react';
import { Select } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './TextWithSelection.module.css';
import cx from 'clsx';

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
  const matches = useMediaQuery('(max-width: 500px)');

  return (
    <div>
      {textWithPlaceholders.map(
        (part, index) =>
          part !== '' && (
            <React.Fragment key={index}>
              {part}
              {optionsSets[index]?.length > 0 && (
                <div
                  className={cx(
                    matches ? classes.containerSmall : classes.containerLarge,
                  )}
                >
                  <Select
                    placeholder={placeholder}
                    styles={{ input: { textAlign: 'center' } }}
                    value={selectedOption}
                    onChange={(value) => handleSelect(value)}
                    data={optionsSets[index].map((option) => ({
                      value: option.id,
                      label: option.label,
                    }))}
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
