import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../context/AppContext';
import { useUserDispatch } from '../../context/UserContext';
import { loginAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { IApiError, IUserInfoContext } from '../../Model/UserModels';
import { notificationAlert } from '../notifications/NotificationAlert';
import { IconCheck } from '@tabler/icons-react';
import React from 'react';
import { isUndefinedOrNullString } from '../../utils/utils';

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

  const { showNotification } = props;

  const { mutate, isLoading } = useMutation<
    IUserInfoContext | IApiError,
    unknown,
    { email: string; password: string },
    unknown
  >(loginAPI, {
    onSuccess: (data: IUserInfoContext | IApiError) => {
      if ('error' in data) {
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
        });
      } else {
        if (!data.token) {
          appDispatch({
            type: 'SET_ERROR_ALERT_MESSAGE',
            errorAlertMessage: 'Something went wrong...',
          });
        } else {
          const user: IUserInfoContext = {
            token: data.token,
          };

          userDispatch({ type: 'SET_USER', user });
          userDispatch({
            type: 'SET_USER_PICTURE',
            picture: data.picture ?? '',
          });

          // Show notification
          if (showNotification !== false) {
            notificationAlert({
              title: 'Login Successful!',
              message: "Great to see you! You're all set to go.",
              icon: <IconCheck size={18} />,
              iconColor: 'teal',
            });
          }
          const nav = isUndefinedOrNullString(data.navigateUser)
            ? '/home'
            : data.navigateUser;
          navigate(nav as string);
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
