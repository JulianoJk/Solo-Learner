import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  checkIfPageIsReload,
  checkTokenValidity,
  isUndefinedOrNullString,
  isUserLoggedIn,
} from '../../utils/utils';
import { useUserDispatch } from '../../context/UserContext';
import { IUserInfoContext } from '../../Model/UserModels';
import { useAppDispatch } from '../../context/AppContext';

import { logoutUser } from '../Auth/LogoutUtils';
// import useLogout from '../hooks/useLogout';

const TokenExpirationChecker = () => {
  const appDispatch = useAppDispatch();
  const { pathname } = useLocation(); // <-- get current location being accessed
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const userPicture = localStorage.getItem('userPicture');
    if (token) {
      const decoded: any = jwtDecode(token);

      const isExpired = decoded.exp < Date.now() / 1000;
      // set the last visited path in local storage
      localStorage.setItem('lastVisitedPath', location.pathname);

      if (isUserLoggedIn() === true && isExpired) {
        logoutUser(userDispatch, navigate);
      }
    }

    if (checkIfPageIsReload()) {
      const localStorageToken = localStorage.getItem('jwtToken');
      const decoded: IUserInfoContext = jwtDecode(localStorageToken as string);

      if (localStorageToken !== null) {
        const decodedUser: IUserInfoContext = {
          id: decoded.id,
          username: decoded.username || decoded.name,
          token: localStorageToken,
          isTeacher: decoded.isTeacher,
          email: decoded.email,
          isAdmin: decoded.isAdmin,
        };
        userDispatch({ type: 'SET_USER', user: decodedUser });
        userDispatch({ type: 'SET_USER_PICTURE', picture: userPicture ?? '' });
      }
    }
    const userToken = isUndefinedOrNullString(token) ? token : true;

    const isTokenExpired = userToken
      ? checkTokenValidity(userToken as string)
      : false;

    const checkToken = () => {
      if (token) {
        localStorage.setItem('lastVisitedPath', location.pathname);

        if (isUserLoggedIn() && isTokenExpired) {
          handleExpiredSession();
        }
      }
    };

    const handleExpiredSession = () => {
      appDispatch({
        type: 'SET_SESSION_TOKEN_EXPIRED',
        isSessionExpired: true,
      });
    };

    checkToken();
  }, [checkIfPageIsReload, pathname]);
  return null;
};
export default TokenExpirationChecker;
