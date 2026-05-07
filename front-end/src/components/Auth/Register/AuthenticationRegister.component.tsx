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
  Anchor,
  Stack,
  Center,
  Radio,
  Checkbox,
  Collapse,
  Flex,
  MultiSelect,
  Avatar,
  MultiSelectProps,
  Select,
  PaperProps,
  Divider,
} from '@mantine/core';
import React, { useMemo, useState } from 'react';

import Preloader from '../../Loader/Preloader.component';
import { useAppState } from '../../../context/AppContext';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AlertComponent } from '../../AlertComponent/AlertComponent';
import { useRegister } from '../../hooks/useRegister';
import CountrySelector from '../../countrySelect/CountrySelect';
import PhoneSelector from '../phoneSelector/PhoneSelector.component';
import { useDisclosure } from '@mantine/hooks';
import { useUserState } from '../../../context/UserContext';
import { useStyles } from '../../admin/registerNewUsers/AdminAddUser.styles';
import { SocialButtons } from '../../SocialButtons/SocialButtons';

interface IRegisterProps extends Omit<PaperProps, 'children'> {
  children?: React.ReactNode;
  registerTitle?: string | React.ReactNode;
  adminRefetchUserList?: () => void;
  isAdminRegister?: boolean;
  rootClassName?: string;
}

const AuthenticationRegister: React.FC<IRegisterProps> = (props) => {
  const { isAuthLoading } = useAppState();
  const { classes } = useStyles();

  const navigate: NavigateFunction = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const { allUsersAdminDashboard } = useUserState();
  const filteredUsers = useMemo(() => {
    return selectedRole === 'Teacher'
      ? allUsersAdminDashboard.filter((user) => user.isStudent === true)
      : selectedRole === 'Student'
      ? allUsersAdminDashboard.filter((user) => user.isTeacher === true)
      : allUsersAdminDashboard;
  }, [selectedRole, allUsersAdminDashboard]);
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

  const {
    children,
    registerTitle,
    adminRefetchUserList,
    isAdminRegister,
    rootClassName,
    ...paperProps
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
    validate: isAdminRegister
      ? {}
      : {
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
          country: isNotEmpty('Country is required'),
          terms: isNotEmpty('You must accept terms of use'),
        },
    validateInputOnChange: true,
    // clearInputErrorOnChange: true,
  });

  return (
    <Center maw={900} mx="auto" style={{ marginTop: '1rem' }}>
      {isAuthLoading || isRegisterLoading ? (
        <Preloader />
      ) : (
        <Paper
          {...paperProps}
          className={rootClassName}
          radius="md"
          p="xl"
          withBorder
          style={{ width: '60em' }}
        >
          <Text size="lg" fw={500} ta="center">
            {registerTitle === undefined ||
            (typeof registerTitle === 'string' && registerTitle.length === 0)
              ? 'Welcome to Solo Learn, register with'
              : registerTitle}
          </Text>

          {!isAdminRegister && (
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
                role,
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
                role,
                assignedUsers: checked ? selectedValues.map(Number) : [],
                mustChangePassword: !!isAdminRegister,
              });
              form.reset();
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
              {isAdminRegister && (
                <>
                  <Group grow>
                    <Select
                      onChange={(value: string | null) => {
                        setSelectedRole(value || '');
                        form.setFieldValue('role', value || '');
                        setChecked(false);
                        setSelectedValues([]);
                        value === 'Teacher' || value === 'Student'
                          ? open()
                          : close();
                      }}
                      label="Select a role"
                      placeholder="Pick a role"
                      data={['Student', 'Teacher', 'Admin']}
                      clearable
                    />
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
                </>
              )}
              <Group grow wrap="wrap" gap="md">
                <PasswordInput
                  withAsterisk
                  label={
                    isAdminRegister
                      ? 'Confirm Temp Password'
                      : 'Confirm Password'
                  }
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
                {!isAdminRegister && (
                  <PasswordInput
                    withAsterisk
                    label={'Confirm Password'}
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
                )}
              </Group>
              {/* )} */}

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
              {!isAdminRegister ? (
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
