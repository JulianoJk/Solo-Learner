import { rem } from '@mantine/core';
import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme, _, u) => ({
  root: {
    backgroundColor: u.dark ? '#2c2c2c' : theme.white,
    color: u.dark ? theme.white : theme.black,
    padding: rem(20),
    borderRadius: rem(8),
    boxShadow: `0 ${rem(4)} ${rem(8)} rgba(0, 0, 0, 0.2)`,
  },

  checkbox: {
    border: `${rem(1)} solid ${
      u.dark ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.md,
    fontWeight: 500,
    width: '200px',
    transition:
      'color 100ms ease, background-color 100ms ease, border-color 100ms ease',
    cursor: 'pointer',

    '&[data-checked]': {
      backgroundColor: u.dark ? theme.colors.blue[7] : theme.colors.blue[6],
      borderColor: u.dark ? theme.colors.blue[7] : theme.colors.blue[6],
      color: theme.white,
    },

    '& *': {
      pointerEvents: 'none',
      userSelect: 'none',
    },
  },
}));

export default useStyles;
