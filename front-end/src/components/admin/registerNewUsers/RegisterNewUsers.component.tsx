import React from 'react';

import AuthenticationRegister from '../../Auth/Register/AuthenticationRegister.component';
import useStyles from './AdminAddUser.styles';

interface IRegisterNewUserProps {
  refetchUserList: () => void;
}

const RegisterNewUser: React.FC<IRegisterNewUserProps> = ({
  refetchUserList,
}) => {
  const { classes } = useStyles();
  return (
    <AuthenticationRegister
      rootClassName={classes.root}
      adminRefetchUserList={refetchUserList}
      registerTitle={'Register new users'}
      switchToLogin={false}
      displaySocialButtons={false}
      showNotification={true}
      isAdminRegister={true}
    />
  );
};

export default RegisterNewUser;
