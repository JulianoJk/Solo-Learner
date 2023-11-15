import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useUserDispatch } from '../../context/UserContext';
import { useAppDispatch } from '../../context/AppContext';
import { isUndefinedOrNullString } from '../../utils/utils';
import { IUserInfoContext } from '../../Model/UserModels';
import { notificationAlert } from '../notifications/NotificationAlert';
import { IconCheck } from '@tabler/icons-react';

export function useGoogleAuth() {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const userDispatch = useUserDispatch();
  return useGoogleLogin({
    onSuccess: async ({ code }: any) => {
      try {
        const formData = new FormData();
        formData.append('code', code);

        const response = await fetch('http://localhost:3001/signin-google', {
          method: 'POST',
          body: formData, // Send code as a form parameter
        });
        if (response.status === 200) {
          const data = await response.json();
          const token = data?.id_token || data?.googleToken;

          if (typeof data === 'object' && 'error' in data) {
            appDispatch({
              type: 'SET_ERROR_ALERT_MESSAGE',
              errorAlertMessage: data.error.message,
            });
          } else {
            const hasToken = isUndefinedOrNullString(token);
            if (hasToken) {
              appDispatch({
                type: 'SET_ERROR_ALERT_MESSAGE',
                errorAlertMessage: 'Something went wrong...',
              });
            } else if (!hasToken) {
              const user: IUserInfoContext = {
                token: token,
              };
              userDispatch({ type: 'SET_USER', user: user });

              navigate('/home');
              notificationAlert({
                title: data.authMethod ?? 'Welcome!',
                message: 'Congratulations! Your account has been created. ',
                icon: <IconCheck size={18} />,
                iconColor: 'teal',
              });
            }
          }
          return data;
        } else {
          console.error('Authentication failed:', response.statusText);
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error; // Rethrow the error to handle it in the component
      }
    },
    flow: 'auth-code',
  });
}
