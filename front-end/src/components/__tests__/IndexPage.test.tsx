/* eslint-disable no-undef */
import * as React from 'react';

import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import IndexPage from '../Pages/Index/IndexPage';

test.skip('Check if text exists in Index page', () => {
  render(<IndexPage />);
  const text = screen.getByText(/learn foreign languages with fun!/i);
  expect(text.textContent).toBe('Learn foreign languages with fun!');
});
