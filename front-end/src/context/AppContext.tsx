import React, {useContext, useReducer} from 'react'
import {IChildrenProvider} from '../Model/models'
import {ColorScheme} from '@mantine/core'
interface IAppStateContext {
  isSmallWindow: boolean
  appTheme: ColorScheme
  errorAlertMessage: string
}

// Default state fot the Application context
const defaultState: IAppStateContext = {
  isSmallWindow: false,
  appTheme: 'light' ?? 'dark',
  errorAlertMessage: '',
}
type TApplicationAction =
  | {
      type: 'IS_SMALL_WINDOW'
      isSmallWindow: boolean
    }
  | {
      type: 'SET_APP_THEME'
      appTheme: ColorScheme
    }
  | {
      type: 'SET_ERROR_ALERT_MESSAGE'
      errorAlertMessage: string
    }

const ApplicationState = React.createContext<IAppStateContext | undefined>(
  undefined,
)
// *** Dispatch ***
type ApplicationDispatchContext = (action: TApplicationAction) => void

ApplicationState.displayName = 'ApplicationState'
const ApplicationDispatch = React.createContext<
  ApplicationDispatchContext | undefined
>(undefined)

// Reducer function
const appReducer = (state: IAppStateContext, action: TApplicationAction) => {
  switch (action.type) {
    case 'IS_SMALL_WINDOW':
      return {...state, isSmallWindow: !action.isSmallWindow}
    case 'SET_APP_THEME':
      return {...state, appTheme: action.appTheme}
    case 'SET_ERROR_ALERT_MESSAGE':
      return {...state, errorAlertMessage: action.errorAlertMessage}
  }
}
// Context Provider for the user
const AppContextProvider = ({children}: IChildrenProvider) => {
  const [appState, appDispatch] = useReducer(appReducer, defaultState)

  return (
    <ApplicationState.Provider value={appState}>
      <ApplicationDispatch.Provider value={appDispatch}>
        {children}
      </ApplicationDispatch.Provider>
    </ApplicationState.Provider>
  )
}
// Pass the state of the user
const AppState = (): IAppStateContext => {
  const context = useContext(ApplicationState)
  if (context === undefined) {
    throw new Error('AppState must be used within AppStateContext')
  }
  return context
}

// Function to use the userDispatch
const AppDispatch = (): ApplicationDispatchContext => {
  const context = useContext(ApplicationDispatch)
  if (context === undefined) {
    throw new Error('AppDispatch must be used within AppDispatchContext')
  }
  return context
}

export {AppContextProvider, AppState, AppDispatch}
