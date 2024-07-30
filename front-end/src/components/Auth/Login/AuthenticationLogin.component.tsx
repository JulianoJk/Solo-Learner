import { useForm } from '@mantine/form';
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
} from '@mantine/core';
import React, { useEffect } from 'react';

import Preloader from '../../Loader/Preloader.component';
import { useAppState } from '../../../context/AppContext';
import { useLogin } from '../../hooks/useLogin';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { indexPage } from '../../api/api';
import { SocialButtons } from '../../SocialButtons/SocialButtons';
import { AlertComponent } from '../../AlertComponent/AlertComponent';
interface ILoginProps {
  children?: React.ReactNode;
  switchToRegister?: boolean;
  pathToNavigateAfterLogin?: string;
  hasBorder?: boolean;
  loginTitle?: string | React.ReactNode;
  showNotification?: boolean;
  sessionExpiredAuth?: boolean;
}

const AuthenticationLogin: React.FC<ILoginProps> = (props) => {
  const { isAuthLoading } = useAppState();
  const navigate: NavigateFunction = useNavigate();

  const {
    hasBorder,
    switchToRegister,
    children,
    loginTitle,
    sessionExpiredAuth,
  } = props;
  const { login, isLoading } = useLogin({
    navigateTo: localStorage.getItem('lastVisitedPath') || '/home',
    sessionExpiredAuth,
  });
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
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
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Retrieve the JWT token from local storage
        const jwtToken = localStorage.getItem('jwtToken');

        // If the token is present, pass it to the authentication function
        if (jwtToken) {
          const response: any = await indexPage(jwtToken);

          // If the user is logged in, navigate to the specified path
          if (response && response.navigateUser) {
            navigate(response.navigateUser);
          }
        }
      } catch (error) {
        console.error('Failed to check authentication:', error);
      } finally {
        // Set loading to false once authentication check is complete
      }
    };

    checkAuthentication();
  }, [navigate]);
  return (
    <Center maw={600} mx="auto" style={{ marginTop: '1rem' }}>
      {isAuthLoading || isLoading ? (
        <Preloader></Preloader>
      ) : (
        <Paper
          radius="md"
          p="xl"
          withBorder={hasBorder}
          {...props}
          sx={{ width: '60em' }}
        >
          <Text size="lg" fw={500} ta="center">
            {loginTitle === undefined ||
            (typeof loginTitle === 'string' && loginTitle.length === 0)
              ? 'Welcome to Solo Learn, login with'
              : loginTitle}
          </Text>

          <SocialButtons disableFacebook={true} disableGoogle={isLoading} />

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form
            onSubmit={form.onSubmit((value) => {
              const { email, password } = value;
              login(email, password);
            })}
          >
            <Stack>
              <TextInput
                disabled={isLoading}
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
                disabled={isLoading}
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

            <Group justify="space-between" mt="xl">
              {switchToRegister ? (
                <Anchor
                  disabled={isLoading}
                  component="button"
                  type="button"
                  c="dimmed"
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

              <Button
                type="submit"
                radius="xl"
                color="cyan"
                disabled={isLoading}
              >
                Login
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
export default AuthenticationLogin;
