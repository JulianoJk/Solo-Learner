/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useGetGoogleClientId } from '../hooks/useGetGoogleClientId';
import { useHover } from '@mantine/hooks';
import { postGoogleLogin } from '../api/api';
import { useGoogleLogin } from '@react-oauth/google';
interface SocialButtonsProps extends ButtonProps {
  disableGoogle?: boolean;
  disableFacebook?: boolean;
}

export function GoogleButton(props: ButtonProps) {
  const { data: clientId, isLoading } = useGetGoogleClientId();
  console.log(
    '🚀 ~ file: SocialButtons.tsx:23 ~ GoogleButton ~ clientId:',
    clientId,
  );

  const login = useGoogleLogin({
    onSuccess: async ({ code }: any) => {
      try {
        const response = await fetch('http://localhost:3001/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
          }),
        });

        const data = await response.json();
        console.log(
          '🚀 ~ file: SocialButtons.tsx:43 ~ onSuccess: ~ data:',
          data,
        );
        return data;

        // const { id_token } = response.data;

        // Store the id_token in localStorage
        // localStorage.setItem('id_token', id_token);

        // console.log('id_token stored in localStorage:', id_token);
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    flow: 'auth-code',
  });
  // const login = () => {
  //   console.log('login');
  // };
  return (
    <>
      <Button
        onClick={() => login()}
        leftIcon={<GoogleIcon />}
        loading={isLoading}
        variant="default"
        color="gray"
        {...props}
      />
    </>
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
          />
        </Popover.Target>
        <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
          <Center>
            <Text size="sm">Comming soon</Text>
          </Center>
        </Popover.Dropdown>
      </Popover>
    </span>
  );
}

export function SocialButtons(props: SocialButtonsProps) {
  return (
    <Group position="center">
      <GoogleButton disabled={props.disableGoogle}>
        Continue with Google
      </GoogleButton>
      <FacebookButton disabled={props.disableFacebook}>
        Sign in with Facebook
      </FacebookButton>
    </Group>
  );
}
