// src/components/PhoneSelector.tsx
import { Box, useMantineColorScheme, Text } from '@mantine/core';
import React from 'react';
import { PhoneInput, PhoneInputProps } from 'react-international-phone';
import 'react-international-phone/style.css';

interface PhoneSelectorProps extends Omit<PhoneInputProps, 'style'> {
  value: string;
  onChange: (value: string) => void;
}

const PhoneSelector: React.FC<PhoneSelectorProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const { colorScheme } = useMantineColorScheme();

  const phoneInputStyle = {
    '--react-international-phone-border-radius': '5px',
    '--react-international-phone-border-color':
      colorScheme === 'dark' ? '#484f55' : 'white',
    '--react-international-phone-background-color':
      colorScheme === 'dark' ? '#2c2c2c' : '#fff',
    '--react-international-phone-text-color':
      colorScheme === 'dark' ? 'white' : '#2c2c2c',
    '--react-international-phone-box-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)',
    '--react-international-phone-selected-dropdown-item-background-color':
      colorScheme === 'dark' ? '#3f3d3d' : 'whitesmoke',
    '--react-international-phone-country-selector-background-color-hover':
      colorScheme === 'dark' ? '#3f3d3d' : 'whitesmoke',
    position: 'relative',
  } as React.CSSProperties;

  return (
    <Box>
      <Text size="sm" fw={600}>
        Phone number
      </Text>
      <PhoneInput
        style={phoneInputStyle}
        defaultCountry="de"
        value={value}
        onChange={onChange}
        {...rest}
      />
    </Box>
  );
};

export default PhoneSelector;
