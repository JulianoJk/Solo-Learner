import { Card, Center } from '@mantine/core';
import AuthenticationRegisterForm from '../../Auth/Login/AuthenticationRegisterForm';
import React from 'react';
interface IRegisterNewUserProps {
  refetchUserList: () => void;
}
const RegisterNewUser: React.FC<IRegisterNewUserProps> = (props) => {
  const { refetchUserList } = props;
  return (
    <Center>
      <Card sx={{ width: 1100, border: '1px solid black' }}>
        <AuthenticationRegisterForm
          adminRefetchUserList={refetchUserList}
          registerTitle={'Register new users'}
          switchToLogin={false}
          displaySocialButtons={false}
          showNotification={true}
          isAdminRegister={true}
        ></AuthenticationRegisterForm>
      </Card>
    </Center>
  );
};
export default RegisterNewUser;
