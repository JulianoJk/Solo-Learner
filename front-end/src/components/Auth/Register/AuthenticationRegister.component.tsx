import {
  hasLength,
  isEmail,
  isNotEmpty,
  matchesField,
  useForm,
} from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Center,
  Radio,
  Checkbox,
} from '@mantine/core';
import React from 'react';

import Preloader from '../../Loader/Preloader.component';
import { useAppState } from '../../../context/AppContext';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { SocialButtons } from '../../SocialButtons/SocialButtons';
import { AlertComponent } from '../../AlertComponent/AlertComponent';
import { useRegister } from '../../hooks/useRegister';
import CountrySelector from '../../countrySelect/CountrySelect';
import PhoneSelector from '../phoneSelector/PhoneSelector.component';

interface IRegisterProps {
  children?: React.ReactNode;
  switchToLogin?: boolean;
  hasBorder?: boolean;
  registerTitle?: string | React.ReactNode;
  showNotification?: boolean;
  displaySocialButtons?: boolean;
  adminRefetchUserList?: () => void;
  isAdminRegister?: boolean;
  rootClassName?: string;
}

const AuthenticationRegister: React.FC<IRegisterProps> = (props) => {
  const { isAuthLoading } = useAppState();
  const navigate: NavigateFunction = useNavigate();

  const {
    hasBorder,
    switchToLogin,
    children,
    registerTitle,
    displaySocialButtons,
    adminRefetchUserList,
    isAdminRegister,
    rootClassName,
  } = props;
  const { register, isLoading: isRegisterLoading } = useRegister(
    isAdminRegister,
    adminRefetchUserList,
  );

  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
      username: '',
      gender: '',
      password: '',
      confirmPassword: '',
      country: { name: '', flag: '' },
      phoneNumber: '',
      role: '',
      assignedUsers: [],
      terms: isAdminRegister ? true : false,
    },

    validate: {
      email: isEmail('Invalid email'),
      firstName: isNotEmpty('First name is required'),
      lastName: isNotEmpty('Last name is required'),
      gender: isNotEmpty('Gender is required'),
      password: hasLength(
        { min: 6 },
        'Password must be 6 or more characters long',
      ),
      confirmPassword: (value, values) =>
        matchesField('password', 'Passwords do not match')(value, values),
      role: isAdminRegister ? isNotEmpty('Role is required') : undefined,
      country: isNotEmpty('Country is required'),
      terms: isAdminRegister
        ? undefined
        : isNotEmpty('You must accept terms of use'),
    },
    validateInputOnChange: true,
  });

  return (
    <Center maw={900} mx="auto" style={{ marginTop: '1rem' }}>
      {isAuthLoading || isRegisterLoading ? (
        <Preloader />
      ) : (
        <Paper
          className={rootClassName}
          radius="md"
          p="xl"
          withBorder={hasBorder}
          {...props}
          sx={{ width: '60em' }}
        >
          <Text size="lg" fw={500} ta="center">
            {registerTitle === undefined ||
            (typeof registerTitle === 'string' && registerTitle.length === 0)
              ? 'Welcome to Solo Learn, register with'
              : registerTitle}
          </Text>

          {displaySocialButtons && (
            <>
              <SocialButtons disableFacebook />
              <Divider
                label="Or continue with email"
                labelPosition="center"
                my="lg"
              />
            </>
          )}
          <form
            onSubmit={form.onSubmit((values) => {
              if (isAdminRegister && adminRefetchUserList) {
                adminRefetchUserList();
              }
              const {
                email,
                firstName,
                middleName,
                lastName,
                username,
                gender,
                password,
                confirmPassword,
                country,
                phoneNumber,
              } = values;
              register({
                email,
                firstName,
                middleName,
                lastName,
                username,
                gender,
                password,
                confirmPassword,
                country,
                phoneNumber,
              });
            })}
          >
            <Stack>
              <TextInput
                disabled={isRegisterLoading}
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
              <Group wrap="wrap" grow gap="md">
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
                  w={{ base: '100%', sm: '33%' }}
                />
                <TextInput
                  label="Middle Name"
                  placeholder="Your middle name"
                  value={form.values.middleName}
                  onChange={(event) =>
                    form.setFieldValue('middleName', event.currentTarget.value)
                  }
                  radius="md"
                  w={{ base: '100%', sm: '33%' }}
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
                  w={{ base: '100%', sm: '33%' }}
                />
              </Group>

              <TextInput
                label="Username (optional)"
                description="You can change it later"
                descriptionProps={{ color: 'dimmed', size: 'xs' }}
                placeholder="Username"
                {...form.getInputProps('username')}
              />
              <Group grow wrap="wrap" gap="md">
                <PasswordInput
                  withAsterisk
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) =>
                    form.setFieldValue('password', event.currentTarget.value)
                  }
                  error={
                    form.errors.password &&
                    'Password should include at least 6 characters'
                  }
                  radius="md"
                  w={{ base: '100%', sm: '48%' }}
                />
                <PasswordInput
                  withAsterisk
                  label="Confirm Password"
                  placeholder="Confirm password"
                  value={form.values.confirmPassword}
                  onChange={(event) =>
                    form.setFieldValue(
                      'confirmPassword',
                      event.currentTarget.value,
                    )
                  }
                  error={
                    form.errors.confirmPassword && 'Passwords do not match'
                  }
                  radius="md"
                  w={{ base: '100%', sm: '48%' }}
                />
              </Group>

              <CountrySelector
                value={form.values.country}
                onChange={(val) =>
                  form.setFieldValue('country', {
                    name: val.name,
                    flag: val.flag,
                  })
                }
              />
              <PhoneSelector
                value={form.values.phoneNumber}
                onChange={(val) => form.setFieldValue('phoneNumber', val)}
              />
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
              {!isAdminRegister && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  error={form.errors.terms && 'You must accept terms of use'}
                  onChange={(event) =>
                    form.setFieldValue('terms', event.currentTarget.checked)
                  }
                />
              )}
            </Stack>

            <Group justify="space-between" mt="xl">
              {switchToLogin ? (
                <Anchor
                  component="button"
                  type="button"
                  c="dimmed"
                  onClick={() => navigate('/login')}
                  size="xs"
                >
                  Already have an account?
                  <Text c="blue" span>
                    &nbsp;Login
                  </Text>
                </Anchor>
              ) : (
                children
              )}

              <Button
                type="submit"
                radius="xl"
                loading={isRegisterLoading}
                color="green"
              >
                {isAdminRegister ? 'Add new user' : 'Register'}
              </Button>
            </Group>
          </form>

          <AlertComponent />
        </Paper>
      )}
    </Center>
  );
};

export default AuthenticationRegister;
