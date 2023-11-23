import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useUserDispatch } from '../../context/UserContext';
import { useAppDispatch } from '../../context/AppContext';
import { isUndefinedOrNullString } from '../../utils/utils';
import { notificationAlert } from '../notifications/NotificationAlert';
import { IconCheck } from '@tabler/icons-react';
import { postGoogleLogin } from '../api/api';

export function useGoogleAuth() {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const userDispatch = useUserDispatch();

  const handleGoogleAuthError = (error: any) => {
    appDispatch({
      type: 'SET_AUTH_IS_LOADING',
      isAuthLoading: false,
    });
    console.error('Login error:', error);
    appDispatch({
      type: 'SET_ERROR_ALERT_MESSAGE',
      errorAlertMessage: error.error.message || 'Something went wrong...',
    });
  };

  const handleGoogleAuthSuccess = (token: string, data: any) => {
    appDispatch({
      type: 'SET_AUTH_IS_LOADING',
      isAuthLoading: false,
    });
    const hasToken = isUndefinedOrNullString(token);
    if (hasToken) {
      handleGoogleAuthError({ message: 'Something went wrong...' });
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
    onSuccess: async ({ code }) => {
      appDispatch({
        type: 'SET_AUTH_IS_LOADING',
        isAuthLoading: true,
      });
      try {
        const googleUserInfo = await postGoogleLogin(code);

        const token = googleUserInfo?.id_token || googleUserInfo?.googleToken;

        if (typeof googleUserInfo === 'object' && 'error' in googleUserInfo) {
          handleGoogleAuthError(googleUserInfo.error.message);
        } else {
          handleGoogleAuthSuccess(token, googleUserInfo);
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
