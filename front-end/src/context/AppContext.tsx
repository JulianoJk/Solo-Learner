import React, { useContext, useReducer } from "react";
import {
  ApplicationDispatchContext,
  IAppStateContext,
  IChildrenProvider,
  TApplicationAction,
} from "../Model/models";

// Default state fot the Application context
const defaultState: IAppStateContext = {
  isSmallWindow: false,
  appTheme: "light" ?? "dark",
};

const ApplicationState = React.createContext<IAppStateContext | undefined>(
  undefined
);
ApplicationState.displayName = "ApplicationState";
const ApplicationDispatch = React.createContext<
  ApplicationDispatchContext | undefined
>(undefined);

// Reducer function
const appReducer = (state: IAppStateContext, action: TApplicationAction) => {
  switch (action.type) {
    case "IS_SMALL_WINDOW":
      return { ...state, isSmallWindow: !action.isSmallWindow };
    case "SET_APP_THEME":
      return { ...state, appTheme: action.appTheme };
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
const AppState = (): IAppStateContext => {
  const context = useContext(ApplicationState);
  if (context === undefined) {
    throw new Error("AppState must be used within AppStateContext");
  }
  return context;
};

// Function to use the userDispatch
const AppDispatch = (): ApplicationDispatchContext => {
  const context = useContext(ApplicationDispatch);
  if (context === undefined) {
    throw new Error("AppDispatch must be used within AppDispatchContext");
  }
  return context;
};

export { AppContextProvider, AppState, AppDispatch };
