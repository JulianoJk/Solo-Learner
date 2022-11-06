import React, { useState } from 'react';
import { showNotification } from '@mantine/notifications';
interface IProps {
  type: 'Error' | 'Success';
  title: string;
  message: string;
}
const [message, setMessage] = useState('');
export const NotificationsComponent = (props: IProps) => {
  if (props.type === 'Error') {
  }
  // Most used notification props
  showNotification({
    title: 'Default notification',
    message: 'Hey there, your code is awesome! 🤥',

    autoClose: 5000,

    styles: theme => ({
      root: {
        backgroundColor: theme.colors.blue[6],
        borderColor: theme.colors.blue[6],

        '&::before': { backgroundColor: theme.white },
      },

      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: theme.colors.blue[7] },
      },
    }),
  });
  return;
};
