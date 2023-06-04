import React, { useEffect, useState } from 'react';
import { profileAPI, updateUsernameAPI } from '../../../api/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useUserDispatch, useUserState } from '../../../../context/UserContext';
import { useAppDispatch, AppState } from '../../../../context/AppContext';
import { IUserInfoContext } from '../../../../Model/UserModels';
import { TextInput } from '@mantine/core';
import { notificationAlert } from '../../../notifications/NotificationAlert';
import { IconMail, IconMoodHappy } from '@tabler/icons-react';
import { useStyles } from '../Settings.styles';
import { isUndefinedOrNullString } from '../../../../utils/utils';
import { useLocation } from 'react-router-dom';

export const ChangeUsernameSetting = () => {
  const appDispatch = useAppDispatch();
  const { saveButtonClicked } = AppState();
  const userDispatch = useUserDispatch();
  const { user } = useUserState();
  const { classes } = useStyles();
  const [newUsername, setNewUsername] = useState<string>('');

  const email: string = user.email as string;
  const hasToken = !isUndefinedOrNullString(user.token) ? user.token : ' ';
  const { pathname } = useLocation();
  const path = pathname;
  const parts = path.split('/');
  const usernameFromPath = parts[parts.length - 1];
  useQuery(
    ['getSettingsItems', hasToken],
    async () => {
      if (hasToken) {
        const data: IUserInfoContext | undefined = await profileAPI(
          usernameFromPath,
          hasToken,
        );
        return data;
      }
    },
    {
      enabled: true,
      onSuccess: (data) => {
        const displayUsername: string = isUndefinedOrNullString(data?.username)
          ? (user.username as string)
          : (data?.username as string);
        setNewUsername(displayUsername);
      },
    },
  );

  useEffect(() => {
    if (saveButtonClicked) {
      const userToken = user.token;
      updateUsernameMutation({ token: userToken, email, newUsername });
      appDispatch({
        type: 'SET_USER_SETTINGS_MODAL',
        isUserSettingsOpen: false,
      });
    }
    appDispatch({
      type: 'SETTINGS_SAVE_BUTTON_CLICKED',
      saveButtonClicked: false,
    });
  }, [saveButtonClicked, user, email, newUsername]);

  const { mutate: updateUsernameMutation } = useMutation(updateUsernameAPI, {
    onSuccess: (data) => {
      if (typeof data === 'object' && 'error' in data) {
        // handle the error case
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
        });
      } else {
        const updatedUserInfo: IUserInfoContext = {
          ...user,
          username: newUsername,
        };
        userDispatch({ type: 'SET_USER', user: updatedUserInfo });
        noitificationAlert(data.message);
      }
    },
  });

  const noitificationAlert = (messageToUser: string) => {
    notificationAlert({
      title: 'Username updated!',
      message: messageToUser,
      iconColor: 'yellow',
      closeAfter: 4000,
      icon: <IconMoodHappy color="black" size={18} />,
    });
  };
  const onUsernameChange = (e: React.BaseSyntheticEvent): void => {
    setNewUsername(e.target.value);
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          icon={<IconMail />}
          type="text"
          label={<span className={classes.inputLabels}>Your full name :</span>}
          value={newUsername}
          onChange={onUsernameChange}
          autoComplete="on"
        />
      </form>
    </>
  );
};
