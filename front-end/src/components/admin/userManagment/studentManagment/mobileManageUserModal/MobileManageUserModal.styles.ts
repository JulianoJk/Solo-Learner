import { rem } from '@mantine/core';
import { createStyles } from '@mantine/emotion';

// Create styles using createStyles
export const useStyles = createStyles((theme) => ({
  body: {
    display: 'flex',
    alignItems: 'center',
  },

  track: {
    width: rem(40),
    height: rem(6),
    overflow: 'visible',
  },

  thumb: {
    width: rem(20),
    height: rem(20),
    left: rem(-2),
    transition: 'background-color 100ms ease, left 100ms ease',

    '&[data-checked]': {
      backgroundColor: theme.colors.blue[6], // Assuming you want to use the filled blue color from Mantine
      left: `calc(100% - ${rem(12)})`,
    },
  },
}));
