import { Box, Button, Modal, TextInput, Title } from '@mantine/core';
import React from 'react';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import UploadProfileComponent from './profileImageSettings/UploadProfile.component';
import { useStyles } from './Settings.styles';
import { AppDispatch, AppState } from '../../../context/AppContext';
import { useUserState } from '../../../context/UserContext';
// import { IUserInfoContext } from '../../../Model/UserModels';
import ChangePasswordSetting from './ChangePasswordSetting';
import { ChangeUsernameSetting } from './ChangeUsernameSetting';
// import { isUndefinedOrNullString } from '../../../lib/dist';

const SettingsComponent = () => {
  const { classes } = useStyles();
  const appDispatch = AppDispatch();
  const { isUserSettingsOpen } = AppState();
  const { user } = useUserState();

  const handleSaveChanges = () => {
    // handle API call and any necessary state updates here
    appDispatch({
      type: 'SETTINGS_SAVE_BUTTON_CLICKED',
      saveButtonClicked: true,
    });
  };
  return (
    <>
      <Modal
        opened={isUserSettingsOpen}
        transitionProps={{
          transition: 'fade',
          duration: 600,
          timingFunction: 'ease',
        }}
        overlayProps={{
          opacity: 0.55,
          blur: 4,
        }}
        // opened={true}
        centered
        withCloseButton={true}
        size="80em"
        onClose={() =>
          appDispatch({
            type: 'SET_USER_SETTINGS_MODAL',
            isUserSettingsOpen: false,
          })
        }
      >
        <Box mx="auto" className={classes.formContainer}>
          <Title>Settings</Title>
          <UploadProfileComponent />
          <DeleteAccount />
          <TextInput
            placeholder={user.email}
            label="Email"
            variant="filled"
            disabled
            withAsterisk
          />
          <ChangeUsernameSetting />

          <ChangePasswordSetting />
          <Button radius="md" type="submit" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SettingsComponent;
