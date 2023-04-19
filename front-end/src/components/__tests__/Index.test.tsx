/* eslint-disable no-undef */
import * as React from 'react';

import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Index from '../Pages/Index/Index';

test('Check if text exists in Index page', () => {
  render(<Index />);
  const text = screen.getByText(/learn foreign languages with fun!/i);
  expect(text.textContent).toBe('Learn foreign languages with fun!');
});
