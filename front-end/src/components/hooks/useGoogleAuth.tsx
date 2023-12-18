/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useUserDispatch } from '../../context/UserContext';
import { useAppDispatch } from '../../context/AppContext';
import { isUndefinedOrNullString } from '../../utils/utils';
import { notificationAlert } from '../notifications/NotificationAlert';
import { IconCheck, IconX } from '@tabler/icons-react';
import { postGoogleLogin } from '../api/api';

export function useGoogleAuth() {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const userDispatch = useUserDispatch();

  const handleGoogleAuthError = (
    statusCode?: string | number,
    statusText?: string,
  ) => {
    appDispatch({
      type: 'SET_AUTH_IS_LOADING',
      isAuthLoading: false,
    });

    notificationAlert({
      // title: error ?? "Uh oh! Something's not right...",
      title: statusCode?.toString() ?? "Uh oh! Something's not right...",
      message:
        statusText ??
        'Please try again. If the problem persists, contact support. ',
      icon: <IconX size={18} />,
      iconColor: 'red',
      closeAfter: 10000,
    });
  };

  const handleGoogleAuthSuccess = (token: string, data: any) => {
    window.location.reload();
    appDispatch({
      type: 'SET_AUTH_IS_LOADING',
      isAuthLoading: false,
    });
    const hasToken = isUndefinedOrNullString(token);
    if (hasToken) {
      handleGoogleAuthError('Something went wrong...');
    } else {
      const user = {
        token: token,
      };

      userDispatch({ type: 'SET_USER', user });
      userDispatch({
        type: 'SET_USER_PICTURE',
        picture: data.picture,
      });

      navigate('/home');
      notificationAlert({
        title: data.authMethod ?? 'Welcome!',
        message: 'Congratulations! Your account has been created. ',
        icon: <IconCheck size={18} />,
        iconColor: 'teal',
      });
    }
  };

  const login = useGoogleLogin({
    select_account: true,
    onSuccess: async ({ code }) => {
      appDispatch({
        type: 'SET_AUTH_IS_LOADING',
        isAuthLoading: true,
      });
      try {
        const googleUserInfo = await postGoogleLogin(code);

        if (
          googleUserInfo?.response?.status !== undefined &&
          googleUserInfo.response.status === 200
        ) {
          handleGoogleAuthSuccess(
            googleUserInfo?.data?.id_token,
            googleUserInfo.data,
          );
        } else {
          const statusCodeError = `Error status code: ${googleUserInfo?.response?.status}`;
          const statusTextError = `${googleUserInfo?.response?.statusText}. Try again or contact support.`;
          handleGoogleAuthError(statusCodeError, statusTextError);
        }

        return googleUserInfo;
      } catch (error: any) {
        handleGoogleAuthError(error);
        throw error;
      }
    },
    flow: 'auth-code',
  });

  return { login };
}
