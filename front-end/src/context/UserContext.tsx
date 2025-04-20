import React, { useContext, useReducer } from 'react';
import {
  usersDispatchContext,
  IChildrenProvider,
  UserContextState,
  TUserAction,
  IUserInfoContext,
} from '../Model/UserModels';

// Default state for the user context
const defaultState: UserContextState = {
  user: {
    id: undefined,
    username: undefined,
    email: undefined,
    token: '',
    isAdmin: false,
    isTeacher: false,
    isStudent: false,
    students: [],
    teachers: [],
    lastActive: '',
    lastActiveDate: '',
    lastActiveTime: '',
    formattedLastActive: '',
  } as IUserInfoContext, // user slice follows a separate structure
  status: '',
  picture: '',
  allUsersAdminDashboard: [],
  isAllUsersAdminDashboardLoading: false,
};

const UserStateContext = React.createContext<UserContextState | undefined>(
  undefined,
);
UserStateContext.displayName = 'UserStateContext';

const UserDispatchContext = React.createContext<
  usersDispatchContext | undefined
>(undefined);

const appReducer = (
  state: UserContextState,
  action: TUserAction,
): UserContextState => {
  switch (action.type) {
    case 'SET_USER':
      localStorage.removeItem('jwtToken');
      localStorage.setItem('jwtToken', action.user.token);
      return { ...state, user: action.user };

    case 'SET_USER_PICTURE':
      localStorage.removeItem('userPicture');
      localStorage.setItem('userPicture', action.picture);
      return { ...state, picture: action.picture };

    case 'SET_ALL_ADMIN_DASHBOARD_USERS':
      return {
        ...state,
        allUsersAdminDashboard: action.allUsersAdminDashboard,
      };

    case 'REMOVE_ALL_ADMIN_DASHBOARD_USERS':
      return { ...state, allUsersAdminDashboard: [] };

    case 'SET_ALL_USERS_ADMIN_DASHBOARD_LOADING':
      return {
        ...state,
        isAllUsersAdminDashboardLoading: action.isAllUsersAdminDashboardLoading,
      };

    case 'RESET_STATE':
      localStorage.removeItem('user');
      localStorage.removeItem('jwtToken');
      return { ...defaultState };

    default:
      return state;
  }
};

const UserContextProvider = ({ children }: IChildrenProvider) => {
  const [userState, userDispatch] = useReducer(appReducer, defaultState);

  return (
    <UserStateContext.Provider value={userState}>
      <UserDispatchContext.Provider value={userDispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

const useUserState = (): UserContextState => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within UserContextProvider');
  }
  return context;
};

const useUserDispatch = (): usersDispatchContext => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within UserContextProvider');
  }
  return context;
};

export { UserContextProvider, useUserState, useUserDispatch };
