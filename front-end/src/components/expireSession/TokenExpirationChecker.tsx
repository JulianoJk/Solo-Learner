import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Button, Center, Modal, Title, Text } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkIfPageIsReload, isUserLoggedIn } from '../../lib/dist';
// import Login from '../Auth/Login/Login';
import { useDisclosure } from '@mantine/hooks';
import { useUserDispatch } from '../../context/UserContext';
import { IUserInfoContext } from '../../Model/UserModels';
import { useAppDispatch, AppState } from '../../context/AppContext';
import AuthenticationLoginForm from '../Auth/Login/AuthenticationLoginForm';

const TokenExpirationChecker = () => {
  const { isSessionExpired, userReLoggedIn } = AppState();
  const appDispatch = useAppDispatch();
  const [openedModal, handlers] = useDisclosure(false);
  const { pathname } = useLocation(); // <-- get current location being accessed
  const userDispatch = useUserDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded: any = jwtDecode(token);

      const isExpired = decoded.exp < Date.now() / 1000;

      if (isUserLoggedIn() === true && isExpired) {
        appDispatch({
          type: 'SET_SESSION_TOKEN_EXPIRED',
          isSessionExpired: true,
        });
        handlers.open();
      } else if (isUserLoggedIn() === true && !isExpired) {
        handlers.close();
      }
    }

    if (checkIfPageIsReload()) {
      const localStorageToken = localStorage.getItem('jwtToken');
      const decoded: IUserInfoContext = jwtDecode(localStorageToken as string);

      if (localStorageToken !== null) {
        const decodedUser: IUserInfoContext = {
          id: decoded.id,
          username: decoded.username,
          token: localStorageToken,
          isTeacher: decoded.isTeacher,
          email: decoded.email,
          isAdmin: decoded.isAdmin,
        };
        userDispatch({ type: 'SET_USER', user: decodedUser });
      }
    }
  }, [checkIfPageIsReload, pathname]);

  const logOut = () => {
    userDispatch({ type: 'RESET_STATE' });
    navigate('/');
  };

  if (isSessionExpired && userReLoggedIn === false) {
    return (
      <Modal
        transitionProps={{
          transition: 'fade',
          duration: 100,
          timingFunction: 'ease',
        }}
        overlayProps={{
          opacity: 0.55,
          blur: 10,
        }}
        centered
        opened={openedModal}
        onClose={() => {
          return;
        }}
        withCloseButton={false}
      >
        <Center>
          <Title size="md"></Title>
        </Center>

        <AuthenticationLoginForm
          switchToRegister={false}
          pathToNavigateAfterLogin={pathname}
          refreshPageAfterLogin={true}
          sessionExpiredAuth={true}
          loginTitle={
            <Text size="lg" weight={650} ta="center">
              Session expired.
              <br />
              Please log in again to continue!
            </Text>
          }
          children={
            <Button onClick={logOut} color="red">
              Logout
            </Button>
          }
        />
      </Modal>
    );
  }

  return null;
};

export default TokenExpirationChecker;
