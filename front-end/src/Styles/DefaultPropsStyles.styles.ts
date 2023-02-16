import {AvatarProps} from '@mantine/core'

export const AvatarDefaultProps: Partial<AvatarProps> = {
  size: 'md',

  sx: theme => ({
    backgroundColor: theme.colorScheme === 'light' ? '#004a44' : '#35004c',
    '&:hover': {
      color: theme.colorScheme === 'light' ? 'red' : 'black',
    },
    gradient:
      theme.colorScheme === 'light'
        ? {from: '#0CA678', to: 'blue', deg: 60}
        : {from: '#59A5D8', to: '#84D2F6', deg: 35},
  }),
}
