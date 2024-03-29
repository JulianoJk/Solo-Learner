import {createStyles} from '@mantine/core'
export const useStyles = createStyles(theme => ({
  alertBox: {
    margin: 10,
    backgroundColor: theme.colorScheme === 'light' ? '#FFE8E8' : '#482022',
    color: theme.colorScheme === 'light' ? '#FA5252' : '#FFC9C9',
  },
}))
