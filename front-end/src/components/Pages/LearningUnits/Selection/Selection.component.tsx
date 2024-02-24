import React, { useState, useEffect } from 'react';
export interface Option {
  id: string;
  label: string;
  isCorrect: boolean;
}

interface SelectionProps {
  onSelect: (selectedOptionId: string, index: number) => void;
  optionsSets: Option[][];
  placeholder: string;
  text: string;
  page: number; // Current page index
  selectedOptions: string[]; // Selected option IDs for the current page
}

const Selection: React.FC<SelectionProps> = ({
  onSelect,
  optionsSets,
  placeholder,
  text,
  page,
  selectedOptions,
}) => {
  const [localSelectedOptions, setLocalSelectedOptions] = useState<string[]>(
    [],
  );

  useEffect(() => {
    // Load selected options for the current page when it changes
    setLocalSelectedOptions(selectedOptions);
  }, [selectedOptions, page]);

  const textWithPlaceholders = text.split('___');

  // Handle selection change
  const handleSelect = (selectedOptionId: string, index: number) => {
    const newSelectedOptions = [...localSelectedOptions];
    newSelectedOptions[index] = selectedOptionId;
    setLocalSelectedOptions(newSelectedOptions);
    onSelect(selectedOptionId, index);
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
                  value={localSelectedOptions[index]}
                  onChange={(e) => handleSelect(e.target.value, index)}
                >
                  <option value="">{placeholder}</option>
                  {optionsSets[index].map((option) => (
                    <option key={option.id} value={option.id}>
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
