declare module 'react-international-phone' {
  import * as React from 'react';

  export interface PhoneInputProps {
    value: string;
    defaultCountry?: string;
    onChange: (value: string) => void;
    thisForTest?: any;
    style?: React.CSSProperties;
  }

  export const PhoneInput: React.FC<PhoneInputProps>;
}
