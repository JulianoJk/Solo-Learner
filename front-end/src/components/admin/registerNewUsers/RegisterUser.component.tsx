import {
  Avatar,
  Container,
  Group,
  Radio,
  SimpleGrid,
  Stack,
  TextInput,
  Select,
  useCombobox,
  Collapse,
  Text,
  Checkbox,
  MultiSelectProps,
  MultiSelect,
  Flex,
  Button,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import React, { useMemo, useState } from 'react';
import PhoneSelector from '../../Auth/phoneSelector/PhoneSelector.component';
import { useDisclosure } from '@mantine/hooks';
import useStyles from './AdminAddUser.styles';
import { useUserState } from '../../../context/UserContext';
import { RegisterFormValues } from '../../../Model/models';
import CountrySelector from '../../countrySelect/CountrySelect';

const RegisterUser = () => {
  const { classes } = useStyles();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const { allUsersAdminDashboard } = useUserState();
  const [selectedRole, setSelectedRole] = useState('');
  const filteredUsers = useMemo(() => {
    return selectedRole === 'Teacher'
      ? allUsersAdminDashboard.filter((user) => user.isStudent === true)
      : selectedRole === 'Student'
      ? allUsersAdminDashboard.filter((user) => user.isTeacher === true)
      : allUsersAdminDashboard;
  }, [selectedRole, allUsersAdminDashboard]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const renderMultiSelectOption: MultiSelectProps['renderOption'] = ({
    option,
  }) => {
    const user = filteredUsers.find((u) => u.id.toString() === option.value);

    if (!user) return null;

    return (
      <Group gap="sm">
        {user.picture ? (
          <Avatar src={user.picture} size={36} radius="xl" />
        ) : (
          <Avatar size={36} radius="xl" />
        )}
        <div>
          <Text size="sm">{user.username}</Text>
          <Text size="xs" opacity={0.5}>
            {user.email}
          </Text>
        </div>
      </Group>
    );
  };

  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
      username: '',
      gender: '',
      role: '',
      phoneNumber: '',
      country: { flag: '', name: '' },
      assignedUsers: [],
    },

    validate: {
      email: isEmail('Invalid email'),
      firstName: isNotEmpty('First name is required'),
      lastName: isNotEmpty('Last name is required'),
      username: (value) => {
        if (value.length < 3 || value.length > 20) {
          return 'Username must be between 2 and 20 characters long';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers, and underscores';
        }
        return null;
      },
      gender: isNotEmpty('Gender is required'),
      role: isNotEmpty('Role is required'),
      country: (value) => {
        if (!value.name) {
          return 'Country is required';
        }
        return null;
      },
    },
    validateInputOnChange: true,
  });

  return (
    <Container sx={{ maxWidth: '80em' }} mt="lg">
      <SimpleGrid cols={2} spacing="xs" verticalSpacing="md">
        <Avatar
          variant="filled"
          size={120}
          src={''}
          radius={120}
          color="red"
          mx="auto"
          mt="sm"
        />

        <Stack>
          <Group grow>
            <TextInput
              withAsterisk
              label="First Name"
              placeholder="Your first name"
              value={form.values.firstName}
              onChange={(event) =>
                form.setFieldValue('firstName', event.currentTarget.value)
              }
              error={form.errors.firstName && 'First name is required'}
              radius="md"
            />
            <TextInput
              label="Middle Name"
              placeholder="Your middle name"
              value={form.values.middleName}
              onChange={(event) =>
                form.setFieldValue('middleName', event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              withAsterisk
              label="Last Name"
              placeholder="Your last name"
              value={form.values.lastName}
              onChange={(event) =>
                form.setFieldValue('lastName', event.currentTarget.value)
              }
              error={form.errors.lastName && 'Last name is required'}
              radius="md"
            />
          </Group>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="name@example.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <TextInput
            label="Username (optional)"
            description="You can change it later"
            descriptionProps={{ color: 'dimmed', size: 'xs' }}
            placeholder="Username"
            {...form.getInputProps('username')}
          />

          <Group grow>
            <CountrySelector
              value={form.values.country}
              onChange={(val) => form.setFieldValue('country', val)}
            />

            <Select
              onChange={(value: string | null) => {
                setSelectedRole(value || '');
                form.setFieldValue('role', value || '');
                setChecked(false);
                setSelectedValues([]);
                value === 'Teacher' || value === 'Student' ? open() : close();
              }}
              label="Select a role"
              placeholder="Pick a role"
              data={['Student', 'Teacher', 'Admin']}
              clearable
            />

            <div
              style={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              <PhoneSelector
                value={form.values.phoneNumber}
                onChange={(val) => form.setFieldValue('phoneNumber', val)}
              />
            </div>
          </Group>
          <Collapse
            in={opened}
            transitionDuration={330}
            transitionTimingFunction="linear"
          >
            <Flex gap="md" align="center">
              <Checkbox
                className={classes.checkbox}
                label={
                  selectedRole === 'Teacher'
                    ? 'Assign student(s)?'
                    : 'Assign teacher(s)?'
                }
                checked={checked}
                onChange={(event) => {
                  setChecked(event.currentTarget.checked);
                }}
                wrapperProps={{
                  onClick: () => {
                    setChecked((c) => !c);
                    setSelectedValues([]);
                  },
                }}
              />
              <MultiSelect
                maxDropdownHeight={300}
                sx={{ width: '25em' }}
                disabled={!checked}
                data={filteredUsers.map((user) => ({
                  value: user.id.toString(),
                  label: user.username,
                }))}
                value={selectedValues}
                onChange={setSelectedValues}
                renderOption={renderMultiSelectOption}
                clearable
                hidePickedOptions
              />
            </Flex>
          </Collapse>

          <Radio.Group
            name="gender"
            label="Select Gender"
            withAsterisk
            {...form.getInputProps('gender')}
          >
            <Group mt="xs">
              <Radio value="male" label="Male" />
              <Radio value="female" label="Female" />
              <Radio value="other" label="Other" />
            </Group>
          </Radio.Group>
        </Stack>
        <Button
          onClick={() => {
            console.log(form.values);
          }}
        >
          Submit
        </Button>
      </SimpleGrid>
    </Container>
  );
};

export default RegisterUser;
