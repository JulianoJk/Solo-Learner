import { rem } from '@mantine/core';
import { createStyles, getStylesRef } from '@mantine/emotion';

import { LIGHT_MENT } from '../../../Theme/Styles';
export const useStyles = createStyles((theme, _, u) => ({
  formContainer: {
    borderWidth: '2px !important',
    borderRadius: 5,
    boxShadow: 'none',
    padding: 10,
    width: '100%',
    [u.light]: {
      backgroundColor: '#95c9f457',
      border: '11px solid indigo',
    },
    [u.dark]: {
      backgroundColor: '#343541',
      border: '1px solid #343541',
    },
  },
  form: {
    padding: 10,
  },
  formInput: {
    width: 300,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButton: {
    display: 'inline-block',
    width: '100%',
    marginTop: 10,
    '&:hover': {
      backgroundColor: LIGHT_MENT,
    },
  },
  inputLabels: {
    fontWeight: 700,
  },
  switchAuthLinks: {
    alignItems: 'center',
    padding: 10,
  },
  switchAuthLinkAnchor: {
    marginLeft: 8,
    textDecoration: 'underline',
  },
  imageContainer: {
    borderRadius: '50%',
  },
  changePasswordButton: {
    float: 'right',
    margin: 10,
  },
  changePasswordLabel: {
    float: 'left',
    margin: 10,
  },
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,

    [u.light]: {
      borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
    },
    [u.dark]: {
      borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`,
    },
  },
  body: {
    background: 'red',
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    [u.light]: {
      borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
    },
    [u.dark]: {
      borderTop: `${rem(1)} solid ${theme.colors.dark[4]}`,
    },
  },

  link: {
    // ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    [u.light]: {
      color: theme.colors.gray[7],
      '&:hover': {
        backgroundColor: theme.colors.gray[0],
        color: theme.black,
        [`& .${getStylesRef('icon')}`]: {
          color: theme.black,
        },
      },
    },
    [u.dark]: {
      color: theme.colors.dark[1],
      '&:hover': {
        backgroundColor: theme.colors.dark[6],
        color: theme.white,
        [`& .${getStylesRef('icon')}`]: {
          color: theme.white,
        },
      },
    },
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    [u.light]: {
      color: theme.colors.gray[6],
    },
    [u.dark]: {
      color: theme.colors.dark[2],
    },
    marginRight: theme.spacing.sm,
  },

  //   linkActive: {
  //     '&, &:hover': {
  //       backgroundColor: theme.fn.variant({
  //         variant: 'light',
  //         color: theme.primaryColor,
  //       }).background,
  //       color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
  //         .color,
  //       [`& .${getStylesRef('icon')}`]: {
  //         color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
  //           .color,
  //       },
  //     },
  //   },
}));
