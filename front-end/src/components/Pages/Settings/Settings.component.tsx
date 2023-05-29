/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { SettingsHeader } from './settingsHeader/SettingsHeader.component';
import { Modal, SimpleGrid, Tabs, TextInput, Title } from '@mantine/core';
import { AppState, useAppDispatch } from '../../../context/AppContext';
import { ChangeUsernameSetting } from './TempOther/ChangeUsernameSetting';
import { IconMail } from '@tabler/icons-react';

function Settings() {
  const { isUserSettingsOpen } = AppState();
  const appDispatch = useAppDispatch();

  const data = [
    {
      link: '/about',
      label: 'Features',
    },
    {
      link: '/pricing',
      label: 'Pricing',
    },
    {
      link: '/learn',
      label: 'Learn',
    },
    {
      link: '/community',
      label: 'Community',
    },
  ];

  return (
    <>
      <Modal
        title={<Title order={3}>Settings</Title>}
        size="300em"
        overlayProps={{
          opacity: 0.55,
          blur: 4,
        }}
        withCloseButton={true}
        opened={isUserSettingsOpen}
        onClose={() =>
          appDispatch({
            type: 'SET_USER_SETTINGS_MODAL',
            isUserSettingsOpen: false,
          })
        }
      >
        <Tabs defaultValue="profile">
          <Tabs.List>
            <Tabs.Tab value="profile" color="teal">
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="account">Account</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile">
            <SimpleGrid cols={2}>
              <ChangeUsernameSetting></ChangeUsernameSetting>
              <TextInput icon={<IconMail />} type="text" autoComplete="on" />
            </SimpleGrid>
          </Tabs.Panel>
          <Tabs.Panel value="account">Second account panel</Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
}

export default Settings;
