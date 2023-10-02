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
  const loginUser = useGoogleAuth();
  const { googleClientIsLoading } = AppState();
  const handleGoogleLogin = async () => {
    try {
      const userData = await loginUser();

      // TODO!: Handle the user data here, for example, you can redirect to a profile page
      console.log('User data after Google login:', userData);
    } catch (error) {
      // Handle login error here
      console.error('Google login error:', error);
    }
  };

  return (
    <>
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
