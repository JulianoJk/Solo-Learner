import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  formContainer: {
    borderWidth: '2px !important',
    borderRadius: 5,
    boxShadow: 'none',
    padding: 10,
    width: '100%',
    backgroundColor: theme.colorScheme === 'light' ? '#95c9f457' : '#343541',
    border:
      theme.colorScheme === 'light' ? `11px solid indigo` : `1px solid #343541`,
  },
  form: {
    padding: 10,
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
}));
