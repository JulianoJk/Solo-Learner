import { useMantineColorScheme } from '@mantine/core';
import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const PhoneSelector = () => {
  const [phone, setPhone] = useState('');
  const { colorScheme } = useMantineColorScheme();

  return (
    <PhoneInput
      style={
        {
          '--react-international-phone-border-radius': '1px',
          '--react-international-phone-border-color':
            colorScheme === 'dark' ? '#484f55' : 'white',
          '--react-international-phone-background-color':
            colorScheme === 'dark' ? '#2c2c2c' : '#fff',
          '--react-international-phone-text-color':
            colorScheme === 'dark' ? 'white' : '#2c2c2c',
          '--react-international-phone-box-shadow':
            '0 4px 8px rgba(0, 0, 0, 0.2)',
          '--react-international-phone-selected-dropdown-item-background-color':
            colorScheme === 'dark' ? '#3f3d3d' : 'whitesmoke',
          '--react-international-phone-country-selector-background-color-hover':
            colorScheme === 'dark' ? '#3f3d3d' : 'whitesmoke',

          top: '12px',
          position: 'relative',
        } as React.CSSProperties
      }
      defaultCountry="gr"
      value={phone}
      onChange={setPhone}
    />
  );
};

export default PhoneSelector;
