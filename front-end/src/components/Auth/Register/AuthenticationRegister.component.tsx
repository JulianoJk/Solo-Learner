import { hasLength, isEmail, isNotEmpty, useForm } from '@mantine/form';
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
      username: '',
      gender: '',
      password: '',
      confirmPassword: '',
      terms: isAdminRegister ? true : false,
    },

    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 6 }, 'Value must be 6 or more'),
      confirmPassword: isNotEmpty('You must accept terms of use'),
      terms: isAdminRegister
        ? undefined
        : isNotEmpty('You must accept terms of use'),
    },
    validateInputOnChange: true,
  });

  return (
    <Center maw={600} mx="auto" style={{ marginTop: '1rem' }}>
      {isAuthLoading || isRegisterLoading ? (
        <Preloader></Preloader>
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
            onSubmit={form.onSubmit((value) => {
              isAdminRegister && adminRefetchUserList && adminRefetchUserList();
              const { email, username, gender, password, confirmPassword } =
                value;
              register({ email, username, gender, password, confirmPassword });
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
              <TextInput
                label="Username (optional)"
                description="You can change it later"
                // q: in css, how can I make a text to be italics?
                descriptionProps={{ color: 'dimmed', size: 'xs' }}
                placeholder="Username"
                {...form.getInputProps('username')}
              />

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
              />
              <PasswordInput
                withAsterisk
                label="Confirm password"
                placeholder="Confirm password"
                value={form.values.confirmPassword}
                onChange={(event) =>
                  form.setFieldValue(
                    'confirmPassword',
                    event.currentTarget.value,
                  )
                }
                error={form.errors.confirmPassword && 'Passwords do not match'}
                radius="md"
              />
              <Radio.Group
                name="gender"
                label="Select gender"
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
          {/*Display error message if any*/}
          <AlertComponent />
        </Paper>
      )}
    </Center>
  );
};
export default AuthenticationRegister;
