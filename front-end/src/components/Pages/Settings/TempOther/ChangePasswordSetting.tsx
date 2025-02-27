import React from 'react';
import { Button, Collapse, PasswordInput, Title } from '@mantine/core';
import { useState } from 'react';
import {
  IconChevronRight,
  IconLock,
  IconEyeOff,
  IconEye,
} from '@tabler/icons-react';
import { hasLength, useForm } from '@mantine/form';

import { useDisclosure } from '@mantine/hooks';
import { useStyles } from '../Settings.styles';
const ChangePasswordSetting = () => {
  const { classes } = useStyles();
  const [changePassVisible, setChangePassVisible] = useState<boolean>(true);
  const [opened, { toggle }] = useDisclosure(false, {
    onOpen: () => setChangePassVisible(false),
    onClose: () => setChangePassVisible(true),
  });
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
      {changePassVisible ? (
        <div>
          <div className={classes.changePasswordLabel}>
            <Title order={6}>Password </Title>
            Change the password for your account
          </div>
          <Button
            className={classes.changePasswordButton}
            onClick={toggle}
            rightSection={<IconChevronRight></IconChevronRight>}
            variant="subtle"
            color="gray"
          >
            Change password
          </Button>
        </div>
      ) : (
        <></>
      )}

      <Collapse
        in={opened}
        transitionDuration={500}
        transitionTimingFunction="linear"
        animateOpacity={true}
      >
        <form
          className={classes.formContainer}
          onSubmit={form.onSubmit((values) => {
            handleInput(
              values.currentPassword,
              values.newPassword,
              values.confirmNewPassword,
            );
          })}
        >
          <PasswordInput
            className={classes.formInput}
            leftSection={<IconLock />}
            label={<span>Current Password:</span>}
            placeholder="Password"
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <IconEyeOff /> : <IconEye />
            }
            autoComplete="on"
            {...form.getInputProps('currentPassword')}
          />
          <PasswordInput
            className={classes.formInput}
            leftSection={<IconLock />}
            label={<span>New Password :</span>}
            placeholder="Password"
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <IconEyeOff /> : <IconEye />
            }
            autoComplete="on"
            {...form.getInputProps('newPassword')}
          />
          <PasswordInput
            className={classes.formInput}
            leftSection={<IconLock />}
            label={<span>Confirm New Password:</span>}
            placeholder="Password"
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <IconEyeOff /> : <IconEye />
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
            onClick={toggle}
            rightSection={<IconChevronRight></IconChevronRight>}
            variant="light"
            color="grape"
          >
            Cancel
          </Button>
        </div>
      </Collapse>
    </>
  );
};
export default ChangePasswordSetting;
