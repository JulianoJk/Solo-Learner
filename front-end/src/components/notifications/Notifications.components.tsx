import React, { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';

interface IProps {
  type: 'Error' | 'Success';
  errorType: string[] | null;
  maxAcceptedFiles: number;
}
const [notificationMessage, setNotificationMessage] = useState('');
const [notificationTitle, setNotificationTitle] = useState('');
export const NotificationsComponent = (props: IProps) => {
  if (props.type === 'Error' && props.errorType !== null) {
    props.errorType.forEach(code => {
      console.log(code);
      if (code === 'file-invalid-type') {
        setNotificationTitle('Invalid file type!');
        setNotificationMessage(
          `Try uploading only .png, .jpg, .svg, .gif, .webp!`
        );
      } else if (code === 'file-too-large') {
        setNotificationTitle(`File too big!`);
        setNotificationMessage(
          `Image must not exceed ${props.maxAcceptedFiles}!`
        );
      } else if (code === 'too-many-files') {
        setNotificationTitle(`Too many files!`);
        setNotificationMessage(`Upload only 1 image!`);
      }
    });
  }

  // Most used notification props
  showNotification({
    title: notificationTitle,
    message: notificationMessage,

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
