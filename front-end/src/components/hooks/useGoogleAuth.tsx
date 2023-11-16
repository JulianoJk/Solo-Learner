import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useUserDispatch } from '../../context/UserContext';
import { useAppDispatch } from '../../context/AppContext';
import { isUndefinedOrNullString } from '../../utils/utils';
import { notificationAlert } from '../notifications/NotificationAlert';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const userDispatch = useUserDispatch();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleGoogleAuthError = (error: any) => {
    if (isMounted.current) {
      setLoading(false);
      console.error('Login error:', error);
      appDispatch({
        type: 'SET_ERROR_ALERT_MESSAGE',
        errorAlertMessage: error.error.message || 'Something went wrong...',
      });
    }
  };

  const handleGoogleAuthSuccess = (token: string, data: any) => {
    if (isMounted.current) {
      setLoading(false);
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
    }
  };

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        if (!isMounted.current) return;

        const formData = new FormData();
        formData.append('code', code);

        const response = await fetch('http://localhost:3001/signin-google', {
          method: 'POST',
          body: formData,
        });

        if (!isMounted.current) return;

        if (response.status === 200) {
          const data = await response.json();
          const token = data?.id_token || data?.googleToken;

          if (typeof data === 'object' && 'error' in data) {
            handleGoogleAuthError(data.error.message);
          } else {
            handleGoogleAuthSuccess(token, data);
          }

          return data;
        } else {
          console.error('Authentication failed:', response.statusText);
          throw new Error('Authentication failed');
        }
      } catch (error: any) {
        if (isMounted.current) {
          handleGoogleAuthError(error);
          throw error;
        }
      }
    },
    flow: 'auth-code',
  });
  useEffect(() => {
    appDispatch({
      type: 'SET_AUTH_IS_LOADING',
      isAuthLoading: loading,
    });
  }, [loading, appDispatch]);
  return { login };
}
