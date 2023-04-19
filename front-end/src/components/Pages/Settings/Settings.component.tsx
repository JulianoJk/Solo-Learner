import { Box, Modal, TextInput, Title } from '@mantine/core';
import React, { useState } from 'react';

import DeleteAccount from './DeleteAccount/DeleteAccount';
import UploadProfileComponent from './profileImageSettings/UploadProfile.component';
import { useStyles } from './Settings.styles';
import { AppDispatch, AppState } from '../../../context/AppContext';
import { useUserState } from '../../../context/UserContext';
import { IconMail } from '@tabler/icons';

var SettingsComponent = () => {
  const { classes } = useStyles();
  const appDispatch = AppDispatch();
  const { isUserSettingsOpen } = AppState();
  const { user } = useUserState();
  const [username, setUsername] = useState<string>(user.username as string);
  const onUsernameChange = (e: React.BaseSyntheticEvent): void => {
    setUsername(e.target.value);
  };
  return (
    <>
      <Modal
        opened={isUserSettingsOpen}
        transition="fade"
        centered
        transitionDuration={600}
        overlayBlur={4}
        withCloseButton={true}
        transitionTimingFunction="ease"
        onClose={() =>
          appDispatch({
            type: 'SET_USER_SETTINGS_MODAL',
            isUserSettingsOpen: false,
          })
        }
      >
        <Title>Settings</Title>
        <UploadProfileComponent />
        <DeleteAccount />
        <Box sx={{ maxWidth: 600 }} mx="auto" className={classes.formContainer}>
          <TextInput
            icon={<IconMail />}
            required
            type="email"
            label={
              <span className={classes.inputLabels}>Your full name :</span>
            }
            placeholder="name@example.com"
            value={username}
            onChange={onUsernameChange}
            autoComplete="on"
          />
          <TextInput
            placeholder={user.email}
            label="Email"
            variant="filled"
            disabled
            withAsterisk
          />
        </Box>
      </Modal>
    </>
  );
};

export default SettingsComponent;
