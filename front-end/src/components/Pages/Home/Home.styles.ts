import { createStyles } from '@mantine/core';
export const useStyles = createStyles((theme) => ({
  // TODO!: Remove this, is from <Home /> component
  sectionContainer: {
    maxWidth: '140em',
    minWidth: '10em',
  },
  cardLoading: {
    // backgroundColor: 'transparent',
  },

  cardLoaded: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.blue[1],
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));
