import { rem } from '@mantine/core';
import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme, _, u) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [u.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,
    color: 'white',
    
    [u.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  control: {
    [u.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    width: rem(376),
    height: rem(356),

    [u.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    [u.dark]: {
      backgroundColor: '#00A6A6', // Vibrant cyan for dark mode
    },
    [u.light]: {
      backgroundColor: '#4FD1C5', // Fresh turquoise for light mode
    },
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));
