import React from 'react';
import { Button, PasswordInput, Title } from '@mantine/core';
import { useState } from 'react';
import { IconChevronRight, IconLock, IconEyeOff, IconEye } from '@tabler/icons';
import { hasLength, useForm } from '@mantine/form';
import { useStyles } from './Settings.styles';
const ChangePasswordSetting = () => {
  const [changePassVisible, setChangePassVisible] = useState<boolean>(false);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },

    validate: {
      currentPassword: hasLength(
        { min: 6, max: 30 },
        'Value must be between 6 and 30',
      ),
      newPassword: hasLength(
        { min: 6, max: 30 },
        'Value must be between 6 and 30',
      ),
      confirmNewPassword: hasLength(
        { min: 6, max: 30 },
        'Value must be between 6 and 30',
      ),
    },
  });

  const onPasswordChangeHandler = (): void => {
    setChangePassVisible(!changePassVisible);
  };

  const handleInput = async (
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  ) => {
    try {
      console.log(currentPassword, newPassword, confirmNewPassword);

      if (!form.validate().hasErrors) {
      }
      return;
    } catch (error) {
      console.warn(error);
      return;
    }
  };
  return (
    <>
      <div>
        <div className={classes.changePasswordLabel}>
          <Title order={6}>Password </Title>
          Change the password for your account
        </div>
        <Button
          className={classes.changePasswordButton}
          onClick={onPasswordChangeHandler}
          rightIcon={
            <IconChevronRight color="black" size={18}></IconChevronRight>
          }
          variant="subtle"
          color="gray"
        >
          Change password
        </Button>
      </div>
      {changePassVisible ? (
        <>
          <form
            onSubmit={form.onSubmit((values) => {
              handleInput(
                values.currentPassword,
                values.newPassword,
                values.confirmNewPassword,
              );
            })}
          >
            <PasswordInput
              icon={<IconLock />}
              label={<span>Current Password:</span>}
              placeholder="Password"
              visibilityToggleIcon={({ reveal }) =>
                reveal ? <IconEyeOff size={16} /> : <IconEye size={16} />
              }
              autoComplete="on"
              {...form.getInputProps('currentPassword')}
            />
            <PasswordInput
              icon={<IconLock />}
              label={<span>New Password :</span>}
              placeholder="Password"
              visibilityToggleIcon={({ reveal }) =>
                reveal ? <IconEyeOff size={16} /> : <IconEye size={16} />
              }
              autoComplete="on"
              {...form.getInputProps('newPassword')}
            />
            <PasswordInput
              icon={<IconLock />}
              label={<span>Confirm New Password:</span>}
              placeholder="Password"
              visibilityToggleIcon={({ reveal }) =>
                reveal ? <IconEyeOff size={16} /> : <IconEye size={16} />
              }
              autoComplete="on"
              {...form.getInputProps('confirmNewPassword')}
            />
            <Button type="submit" color={'cyan'}>
              Confirm
            </Button>
          </form>

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
