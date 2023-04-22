import React from 'react';
import { useForm, isEmail, hasLength } from '@mantine/form';
import {
  Button,
  Group,
  TextInput,
  Box,
  PasswordInput,
  Modal,
} from '@mantine/core';
import { useAppDispatch } from '../../../../context/AppContext';
import { useState } from 'react';
import { notificationAlert } from '../../../notifications/NotificationAlert';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { deleteAccountAPI } from '../../../api/api';
import { useUserDispatch } from '../../../../context/UserContext';
import {
  IconLock,
  IconEye,
  IconEyeOff,
  IconMoodSad,
} from '@tabler/icons-react';
import { IApiError, IApiMessageResponse } from '../../../../Model/UserModels';

export default function MantineDemo() {
  const navigate: NavigateFunction = useNavigate();
  const appDispatch = useAppDispatch();
  const [opened, setOpened] = useState<boolean>(false);
  const userDispatch = useUserDispatch();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: isEmail('Invalid email'),
      password: hasLength(
        { min: 6, max: 30 },
        'Value must be between 6 and 30',
      ),
    },
  });

  const logOut = (messageToUser: string) => {
    notificationAlert({
      title: 'Account Deleted.',
      message: messageToUser,
      iconColor: 'red',
      closeAfter: 5000,
      icon: <IconMoodSad color="yellow" size={18} />,
    });
    userDispatch({ type: 'RESET_STATE' });
    navigate('/');
  };
  const { mutate: deleteAccount } = useMutation(deleteAccountAPI, {
    onSuccess: (data: IApiMessageResponse | IApiError) => {
      if (typeof data === 'object' && 'error' in data) {
        // handle the error case
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
        });
      } else {
        appDispatch({
          type: 'SET_USER_SETTINGS_MODAL',
          isUserSettingsOpen: false,
        });
        logOut(data.message);
      }
    },
  });

  const handleInput = async (email: string, password: string) => {
    try {
      const token = localStorage.getItem('jwtToken');

      if (!form.validate().hasErrors) {
        deleteAccount({ token, email, password });
      }
      return;
    } catch (error) {
      console.warn(error);
      return;
    }
  };

  return (
    <>
      <Modal
        title="Delete your profile"
        transitionProps={{
          transition: 'fade',
          duration: 100,
          timingFunction: 'ease',
        }}
        overlayProps={{
          opacity: 0.55,
          blur: 4,
        }}
        centered
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        withCloseButton={false}
      >
        <Box maw={300} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => {
              handleInput(values.email, values.password);
            })}
          >
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              icon={<IconLock />}
              label={<span>Password:</span>}
              placeholder="Password"
              visibilityToggleIcon={({ reveal }) =>
                reveal ? <IconEyeOff size={16} /> : <IconEye size={16} />
              }
              autoComplete="on"
              {...form.getInputProps('password')}
            />

            <Group position="right" mt="md">
              <Button onClick={() => setOpened(false)} color={'gray'}>
                No don't delete it
              </Button>
              <Button type="submit" color={'red'}>
                Confirm
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>
      <Group position="center">
        <Button onClick={() => setOpened(true)} color={'red'}>
          Delete Account
        </Button>
      </Group>
    </>
  );
}
