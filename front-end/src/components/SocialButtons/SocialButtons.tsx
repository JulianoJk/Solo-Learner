import { Button, ButtonProps, Group } from '@mantine/core';
import { GoogleIcon } from './GoogleIcon';
import { FacebookIcon } from './FacebookIcon';
interface SocialButtonsProps extends ButtonProps {
  disableGoogle?: boolean;
  disableFacebook?: boolean;
}
export function GoogleButton(props: ButtonProps) {
  return (
    <>
      <Button
        leftIcon={<GoogleIcon />}
        variant="default"
        color="gray"
        {...props}
      />
    </>
  );
}

export function FacebookButton(props: ButtonProps) {
  return (
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
