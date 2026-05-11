import {
  Stack,
  TextInput,
  Group,
  Button,
  Divider,
  Select,
  Switch,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { updateUsernameAPI } from '../../../api/api';
import { notificationAlert } from '../../../notifications/NotificationAlert';
import { IconMoodHappy } from '@tabler/icons-react';
import type {
  IApiError,
  IApiMessageResponse,
  User,
} from '../../../../Model/UserModels';
import { getJob } from '../../../../utils/utils';

type EditUserFormProps = {
  user: User;

  adminToken: string;
  onClose: () => void;
};

const EditUserForm = ({ user, adminToken, onClose }: EditUserFormProps) => {
  const userRole = getJob(user.isAdmin, user.isTeacher);
  const roleOptions = ['Admin', 'Teacher', 'Student'];

  const form = useForm({
    initialValues: {
      username: user.username || '',
      email: user.email || '',
      firstName: user.firstName || '',
      middleName: user.middleName || '',
      lastName: user.lastName || '',
      phoneNumber: user.phoneNumber || '',
      role: userRole === 'Admin/Teacher' ? 'Teacher' : userRole,
      accountActive: true,
      forcePasswordReset: false,
      adminNote: '',
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

  const { mutate: updateUsername, isLoading: isUpdating } = useMutation<
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
        <Divider label="Identity" labelPosition="center" />
        <Group grow>
          <TextInput label="First Name" {...form.getInputProps('firstName')} />
          <TextInput
            label="Middle Name"
            {...form.getInputProps('middleName')}
          />
          <TextInput label="Last Name" {...form.getInputProps('lastName')} />
        </Group>
        <TextInput label="Email" value={form.values.email} readOnly />
        <TextInput label="Username" {...form.getInputProps('username')} />
        <TextInput
          label="Phone Number"
          {...form.getInputProps('phoneNumber')}
        />

        <Divider label="Access & Role" labelPosition="center" />
        <Select
          label="Role"
          description="Choose permission level for this user."
          data={roleOptions}
          {...form.getInputProps('role')}
        />
        <Switch
          label="Account active"
          {...form.getInputProps('accountActive', { type: 'checkbox' })}
        />

        <Divider label="Internal" labelPosition="center" />
        <Textarea
          label="Admin note"
          description="Internal only. Useful for audit context."
          minRows={2}
          maxRows={4}
          {...form.getInputProps('adminNote')}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isUpdating} disabled={isUpdating}>
            Save Username
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default EditUserForm;
