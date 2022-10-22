import {
  IUserInfoContext,
  TUserAction,
  usersDispatchContext,
} from "../Model/models";

export const isUndefinedOrNullString = (object: string | undefined | null) => {
  return object === undefined || object === null || object.trim() === ""
    ? true
    : false;
};
export const checkIfUserReloads = (props: usersDispatchContext) => {
  window.onload = () => {
    const userInfo = localStorage.getItem("user");
    if (userInfo !== null) {
      const userInfos = JSON.parse(userInfo);

      props({ type: "SET_USER", user: userInfos });
    }
  };
};
export const isUserLoggedIn = () => {
  const userInfo = localStorage.getItem("user");
  return !isUndefinedOrNullString(userInfo);
};

export const isUndefinedOrNullArray = <T>(object: T[] | undefined | null) => {
  return object === undefined || object === null || object.length === 0
    ? true
    : false;
};
// export const RandomColorGenerator = () => {
//   let arrayColors: string[] = [];
//   for (let i = 0; i < 5; i++) {
//     var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//     arrayColors.push(randomColor);
//   }
//   return arrayColors;
// };
