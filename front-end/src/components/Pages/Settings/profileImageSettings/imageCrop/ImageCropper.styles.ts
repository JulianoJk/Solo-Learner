import { createStyles } from '@mantine/core';
export const useStyles = createStyles(() => ({
  cropContainer: {
    position: 'relative',
    width: '30em',
    height: 250,
    background: '#333',
  },
  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 500,
  },
}));
