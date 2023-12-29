import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import AppInner from './AppInner';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ColorSchemeScript defaultColorScheme="auto" />

        <AppInner></AppInner>
      </MantineProvider>
    </QueryClientProvider>
  );
};
export default App;
