import React, { useEffect, useState } from 'react';
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
  Loader,
  Title,
} from '@mantine/core';
import { useLogin } from '../../hooks/useLogin';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AlertComponent } from '../../AlertComponent/AlertComponent';
import { SocialButtons } from '../../SocialButtons/SocialButtons';
import { AppState } from '../../../context/AppContext';
import { indexPage } from '../../api/api';
import classes from '../Auth.module.css';

interface ILoginProps {
  children?: React.ReactNode;
  switchToRegister?: boolean;
  pathToNavigateAfterLogin?: string;
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
  const { isAuthLoading } = AppState();
  const { login } = useLogin({
    navigateTo: localStorage.getItem('lastVisitedPath') || '/home',
    sessionExpiredAuth,
  });

  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState(true);

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
        } else {
          // Token is not present, continue with loading
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to check authentication:', error);
      } finally {
        // Set loading to false once authentication check is complete
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);
  return (
    <Center maw={600} mx="auto" style={{ marginTop: '10rem' }}>
      {isAuthLoading || loading ? (
        <Stack align="center">
          <Loader color="teal" size={400} />

          <Title>Loading...</Title>
        </Stack>
      ) : (
        <Paper radius="md" p="xl" withBorder={hasBorder}>
          <Text size="lg" fw={500} ta="center">
            {loginTitle === undefined ||
            (typeof loginTitle === 'string' && loginTitle.length === 0)
              ? 'Welcome to Solo Learn, login with'
              : loginTitle}
          </Text>

          <SocialButtons disableFacebook />

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
            <Group justify="space-between" mt="xl">
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
      )}
    </Center>
  );
};
export default AuthenticationLoginForm;
