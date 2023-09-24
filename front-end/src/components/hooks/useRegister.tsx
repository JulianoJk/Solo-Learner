import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../context/AppContext';
import { useUserDispatch } from '../../context/UserContext';
import { registerAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { isUndefinedOrNullString } from '../../utils/utils';
import { IApiError, IUserInfoContext } from '../../Model/UserModels';
import { notificationAlert } from '../notifications/NotificationAlert';
import { IconCheck } from '@tabler/icons-react';

interface RegisterApiProps {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
interface IRegisterMutationState {
  register: (props: RegisterApiProps) => void;
  isLoading: boolean;
}

export const useRegister = (): IRegisterMutationState => {
  const appDispatch = useAppDispatch();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(registerAPI, {
    onSuccess: (data: IUserInfoContext | IApiError) => {
      if (typeof data === 'object' && 'error' in data) {
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
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
          navigate('/home');
          notificationAlert({
            title: 'Successful registration!',
            message: 'Congratulations! Your account has been created. ',
            icon: <IconCheck size={18} />,
            iconColor: 'teal',
          });
        }
      }
    },
  });

  const register = ({
    email,
    username,
    password,
    confirmPassword,
  }: RegisterApiProps) => {
    mutate({ email, username, password, confirmPassword });
  };

  return {
    register,
    isLoading,
  };
};
