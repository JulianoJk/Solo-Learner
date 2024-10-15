import { rem } from '@mantine/core';
import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme, _, u) => ({
  navbar: {
    backgroundColor: u.dark
      ? theme.colors.dark[6] // Use a dark color
      : theme.colors.white, // Use white for light mode
    height: rem(800),
    width: rem(300),
    padding: theme.spacing.md,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    borderRight: `${rem(1)} solid ${
      u.dark
        ? theme.colors.dark[4] // Dark border
        : theme.colors.gray[3] // Light border
    }`,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: u.dark ? theme.colors.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      u.dark
        ? theme.colors.dark[4] // Dark bottom border
        : theme.colors.gray[3] // Light bottom border
    }`,
  },

  links: {
    flex: 1,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      u.dark
        ? theme.colors.dark[4] // Dark top border
        : theme.colors.gray[3] // Light top border
    }`,
  },
}));
