/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Group,
  Modal,
  ScrollArea,
  SimpleGrid,
  Stack,
  Tabs,
  TextInput,
  Title,
} from '@mantine/core';
import React from 'react';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import UploadProfileComponent from './profileImageSettings/UploadProfile.component';
import { useStyles } from './Settings.styles';
import { AppDispatch, AppState } from '../../../context/AppContext';
import { useUserState } from '../../../context/UserContext';
// import { IUserInfoContext } from '../../../Model/UserModels';
import ChangePasswordSetting from './ChangePasswordSetting';
import { ChangeUsernameSetting } from './ChangeUsernameSetting';
import { SettingsHeader } from './SettingsHeader.component';
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
        // opened={true}
        transition="fade"
        centered
        transitionDuration={600}
        overlayBlur={4}
        withCloseButton={true}
        transitionTimingFunction="ease"
        size="50em"
        onClose={() =>
          appDispatch({
            type: 'SET_USER_SETTINGS_MODAL',
            isUserSettingsOpen: false,
          })
        }
      >
        <SettingsHeader links={[{ link: '', label: 'b' }]}></SettingsHeader>
        {/* <Tabs color="cyan" defaultValue="AccountDetails">
          <Tabs.List>
            <Tabs.Tab value="AccountDetails">Account details</Tabs.Tab>
            <Tabs.Tab value="Security">Security</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="AccountDetails">
            <ScrollArea h={550} type="auto" offsetScrollbars>
              <Box className={classes.formContainer}>
                <Title>Settings</Title>
                <UploadProfileComponent />

                <SimpleGrid cols={2} spacing="xl" verticalSpacing="xl">
                  <TextInput
                    className={classes.formInput}
                    placeholder={user.email}
                    label="Email"
                    variant="filled"
                    disabled
                    withAsterisk
                  />
                  <ChangeUsernameSetting />
                </SimpleGrid>
              </Box>
            </ScrollArea>

            <Button radius="md" type="submit" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </Tabs.Panel>
          <Tabs.Panel value="Security">
            <ChangePasswordSetting />
            <DeleteAccount />
          </Tabs.Panel>
        </Tabs> */}
      </Modal>
    </>
  );
};

export default SettingsComponent;
