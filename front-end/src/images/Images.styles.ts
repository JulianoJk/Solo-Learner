import {createStyles} from '@mantine/core'
export const useStyles = createStyles(theme => ({
  icon: {
    width: '100%',
    maxWidth: '40rem',
    height: '100%',
    maxHeight: '40rem',
  },
  [theme.fn.smallerThan('md')]: {
    icon: {
      width: '50%',
      maxWidth: '20rem',
      height: '50%',
      maxHeight: '20rem',
    },
  },
}))
