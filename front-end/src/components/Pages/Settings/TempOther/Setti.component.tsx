/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Modal, Tabs, TextInput, Title } from '@mantine/core';
import React from 'react';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import UploadProfileComponent from './profileImageSettings/UploadProfile.component';
import { useStyles } from '../Settings.styles';
import { useAppDispatch, AppState } from '../../../../context/AppContext';
import { useUserState } from '../../../../context/UserContext';
// import { IUserInfoContext } from '../../../Model/UserModels';
import ChangePasswordSetting from './ChangePasswordSetting';
import { ChangeUsernameSetting } from './ChangeUsernameSetting';
// import { isUndefinedOrNullString } from '../../../lib/dist';

const SettingsComponent = () => {
  const { classes } = useStyles();
  const appDispatch = useAppDispatch();
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
        opened={false}
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
        {/* <Box mx="auto" className={classes.formContainer}>
          <Title>Settings</Title>
          {/* <UploadProfileComponent /> */}
        <Tabs defaultValue="account">
          <Tabs.List grow position="center">
            <Tabs.Tab value="account">Account Settings</Tabs.Tab>
            <Tabs.Tab value="general">General Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="account" pt="xs">
            <TextInput
              placeholder={user.email}
              label="Email"
              variant="filled"
              disabled
              withAsterisk
            />
            <ChangeUsernameSetting />
          </Tabs.Panel>
          <Tabs.Panel value="general" pt="xs">
            general tab content
          </Tabs.Panel>
        </Tabs>
        {/* <DeleteAccount /> */}

        {/* <ChangePasswordSetting /> */}
        {/* <Button radius="md" type="submit" onClick={handleSaveChanges}>
          Save changes
        </Button> */}
        {/* </Box>  */}
      </Modal>
    </>
  );
};

export default SettingsComponent;
