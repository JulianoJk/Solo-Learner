import React, { useState } from 'react';

export interface Option {
  label: string;
  isCorrect: boolean;
}

interface SelectionProps {
  onSelect: (selectedOption: string, index: number) => void;
  optionsSets: Option[][];
  placeholder: string;
  text: string;
}

const Selection: React.FC<SelectionProps> = ({
  onSelect,
  optionsSets,
  placeholder,
  text,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    new Array(text.split('___').length - 1).fill(''),
  );

  const textWithPlaceholders = text.split('___');

  // Handle selection change
  const handleSelect = (selectedOption: string, index: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = selectedOption;
    setSelectedOptions(newSelectedOptions);
    onSelect(selectedOption, index);
  };

  return (
    <div>
      {textWithPlaceholders.map(
        (part, index) =>
          part !== '' && (
            <React.Fragment key={index}>
              {part}
              {optionsSets[index] && optionsSets[index].length > 0 && (
                <select
                  value={selectedOptions[index]}
                  onChange={(e) => handleSelect(e.target.value, index)}
                >
                  <option value="">{placeholder}</option>
                  {optionsSets[index].map((option, optionIndex) => (
                    <option key={optionIndex} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </React.Fragment>
          ),
      )}
    </div>
  );
};

export default Selection;
