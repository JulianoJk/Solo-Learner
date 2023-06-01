import React from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
  Text,
} from '@mantine/core';
import { useStyles } from '../Auth.styles';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';
import { AlertComponent } from '../../AlertComponent/AlertComponent';
import { SocialButtonsUnavailable } from '../SocialButtonsUnavailable';

interface IRegisterProps {
  children?: React.ReactNode;
  switchToLogin?: boolean;
  pathToNavigateAfterRegister?: string;
  refreshPageAfterRegister?: boolean;
  hasBorder?: boolean;
  registerTitle?: string | React.ReactNode;
  showNotification?: boolean;
}

const AuthenticationRegisterForm: React.FC<IRegisterProps> = (props) => {
  const { hasBorder, switchToLogin, children, registerTitle } = props;
  const { register } = useRegister();
  const { classes } = useStyles();
  const navigate: NavigateFunction = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
      confirmPassword: (value, values) => {
        return value !== values.password ? 'Passwords did not match' : null;
      },
    },
    validateInputOnChange: true,
  });

  return (
    <Center maw={600} mx="auto">
      <Paper radius="md" p="xl" withBorder={hasBorder}>
        <Text size="lg" weight={500} ta="center">
          {registerTitle === undefined ||
          (typeof registerTitle === 'string' && registerTitle.length === 0)
            ? 'Welcome to Solo Learn, register with'
            : registerTitle}
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
            const { email, username, password, confirmPassword } = value;
            register({ email, username, password, confirmPassword });
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

            <TextInput
              label="Name"
              placeholder="Name"
              {...form.getInputProps('name')}
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
                form.setFieldValue('confirmPassword', event.currentTarget.value)
              }
              error={form.errors.confirmPassword && 'Passwords do not match'}
              radius="md"
            />

            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          </Stack>

          <Group position="apart" mt="xl">
            {switchToLogin ? (
              <Anchor
                component="button"
                type="button"
                color="dimmed"
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

            <Button type="submit" radius="xl">
              Register
            </Button>
          </Group>
        </form>
        {/* Display error message if any */}
        <AlertComponent />
      </Paper>
    </Center>
  );
};

export default AuthenticationRegisterForm;
