/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultMantineColor } from '@mantine/core';
import { usersDispatchContext } from '../Model/UserModels';
import jwtDecode from 'jwt-decode';

export const isUndefinedOrNullString = (object: string | undefined | null) => {
  return object === undefined || object === null || object.trim() === ''
    ? true
    : false;
};

export const checkIfPageIsReload = () => {
  if (document.cookie.indexOf('mycookie') == -1) {
    // cookie doesn't exist, create it now
    document.cookie = 'mycookie=1';
  } else {
    return true;
  }
};

export const saveProfileImageAfterReload = (props: usersDispatchContext) => {
  window.onload = () => {
    const profileImage = localStorage.getItem('profile_image');
    if (profileImage !== null) {
      const profile_image = JSON.parse(profileImage);

      props({ type: 'SET_PROFILE_IMAGE', profileImage: profile_image });
    }
  };
};
export const isUserLoggedIn = () => {
  const userInfo = localStorage.getItem('jwtToken');
  return !isUndefinedOrNullString(userInfo);
};

export const isArrayUndefinedOrNull = <T>(object: T[] | undefined | null) => {
  return object === undefined || object === null || object.length === 0
    ? true
    : false;
};
export const capitalString = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const b64DecodeUnicode = (str: string) =>
  decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2),
      )
      .join(''),
  );

export const parseJwt = (token: string) =>
  JSON.parse(
    b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/')),
  );
export const getRandomColor = (): DefaultMantineColor => {
  const colors: DefaultMantineColor[] = [
    'dark',
    'gray',
    'red',
    'pink',
    'grape',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'green',
    'lime',
    'yellow',
    'orange',
    'teal',
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const checkTokenValidity = (token: string | null): boolean => {
  if (!token) {
    // If token is falsy (null or undefined)
    return false;
  }
  try {
    const decoded: any = jwtDecode(token);
    const isExpired = decoded.exp < Date.now() / 1000;
    return isExpired;
  } catch (error) {
    return false;
  }
};
