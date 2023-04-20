/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Modal, TextInput, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import UploadProfileComponent from './profileImageSettings/UploadProfile.component';
import { useStyles } from './Settings.styles';
import { AppDispatch, AppState } from '../../../context/AppContext';
import { useUserDispatch, useUserState } from '../../../context/UserContext';
import { useMutation } from '@tanstack/react-query';
import { IconMail } from '@tabler/icons';
import { updateUsernameAPI } from '../../api/api';
import {
  IApiError,
  IApiMessageResponse,
  IUserInfoContext,
} from '../../../Model/UserModels';

var SettingsComponent = () => {
  const { classes } = useStyles();
  const appDispatch = AppDispatch();
  const userDispatch = useUserDispatch();
  const { isUserSettingsOpen } = AppState();
  const { user } = useUserState();
  const [newUsername, setNewUsername] = useState(user.username);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const { mutate: updateUsernameMutation, isLoading } = useMutation(
    updateUsernameAPI,
    {
      onSuccess: (data: IApiMessageResponse | IApiError) => {
        const updatedUserInfo: IUserInfoContext = {
          ...user,
          username: newUsername,
        };
        userDispatch({ type: 'SET_USER', user: updatedUserInfo });
      },
    },
  );

  const email: string = user.email as string;

  const onUsernameChange = (e: React.BaseSyntheticEvent): void => {
    setNewUsername(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userToken = user.token;
    updateUsernameMutation({ token: userToken, email, newUsername });
    appDispatch({
      type: 'SET_USER_SETTINGS_MODAL',
      isUserSettingsOpen: false,
    });
  };

  useEffect(() => {
    setIsSaveButtonDisabled(
      newUsername?.length === 0 || newUsername === user.username ? true : false,
    );
  }, [newUsername]);
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
            placeholder={user.email}
            label="Email"
            variant="filled"
            disabled
            withAsterisk
          />
          <form onSubmit={handleSubmit}>
            <TextInput
              icon={<IconMail />}
              required
              type="text"
              label={
                <span className={classes.inputLabels}>Your full name :</span>
              }
              value={newUsername}
              onChange={onUsernameChange}
              autoComplete="on"
            />

            <Button
              radius="md"
              loading={isLoading}
              disabled={isSaveButtonDisabled}
            >
              Save changes
            </Button>
            {/* {updateUsernameMutation.isError && (
              <p>
                {updateUsernameMutation.error ??
                  'Something went wrong. Please try again later.'}
              </p>
            )} */}
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SettingsComponent;
