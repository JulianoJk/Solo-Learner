import React from 'react';

// *** State ***
export interface AccountSettingsInterface {
  profileImage: string;
}

export interface IAppStateContext {
  isSmallWindow: boolean;
  appTheme: any;
  handleModal: boolean;
}

export type TApplicationAction =
  | {
      type: 'SET_MODAL_STATE';
      handleModal: boolean;
    }
  | {
      type: 'IS_SMALL_WINDOW';
      isSmallWindow: boolean;
    }
  | {
      type: 'SET_APP_THEME';
      appTheme: any;
    };

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
