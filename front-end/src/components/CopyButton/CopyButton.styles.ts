import { createStyles } from '@mantine/emotion';

const useStyles = createStyles(() => ({
  wrapper: {
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',

    '&:hover': {
      opacity: 1,
    },
  },
}));

export default useStyles;
