import {
  AccountSettingsInterface,
  IUserInfoContext,
  TUserAction,
  usersDispatchContext,
} from '../Model/models';

export const isUndefinedOrNullString = (object: string | undefined | null) => {
  return object === undefined || object === null || object.trim() === ''
    ? true
    : false;
};
export const saveUserAfterReload = (props: usersDispatchContext) => {
  window.onload = () => {
    const userInfo = localStorage.getItem('user');
    if (userInfo !== null) {
      const userInfos = JSON.parse(userInfo);

      props({ type: 'SET_USER', user: userInfos });
    }
  };
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
  const userInfo = localStorage.getItem('user');
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
// export const RandomColorGenerator = () => {
//   let arrayColors: string[] = [];
//   for (let i = 0; i < 5; i++) {
//     var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//     arrayColors.push(randomColor);
//   }
//   return arrayColors;
// };
