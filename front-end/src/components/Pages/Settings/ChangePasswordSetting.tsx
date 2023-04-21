import React from 'react';
import { Button, PasswordInput, Title } from '@mantine/core';
import { useState } from 'react';
import { IconChevronRight, IconLock, IconEyeOff, IconEye } from '@tabler/icons';
const ChangePasswordSetting = () => {
  const [password, setPassword] = useState<string>('');
  const [changePassVisible, setChangePassVisible] = useState<boolean>(false);

  const onPasswordChange = (e: React.BaseSyntheticEvent): void => {
    setPassword(e.target.value);
  };
  const onPasswordChangeHandler = (): void => {
    setChangePassVisible(true);
  };

  return (
    <>
      <Title order={6}>Password </Title>

      <span>Change the password for your account</span>
      <Button
        onClick={onPasswordChangeHandler}
        rightIcon={
          <IconChevronRight color="black" size={18}></IconChevronRight>
        }
        variant="subtle"
        color="gray"
      >
        Change password
      </Button>
      {changePassVisible ? (
        <>
          <PasswordInput
            icon={<IconLock />}
            required
            label={'Current Password'}
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <IconEyeOff size={16} /> : <IconEye size={16} />
            }
            autoComplete="on"
          />

          <div>
            <Button
              onClick={onPasswordChangeHandler}
              rightIcon={
                <IconChevronRight color="black" size={18}></IconChevronRight>
              }
              variant="light"
              color="grape"
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default ChangePasswordSetting;
