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
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  gender: string;
  password: string;
  confirmPassword: string;
  country: { flag: string; name: string };
  phoneNumber: string;
  assignedUsers?: any;
  role?: string;
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

  const mutationFn = async (
    data: RegisterApiProps,
  ): Promise<IUserInfoContext | IApiError> => {
    if (isAdminRegister) {
      const {
        email,
        username,
        gender,
        firstName,
        middleName,
        lastName,
        country,
        phoneNumber,
        role,
        assignedUsers,
      } = data;

      const isTeacher = role === 'Teacher';
      const isStudent = role === 'Student';

      return await adminRegisterUserAPI({
        email,
        username,
        gender,
        firstName,
        middleName,
        lastName,
        country,
        phoneNumber,
        picture: '', // or provide real picture if needed
        isTeacher,
        isStudent,
        assignedUsers: assignedUsers ?? [],
        role: role || '',
      });
    } else {
      return await registerAPI({
        ...data,
        assignedUsers: data.assignedUsers ?? [],
      });
    }
  };

  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: (data) => {
      if ('error' in data) {
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
        });
        return;
      }

      if (isAdminRegister) {
        userDispatch({
          type: 'SET_ALL_USERS_ADMIN_DASHBOARD_LOADING',
          isAllUsersAdminDashboardLoading: isLoading,
        });
        adminRefetchUserList?.();
        notificationAlert({
          title: 'Successful registration!',
          message: 'Congratulations! User was registered!',
          icon: <IconCheck size={18} />,
          iconColor: 'teal',
        });
        return;
      }

      const hasToken = isUndefinedOrNullString(data?.token);
      if (hasToken) {
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: 'Something went wrong...',
        });
        return;
      }

      userDispatch({ type: 'SET_USER', user: data });
      userDispatch({ type: 'SET_USER_PICTURE', picture: data.picture ?? '' });
      navigate('/home');
      window.location.reload();

      notificationAlert({
        title: 'Successful registration!',
        message: 'Congratulations! Your account has been created.',
        icon: <IconCheck size={18} />,
        iconColor: 'teal',
      });
    },
  });

  const register = (props: RegisterApiProps) => mutate(props);

  return {
    register,
    isLoading,
  };
};
