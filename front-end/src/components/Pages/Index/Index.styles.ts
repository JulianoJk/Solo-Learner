import { createStyles } from '@mantine/emotion';
import { rem } from '@mantine/core';

export const useStyles = createStyles((theme, _, u) => ({
  container: {
    height: rem(700),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: 'relative',

    [u.smallerThan('sm')]: {
      height: rem(500),
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [u.smallerThan('sm')]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [u.smallerThan('xs')]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [u.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [u.smallerThan('sm')]: {
      width: '100%',
    },
  },
  wrapper: {
    height: '90vh',
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
}));
