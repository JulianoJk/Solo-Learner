import React, { useContext, useReducer } from 'react';
import {
  usersDispatchContext,
  IChildrenProvider,
  StateInterface,
  TUserAction,
} from '../Model/UserModels';

// Default state fot the user context
const defaultState: StateInterface = {
  user: {
    username: undefined,
    token: '',
    id: undefined,
    email: undefined,
  },
};

const UserStateContext = React.createContext<StateInterface | undefined>(
  undefined,
);
UserStateContext.displayName = 'UserStateContext';
const UserDispatchContext = React.createContext<
  usersDispatchContext | undefined
>(undefined);

// Reducer function
const appReducer = (state: StateInterface, action: TUserAction) => {
  switch (action.type) {
    case 'SET_USER':
      // Clear any previous data
      localStorage.removeItem('jwtToken');
      // Save user to localStorage to persist keeping logged after refreshing the page
      localStorage.setItem('jwtToken', action.user.token);
      return { ...state, user: action.user };
    case 'RESET_STATE':
      // Clear user from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('jwtToken');
      return { ...defaultState };
    default:
      return { ...state };
  }
};
// Context Provider for the user
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
// Pass the state of the user
const useUserState = (): StateInterface => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within UserDispatchContext');
  }
  return context;
};

// Function to use the userDispatch
const useUserDispatch = (): usersDispatchContext => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within UserDispatchContext');
  }
  return context;
};

export { UserContextProvider, useUserState, useUserDispatch };
