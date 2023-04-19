import { Box, Modal, TextInput, Title } from '@mantine/core';
import React, { useState } from 'react';
import { IconMail } from '@tabler/icons';

import DeleteAccount from './DeleteAccount/DeleteAccount';
import UploadProfileComponent from './profileImageSettings/UploadProfile.component';
import { useStyles } from './Settings.styles';
import { AppDispatch, AppState } from '../../../context/AppContext';

var SettingsComponent = () => {
  const [email, setEmail] = useState<string>('');
  const { classes } = useStyles();
  const appDispatch = AppDispatch();
  const { isUserSettingsOpen } = AppState();

  const onEmailChange = (e: React.BaseSyntheticEvent): void => {
    setEmail(e.target.value);
  };
  return (
    <>
      <Modal
        opened={isUserSettingsOpen}
        transition="fade"
        centered
        transitionDuration={600}
        overlayBlur={4}
        withCloseButton={false}
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
            value={email}
            onChange={onEmailChange}
            autoComplete="on"
          />
        </Box>
      </Modal>
    </>
  );
};

export default SettingsComponent;
