import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Button, Center, Modal, Title } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkIfPageIsReload, isUserLoggedIn } from '../../lib/dist';
import Login from '../Auth/Login/Login';
import { useDisclosure } from '@mantine/hooks';
import { useUserDispatch } from '../../context/UserContext';
import { IUserInfoContext } from '../../Model/UserModels';
import { AppDispatch, AppState } from '../../context/AppContext';
const TokenExpirationChecker = () => {
  const { isSessionExpired } = AppState();
  const appDispatch = AppDispatch();
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
        };
        userDispatch({ type: 'SET_USER', user: decodedUser });
      }
    }
  }, [checkIfPageIsReload, pathname]);

  const logOut = () => {
    userDispatch({ type: 'RESET_STATE' });
    navigate('/');
  };

  if (isSessionExpired) {
    return (
      <Modal
        transition="fade"
        centered
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={openedModal}
        onClose={() => {
          return;
        }}
        overlayBlur={4}
        withCloseButton={false}
      >
        <Center>
          <Title size="md">
            Session expired. Please log in again to continue!
          </Title>
        </Center>

        <Login
          switchToRegister={false}
          pathToNavigateAfterLogin={pathname}
          refreshPageAfterLogin={true}
        />
        <Button onClick={logOut}>Logout</Button>
      </Modal>
    );
  }

  return null;
};

export default TokenExpirationChecker;
