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
import { useAppState } from '../../context/AppContext';

interface SocialButtonsProps extends ButtonProps {
  disableGoogle?: boolean;
  disableFacebook?: boolean;
}

export function GoogleButton(props: ButtonProps) {
  const { login: loginUser } = useGoogleAuth();
  const { googleClientIsLoading } = useAppState();

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
      leftSection={<GoogleIcon />}
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
            leftSection={<FacebookIcon />}
            disabled={true}
            style={{
              backgroundColor: props.disabled ? '' : '#4267B2',
              color: props.disabled ? '' : '#ffff',
            }}
          >
            Sign in with Facebook
          </Button>
        </Popover.Target>
        <Popover.Dropdown style={{ pointerEvents: 'none' }}>
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
    <Group justify="center">
      <GoogleButton disabled={props.disableGoogle} />
      <FacebookButton disabled={props.disableFacebook} />
    </Group>
  );
}
