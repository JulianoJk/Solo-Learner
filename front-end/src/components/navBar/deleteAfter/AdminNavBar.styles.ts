import { rem } from '@mantine/core';
import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme) => ({
  navbar: {
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  navbarMain: {
    flex: 1,
  },
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.colors.blue[7]}`,
  },
  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colors.blue[7]}`,
  },
  version: {
    backgroundColor: theme.colors.blue[7],
    color: theme.colors.white,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[6],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    userSelect: 'none',

    '&:hover': {
      backgroundColor: theme.colors.blue[7],
      color: theme.colors.yellow[5],
      '& .linkIcon': {
        color: theme.colors.yellow[5],
      },
    },

    '&[data-active]': {
      '&, &:hover': {
        boxShadow: theme.shadows.sm,
        backgroundColor: theme.colors.blue[7],
        color: theme.colors.yellow[5],
        '& .linkIcon': {
          color: theme.colors.blue[6],
        },
      },
    },
  },
  linkIcon: {
    color: theme.colors.black,
    marginRight: theme.spacing.sm,
    width: rem(25),
    height: rem(25),
  },
}));
