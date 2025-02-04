import React from 'react';
// *** State ***
export interface IUserInfoContext {
  message?: string;
  name?: string;
  username?: string;
  token: string;
  id?: string;
  createdAt?: Date | string;
  isTeacher?: boolean;
  email?: string;
  isAdmin?: any;
  picture?: string;
  navigateUser?: string;
}

export interface IApiMessageResponse {
  message: string;
}

export interface IApiError {
  error: {
    message: string;
  };
}
export interface IUserAccountContext {
  profileImage: string;
}
export interface UserContextState {
  user: IUserInfoContext;
  status: string;
  picture?: string;
  allUsersAdminDashboard: User[];
  isAllUsersAdminDashboardLoading: boolean;
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
  | {
      picture: string;
      type: 'SET_USER_PICTURE';
    }
  | {
      type: 'SET_ALL_ADMIN_DASHBOARD_USERS';
      allUsersAdminDashboard: User[];
    }
  | {
      type: 'SET_ALL_USERS_ADMIN_DASHBOARD_LOADING';
      isAllUsersAdminDashboardLoading: boolean;
    }
  | {
      type: 'REMOVE_ALL_ADMIN_DASHBOARD_USERS';
    }
  | ResetAction;
// Reset everything
interface ResetAction {
  type: 'RESET_STATE';
}

// Interface for the ContextProvider children
export interface IChildrenProvider {
  children: React.ReactNode;
}

// *** Dispatch ***

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
export interface User {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
  password: null;
  isTeacher: boolean;
  createdAt: string;
  updatedAt: string;
  picture?: string;
  lastActive: string;
  lastActiveDate?: string;
  lastActiveTime?: string;
  formattedLastActive?: string;
  isUserLoggedIn?: boolean;
}
export interface fetchUserList {
  status: string;
  data: User;
}
export interface GetUsersListResponse {
  status: string;
  users: User[];
}
