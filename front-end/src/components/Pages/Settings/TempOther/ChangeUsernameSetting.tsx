import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useUserDispatch, useUserState } from '../../../../context/UserContext';
import { useAppDispatch } from '../../../../context/AppContext';
import type {
  IApiError,
  IApiMessageResponse,
  IUserInfoContext,
} from '../../../../Model/UserModels';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notificationAlert } from '../../../notifications/NotificationAlert';
import { IconMail, IconMoodHappy } from '@tabler/icons-react';
import { updateUsernameAPI } from '../../../api/api';
import { useStyles } from '../Settings.styles';

export const ChangeUsernameSetting = () => {
  const appDispatch = useAppDispatch();
  const userDispatch = useUserDispatch();
  const { user } = useUserState();
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      username: user.username || '',
    },
    validate: {
      username: (value) => {
        if (value.length < 3 || value.length > 20) {
          return 'Username must be between 3 and 20 characters long.';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers, and underscores.';
        }
        return null;
      },
    },
  });

  const { mutate: updateUsernameMutation } = useMutation<
    IApiMessageResponse | IApiError,
    unknown,
    { token: string; email: string; username: string }
  >((data) => updateUsernameAPI(data), {
    onSuccess: (data, variables) => {
      if ('error' in data) {
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
        });
      } else {
        const updatedUserInfo: IUserInfoContext = {
          ...user,
          username: variables.username,
        };
        userDispatch({ type: 'SET_USER', user: updatedUserInfo });

        notificationAlert({
          title: 'Username updated!',
          message: data.message,
          iconColor: 'yellow',
          closeAfter: 4000,
          icon: <IconMoodHappy color="black" size={18} />,
        });
      }
    },
    onError: () => {
      appDispatch({
        type: 'SET_ERROR_ALERT_MESSAGE',
        errorAlertMessage: 'An error occurred while updating the username.',
      });
    },
  });

  const handleSubmit = (values: { username: string }) => {
    const userToken = user.token || '';
    const email = user.email || '';
    const username = values.username;

    updateUsernameMutation({
      token: userToken,
      email: email,
      username: username,
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        leftSection={<IconMail />}
        type="text"
        label={<span className={classes.inputLabels}>Your full name:</span>}
        placeholder="Enter new username"
        {...form.getInputProps('username')}
      />
      <Button type="submit" mt="md">
        Update Username
      </Button>
    </form>
  );
};
