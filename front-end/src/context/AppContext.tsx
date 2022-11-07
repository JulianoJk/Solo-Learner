import React, { useContext, useReducer } from 'react';
import {
  ApplicationDispatchContext,
  IChildrenProvider,
  ApplicationInterface,
  TApplicationAction,
} from '../Model/models';

// Default state fot the Application context
const defaultState = {
  isSmallWindow: false,
};

const ApplicationState = React.createContext<ApplicationInterface | undefined>(
  undefined
);
ApplicationState.displayName = 'ApplicationState';
const ApplicationDispatch = React.createContext<
  ApplicationDispatchContext | undefined
>(undefined);

// Reducer function
const appReducer = (
  state: ApplicationInterface,
  action: TApplicationAction
) => {
  switch (action.type) {
    case 'IS_SMALL_WINDOW':

      return { ...state, isSmallWindow: !action.isSmallWindow };
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
const AppState = (): ApplicationInterface => {
  const context = useContext(ApplicationState);
  if (context === undefined) {
    throw new Error('AppState must be used within AppStateContext');
  }
  return context;
};

// Function to use the userDispatch
const AppDispatch = (): ApplicationDispatchContext => {
  const context = useContext(ApplicationDispatch);
  if (context === undefined) {
    throw new Error('AppDispatch must be used within AppDispatchContext');
  }
  return context;
};

export { AppContextProvider, AppState, AppDispatch };
