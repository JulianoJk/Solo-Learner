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
  const useUserDispatch = props;
  window.onload = () => {
    const userInfo = localStorage.getItem("user");
    if (userInfo !== null) {
      const userInfos = JSON.parse(userInfo);

      props({ type: "SET_USER", user: userInfos });
    }
  };
};
