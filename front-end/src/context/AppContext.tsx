import React, { useContext, useReducer } from 'react';
import { User } from '../Model/UserModels';
import { IChildrenProvider } from '../Model/models';
// import { ColorScheme } from '@mantine/core';
interface IAppStateContext {
  isSmallWindow: boolean;
  appTheme: any;
  errorAlertMessage: string;
  isUserSettingsOpen: boolean;
  isSessionExpired: boolean;
  saveButtonClicked: boolean;
  userReLoggedIn: boolean;
  selectedAdminNavbar?: string;
  googleClientIsLoading?: boolean;
  isAuthLoading?: boolean;
  adminMobileModalOpen?: boolean;
  isAdminDeleteModalOpen?: boolean;
  usersToDelete: User[]; // Use the user type here
}

// Default state fot the Application context
const defaultState: IAppStateContext = {
  isSmallWindow: false,
  appTheme: 'light',
  errorAlertMessage: '',
  isUserSettingsOpen: false,
  isSessionExpired: false,
  saveButtonClicked: false,
  userReLoggedIn: false,
  selectedAdminNavbar: 'userManagment',
  googleClientIsLoading: false,
  isAuthLoading: false,
  adminMobileModalOpen: false,
  isAdminDeleteModalOpen: false,
  usersToDelete: [],
};
type TApplicationAction =
  | {
      type: 'IS_SMALL_WINDOW';
      isSmallWindow: boolean;
    }
  | {
      type: 'SET_APP_THEME';
      appTheme: any;
    }
  | {
      type: 'SET_ERROR_ALERT_MESSAGE';
      errorAlertMessage: string;
    }
  | {
      type: 'SET_SESSION_TOKEN_EXPIRED';
      isSessionExpired: boolean;
    }
  | {
      type: 'SETTINGS_SAVE_BUTTON_CLICKED';
      saveButtonClicked: boolean;
    }
  | {
      type: 'SET_USER_LOGGED_IN_AGAIN';
      userReLoggedIn: boolean;
    }
  | {
      type: 'SET_ACTIVE_ADMIN_NAV';
      selectedAdminNavbar: string;
    }
  | {
      type: 'SET_GOOGLE_CLIENT_ID_IS_LOADING';
      googleClientIsLoading: boolean;
    }
  | {
      type: 'SET_AUTH_IS_LOADING';
      isAuthLoading: boolean;
    }
  | {
      type: 'SET_ADMIN_MOBILE_MODAL_OPEN';
      adminMobileModalOpen: boolean;
    }
  | {
      type: 'SET_ADMIN_DELETE_MODAL_OPEN';
      isAdminDeleteModalOpen: boolean;
    }
  | {
      type: 'SET_USERS_TO_DELETE';
      users: User[];
    }
  | { type: 'CLEAR_USERS_TO_DELETE' }
  | {
      type: 'RESET_ERROR_MESSAGE';
    };

const ApplicationState = React.createContext<IAppStateContext | undefined>(
  undefined,
);
// *** Dispatch ***
type ApplicationDispatchContext = (action: TApplicationAction) => void;

ApplicationState.displayName = 'ApplicationState';
const ApplicationDispatch = React.createContext<
  ApplicationDispatchContext | undefined
>(undefined);

// Reducer function
const appReducer = (state: IAppStateContext, action: TApplicationAction) => {
  switch (action.type) {
    case 'IS_SMALL_WINDOW':
      return { ...state, isSmallWindow: !action.isSmallWindow };
    case 'SET_APP_THEME':
      return { ...state, appTheme: action.appTheme };
    case 'SET_ERROR_ALERT_MESSAGE':
      return { ...state, errorAlertMessage: action.errorAlertMessage };
    case 'SET_SESSION_TOKEN_EXPIRED':
      return { ...state, isSessionExpired: action.isSessionExpired };
    case 'SETTINGS_SAVE_BUTTON_CLICKED':
      return { ...state, saveButtonClicked: action.saveButtonClicked };
    case 'SET_USER_LOGGED_IN_AGAIN':
      return { ...state, userReLoggedIn: action.userReLoggedIn };
    case 'SET_ACTIVE_ADMIN_NAV':
      return { ...state, selectedAdminNavbar: action.selectedAdminNavbar };
    case 'SET_GOOGLE_CLIENT_ID_IS_LOADING':
      return { ...state, googleClientIsLoading: action.googleClientIsLoading };
    case 'SET_AUTH_IS_LOADING':
      return { ...state, isAuthLoading: action.isAuthLoading };
    case 'SET_ADMIN_MOBILE_MODAL_OPEN':
      return { ...state, adminMobileModalOpen: action.adminMobileModalOpen };
    case 'SET_USERS_TO_DELETE':
      return { ...state, usersToDelete: action.users };
    case 'CLEAR_USERS_TO_DELETE':
      return { ...state, usersToDelete: [] };
    case 'SET_ADMIN_DELETE_MODAL_OPEN':
      return {
        ...state,
        isAdminDeleteModalOpen: action.isAdminDeleteModalOpen,
      };
    case 'RESET_ERROR_MESSAGE':
      return { ...state, errorAlertMessage: '' };
  }
};
// Context Provider for the user
const AppContextProvider = ({ children }: IChildrenProvider) => {
  const [appState, appDispatch] = useReducer(appReducer, defaultState);

  return (
    <ApplicationState.Provider value={appState}>
      <ApplicationDispatch.Provider value={appDispatch}>
        {children}
      </ApplicationDispatch.Provider>
    </ApplicationState.Provider>
  );
};
// Pass the state of the user
const useAppState = (): IAppStateContext => {
  const context = useContext(ApplicationState);
  if (context === undefined) {
    throw new Error('AppState must be used within AppStateContext');
  }
  return context;
};

// Function to use the userDispatch
const useAppDispatch = (): ApplicationDispatchContext => {
  const context = useContext(ApplicationDispatch);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within AppDispatchContext');
  }
  return context;
};

export { AppContextProvider, useAppState, useAppDispatch };
