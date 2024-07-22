import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import AppInner from './AppInner';
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';
const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        defaultColorScheme="dark"
        stylesTransform={emotionTransform}
      >
        <MantineEmotionProvider>
          <AppInner />
        </MantineEmotionProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
export default App;
