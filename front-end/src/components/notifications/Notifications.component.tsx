import React, { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';

interface IProps {
  type: 'Error' | 'Success';
  errorType: 'file-invalid-type' | 'file-too-large' | 'too-many-files' | null;
  title: any;
  message: string;
  maxAcceptedFiles: number;
}
const [message, setMessage] = useState('');
const [title, setTitle] = useState('');
export const NotificationsComponent = (props: IProps) => {
  useEffect(() => {
    if (props.type === 'Error') {
      if (props.errorType === 'file-invalid-type') {
        setTitle('Invalid file type!');
        setMessage(`Try uploading only .png, .jpg, .svg, .gif, .webp!`);
      } else if (props.errorType === 'file-too-large') {
        setTitle(`File too big!`);
        setMessage(`Image must not exceed ${props.maxAcceptedFiles}!`);
      } else if (props.errorType === 'too-many-files') {
        setTitle(`Too many files!`);
        setMessage(`Upload only 1 image!`);
      }
    }
  }, [props]);

  // Most used notification props
  showNotification({
    title: title,
    message: message,

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
