/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Autocomplete,
  AutocompleteProps,
  Avatar,
  Button,
  Container,
  Group,
  Menu,
  PasswordInput,
  Radio,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
  Text,
  Select,
} from '@mantine/core';
import {
  hasLength,
  isEmail,
  isNotEmpty,
  matchesField,
  useForm,
} from '@mantine/form';
import { IconSchool, IconUser, IconUserCog } from '@tabler/icons-react';
import React, { useState } from 'react';
import { getCountriesAPI } from '../../api/api';
import { useQuery } from '@tanstack/react-query';

const RegisterUser = () => {
  const [selectedCountry, setSelectedCountry] = useState('Select Role');
  const { data: allCoutrniesMenu, isLoading } = useQuery(
    ['getCountries'],
    async () => {
      const data = await getCountriesAPI();
      return data.map((country: any) => country.name.common);
    },
  );

  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      gender: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: isEmail('Invalid email'),
      firstName: isNotEmpty('First name is required'),
      lastName: isNotEmpty('Last name is required'),
      username: (value) => {
        if (value.length < 3 || value.length > 20) {
          return 'Username must be between 3 and 20 characters long';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers, and underscores';
        }
        return null;
      },
      gender: isNotEmpty('Gender is required'),
      password: hasLength(
        { min: 6 },
        'Password must be 6 or more characters long',
      ),
      confirmPassword: (value, values) =>
        matchesField('password', 'Passwords do not match')(value, values),
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
          {/* First Name and Last Name in the same row */}
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
              value={form.values.lastName}
              onChange={(event) =>
                form.setFieldValue('lastName', event.currentTarget.value)
              }
              error={form.errors.lastName && 'Last name is required'}
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
            <Autocomplete
              disabled={isLoading}
              label="Select country"
              placeholder="Type to search or select a country"
              data={allCoutrniesMenu}
            />
            <Select
              label="Select a role"
              placeholder="Pick a role"
              data={['Student', 'Teacher', 'Admin']}
              clearable
                      />
                    
          </Group>

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
      </SimpleGrid>
    </Container>
  );
};

export default RegisterUser;
