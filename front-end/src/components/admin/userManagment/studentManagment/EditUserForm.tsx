import React from 'react';
import { Stack, TextInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { updateUsernameAPI } from '../../../api/api';
import { notificationAlert } from '../../../notifications/NotificationAlert';
import { IconMoodHappy } from '@tabler/icons-react';
import type { IApiError, IApiMessageResponse, User } from '../../../../Model/UserModels';

type EditUserFormProps = {
  user: User;

  adminToken: string;
  onClose: () => void;
};

const EditUserForm = ({ user, adminToken, onClose }: EditUserFormProps) => {
  const form = useForm({
    initialValues: {
      username: user.username || '',
      email: user.email || '',
    },
    validate: {
      username: (value) => {
        if (value.length < 3 || value.length > 20) {
          return 'Username must be between 3 and 20 characters.';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers, and underscores.';
        }
        return null;
      },
    },
  });

  const { mutate: updateUsername } = useMutation<
    IApiMessageResponse | IApiError,
    unknown,
    { token: string; email: string; username: string }
  >((data) => updateUsernameAPI(data), {
    onSuccess: (data) => {
      if ('error' in data) {
        notificationAlert({
          title: 'Error',
          message: data.error.message,
          iconColor: 'red',
        });
      } else {
        notificationAlert({
          title: 'Success',
          message: data.message,
          icon: <IconMoodHappy size={18} />,
        });
        onClose();
      }
    },
    onError: () => {
      notificationAlert({
        title: 'Error',
        message: 'An error occurred while updating the username.',
        iconColor: 'red',
      });
    },
  });

  const handleSubmit = (values: { username: string; email: string }) => {
    updateUsername({
      token: adminToken,
      email: values.email,
      username: values.username,
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput label="Email" value={form.values.email} readOnly />
        <TextInput label="Username" {...form.getInputProps('username')} />
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </Group>
      </Stack>
    </form>
  );
};

export default EditUserForm;
