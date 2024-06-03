import { rem } from '@mantine/core';
import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme, _, u) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '80%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    [u.dark]: {
      color: theme.black,
    },
    [u.light]: {
      color: theme.white,
    },
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    // [theme.other.smallerThan('sm')]: {
    //   height: rem(42),
    //   display: 'flex',
    //   alignItems: 'center',
    //   width: '100%',
    // },
    '&:hover': {
      borderRadius: '0.3rem',
      [u.dark]: {
        backgroundColor: theme.colors.dark[6],
      },
      [u.light]: {
        backgroundColor: theme.colors.gray[5],
      },
    },
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    '&:hover': {
      [u.dark]: {
        backgroundColor: theme.colors.dark[7],
      },
      [u.light]: {
        backgroundColor: theme.colors.gray[0],
      },
    },

    '&:active': theme.other.active,
  },

  dropdownFooter: {
    [u.dark]: {
      backgroundColor: theme.colors.dark[7],
      borderTop: `${rem(1)} solid ${theme.colors.dark[5]}`,
    },
    [u.light]: {
      backgroundColor: theme.colors.gray[0],
      borderTop: `${rem(1)} solid ${theme.colors.gray[1]}`,
    },
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
  },

  hiddenMobile: {
    // [theme.other.smallerThan('sm')]: {
    //   display: 'none',
    // },
  },
  headerRoot: {
    [u.dark]: {
      //   backgroundImage: theme.other.linearGradient(300, '#161b22', '#21262d'),
      backgroundImage: 'linear-gradient(300deg, #161b22, #21262d)',

      // borderBottom: `1px solid ${theme.colors.dark[5]}`,
    },
    [u.light]: {
      //   backgroundImage: theme.other.linearGradient(1, '#8CB6EA'),
      // borderBottom: '2px solid #7FAAE0',
    },

    // marginBottom: 20,
  },
  user: {
    [u.dark]: {
      color: theme.colors.dark[0],
    },
    [u.light]: {
      color: theme.black,
    },
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      [u.dark]: {
        backgroundColor: theme.colors.dark[8],
      },
      [u.light]: {
        backgroundColor: theme.white,
      },
    },
  },
  userActive: {
    [u.dark]: {
      backgroundColor: '#8CB6EA',
    },
    [u.light]: {
      backgroundColor: '#7FAAE0',
    },
  },
  hiddenDesktop: {
    // [theme.other.largerThan('sm')]: {
    //   display: 'none',
    // },
  },
}));
