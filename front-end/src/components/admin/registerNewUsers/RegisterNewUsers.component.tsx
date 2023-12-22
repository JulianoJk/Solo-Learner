import React from 'react';
import { Card, Center } from '@mantine/core';
import AuthenticationRegisterForm from '../../Auth/Login/AuthenticationRegisterForm';

interface IRegisterNewUserProps {
  refetchUserList: () => void;
}

const RegisterNewUser: React.FC<IRegisterNewUserProps> = ({
  refetchUserList,
}) => {
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
        />
      </Card>
    </Center>
  );
};

export default RegisterNewUser;
