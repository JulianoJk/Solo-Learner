import React from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Center,
  Text,
} from '@mantine/core';
import { useLogin } from '../../hooks/useLogin';
import { useStyles } from '../Auth.styles';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AlertComponent } from '../../AlertComponent/AlertComponent';
import { SocialButtonsUnavailable } from '../SocialButtonsUnavailable';

interface ILoginProps {
  children?: React.ReactNode;
  switchToRegister?: boolean;
  pathToNavigateAfterLogin?: string;
  refreshPageAfterLogin?: boolean;
  hasBorder?: boolean;
  loginTitle?: string | React.ReactNode;
  showNotification?: boolean;
  sessionExpiredAuth?: boolean;
}

const AuthenticationLoginForm: React.FC<ILoginProps> = (props) => {
  const {
    hasBorder,
    switchToRegister,
    children,
    loginTitle,
    sessionExpiredAuth,
  } = props;
  const { login } = useLogin({ navigateTo: '/profile', sessionExpiredAuth });

  const { classes } = useStyles();
  const navigate: NavigateFunction = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
    validateInputOnChange: true,
  });

  return (
    <Center maw={600} mx="auto">
      <Paper radius="md" p="xl" withBorder={hasBorder}>
        <Text size="lg" weight={500} ta="center">
          {loginTitle === undefined ||
          (typeof loginTitle === 'string' && loginTitle.length === 0)
            ? 'Welcome to Solo Learn, login with'
            : loginTitle}
        </Text>

        <SocialButtonsUnavailable />

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          className={classes.form}
          onSubmit={form.onSubmit((value) => {
            const { email, password } = value;
            login(email, password);
          })}
        >
          <Stack>
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
          </Stack>
          <Group position="apart" mt="xl">
            {switchToRegister ? (
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => navigate('/register')}
                size="xs"
              >
                Don't have an account?
                <Text c="blue" span>
                  &nbsp;Register
                </Text>
              </Anchor>
            ) : (
              children
            )}

            <Button type="submit" radius="xl" color="cyan">
              Login
            </Button>
          </Group>
        </form>
        {/*Display error message if any*/}
        <AlertComponent />
      </Paper>
    </Center>
  );
};
export default AuthenticationLoginForm;
