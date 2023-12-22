import React from 'react';
import {
  Button,
  ButtonProps,
  Center,
  Group,
  Popover,
  Text,
} from '@mantine/core';
import { GoogleIcon } from './GoogleIcon';
import { FacebookIcon } from './FacebookIcon';
import { useHover } from '@mantine/hooks';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { AppState } from '../../context/AppContext';

interface SocialButtonsProps extends ButtonProps {
  disableGoogle?: boolean;
  disableFacebook?: boolean;
}

export function GoogleButton(props: ButtonProps) {
  const { login: loginUser } = useGoogleAuth();
  const { googleClientIsLoading } = AppState();

  const handleGoogleLogin = async () => {
    try {
      await loginUser();
      // TODO: Handle the user data here, e.g., redirect to a profile page
    } catch (error) {
      // Handle login error here
      console.error('Google login error:', error);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      leftIcon={<GoogleIcon />}
      loading={googleClientIsLoading}
      variant="default"
      color="gray"
      {...props}
    >
      Sign in with Google
    </Button>
  );
}

export function FacebookButton(props: ButtonProps) {
  const { hovered, ref } = useHover();

  return (
    <span ref={ref}>
      <Popover
        width={200}
        position="bottom"
        withArrow
        shadow="md"
        opened={hovered}
      >
        <Popover.Target>
          <Button
            leftIcon={<FacebookIcon />}
            sx={(theme) => ({
              backgroundColor: '#4267B2',
              color: '#fff',
              '&:not([data-disabled]):hover': {
                backgroundColor: theme.fn.darken('#4267B2', 0.1),
              },
            })}
            {...props}
          >
            Sign in with Facebook
          </Button>
        </Popover.Target>
        <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
          <Center>
            <Text size="sm">Coming soon</Text>
          </Center>
        </Popover.Dropdown>
      </Popover>
    </span>
  );
}

export function SocialButtons(props: SocialButtonsProps) {
  return (
    <Group position="center">
      <GoogleButton disabled={props.disableGoogle} />
      <FacebookButton disabled={props.disableFacebook} />
    </Group>
  );
}
