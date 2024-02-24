import React, { useState } from 'react';

export interface Option {
  label: string;
  isCorrect: boolean;
}

interface SelectionProps {
  onSelect: (selectedOption: string, index: number) => void;
  options: Option[];
  placeholder: string;
  index: number;
}

const Selection: React.FC<SelectionProps> = ({
  onSelect,
  options,
  placeholder,
  index,
}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue, index);
  };

  return (
    <select value={selectedOption} onChange={handleSelect}>
      <option value="">{placeholder}</option>
      {options.map((option, optionIndex) => (
        <option key={optionIndex} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Selection;
