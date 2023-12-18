import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../context/AppContext';
import { useUserDispatch } from '../../context/UserContext';
import { loginAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { isUndefinedOrNullString } from '../../utils/utils';
import { IApiError, IUserInfoContext } from '../../Model/UserModels';
import { notificationAlert } from '../notifications/NotificationAlert';
import { IconCheck } from '@tabler/icons-react';

interface ILoginMutationProps {
  showNotification?: boolean;
  navigateTo: string;
  sessionExpiredAuth?: boolean;
}
interface ILoginMutationState {
  login: (email: string, password: string) => void;
  isLoading: boolean;
}

export const useLogin = (props: ILoginMutationProps): ILoginMutationState => {
  const appDispatch = useAppDispatch();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const { navigateTo, showNotification, sessionExpiredAuth } = props;
  const { mutate, isLoading } = useMutation<
    IUserInfoContext | IApiError,
    unknown,
    { email: string; password: string },
    unknown
  >(loginAPI, {
    onSuccess: (data: IUserInfoContext | IApiError) => {
      if (typeof data === 'object' && 'error' in data) {
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
        });
      } else {
        const hasToken = !isUndefinedOrNullString(data?.token);
        if (!hasToken) {
          appDispatch({
            type: 'SET_ERROR_ALERT_MESSAGE',
            errorAlertMessage: 'Something went wrong...',
          });
        } else if (hasToken) {
          const user: IUserInfoContext = {
            token: data?.token,
          };
          window.location.reload();
          userDispatch({ type: 'SET_USER', user: user });
          userDispatch({
            type: 'SET_USER_PICTURE',
            picture: data.picture ?? '',
          });

          sessionExpiredAuth
            ? appDispatch({
                type: 'SET_USER_LOGGED_IN_AGAIN',
                userReLoggedIn: true,
              })
            : '';

          navigate(sessionExpiredAuth ? navigateTo : '/home');
          showNotification === false ? (
            <></>
          ) : (
            notificationAlert({
              title: 'Login Successful!',
              message: "Great to see you! You're all set to go.",
              icon: <IconCheck size={18} />,
              iconColor: 'teal',
            })
          );
        }
      }
    },
  });

  const login = (email: string, password: string) => {
    mutate({ email, password });
  };
  return {
    login,
    isLoading,
  };
};
