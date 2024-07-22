import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../context/AppContext';
import { useUserDispatch } from '../../context/UserContext';
import { registerAPI, adminRegisterUserAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { isUndefinedOrNullString } from '../../utils/utils';
import { IApiError, IUserInfoContext } from '../../Model/UserModels';
import { notificationAlert } from '../notifications/NotificationAlert';
import { IconCheck } from '@tabler/icons-react';
import React from 'react';

interface RegisterApiProps {
  email: string;
  username: string;
  gender: string;
  password: string;
  confirmPassword: string;
}
interface IRegisterMutationState {
  register: (props: RegisterApiProps) => void;
  isLoading: boolean;
}

export const useRegister = (
  isAdminRegister?: boolean,
  adminRefetchUserList?: () => void,
): IRegisterMutationState => {
  const appDispatch = useAppDispatch();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    isAdminRegister ? adminRegisterUserAPI : registerAPI,
    {
      onSuccess: (data: IUserInfoContext | IApiError) => {
        if (typeof data === 'object' && 'error' in data) {
          appDispatch({
            type: 'SET_ERROR_ALERT_MESSAGE',
            errorAlertMessage: data.error.message,
          });
        } else if (isAdminRegister) {
          userDispatch({
            type: 'SET_ALL_USERS_ADMIN_DASHBOARD_LOADING',
            isAllUsersAdminDashboardLoading: isLoading,
          });
          adminRefetchUserList && adminRefetchUserList();
          notificationAlert({
            title: 'Successful registration!',
            message: 'Congratulations! User was registered! ',
            icon: <IconCheck size={18} />,
            iconColor: 'teal',
          });
        } else {
          const hasToken = isUndefinedOrNullString(data?.token);
          if (hasToken) {
            appDispatch({
              type: 'SET_ERROR_ALERT_MESSAGE',
              errorAlertMessage: 'Something went wrong...',
            });
          } else if (!hasToken) {
            const user: IUserInfoContext = {
              token: data?.token,
            };
            userDispatch({ type: 'SET_USER', user: user });
            userDispatch({
              type: 'SET_USER_PICTURE',
              picture: data.picture ?? '',
            });
            navigate('/home');
            window.location.reload();

            notificationAlert({
              title: 'Successful registration!',
              message: 'Congratulations! Your account has been created. ',
              icon: <IconCheck size={18} />,
              iconColor: 'teal',
            });
          }
        }
      },
    },
  );

  const register = ({
    email,
    username,
    gender,
    password,
    confirmPassword,
  }: RegisterApiProps) => {
    mutate({ email, username, password, gender, confirmPassword });
  };

  return {
    register,
    isLoading,
  };
};
