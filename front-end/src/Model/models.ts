export interface IUserInfoContext {
  message?: string;
  username?: string;
  token: string | undefined;
  id: string | undefined;
  dateJoined?: Date | string;
}
export interface IUserAccountContext {
  profileImage: string;
}
export interface StateInterface {
  user: IUserInfoContext;
}
export interface AccountSettingsInterface {
  profileImage: string;
}
// Reset everything
interface ResetAction {
  type: 'RESET_STATE';
}
// Type for the action for the context
export type TUserAction =
  | {
      type: 'SET_USER';
      user: IUserInfoContext;
    }
  | {
      profileImage: string;
      type: 'SET_PROFILE_IMAGE';
    }
  | ResetAction;

// Type for the dispatch reducer user
export type usersDispatchContext = (action: TUserAction) => void;

// An enum with all the types of actions to use in the registration useReduce
export enum EActionTypes {
  SET_EMAIL = 'SET_EMAIL',
  SET_NAME = 'SET_NAME',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_CONFIRM_PASSWORD = 'SET_CONFIRM_PASSWORD',
}
// Interface the the registration
export interface IAuthCredentials {
  type?: EActionTypes;
  email?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  passwordRepeat?: string | undefined;
}
// Interface for the ContextProvider children
export interface IChildrenProvider {
  children: React.ReactNode;
}

export interface ISvgImages {
  width?: number | string;
  height?: number | string;
  className?: string;
  radius?: number | string;
}
