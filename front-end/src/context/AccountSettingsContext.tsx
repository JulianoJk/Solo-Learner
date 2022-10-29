import React, { useContext, useReducer } from "react";
import {
    usersDispatchContext,
    IChildrenProvider,
    AccountSettingsInterface,
    TUserAction,
} from "../Model/models";

// Default state fot the user context
const defaultState: AccountSettingsInterface = {
    userSettings: {
        profileImage: ""
    }
};

const AccountSettingsStateContext = React.createContext<AccountSettingsInterface | undefined>(
    undefined
);
AccountSettingsStateContext.displayName = "AccountSettingsStateContext";
const AccountSettingsDispatchContext = React.createContext<
    usersDispatchContext | undefined
>(undefined);

// Reducer function
const appReducer = (state: AccountSettingsInterface, action: TUserAction) => {
    switch (action.type) {

        case "SET_PROFILE_IMAGE":

            localStorage.setItem("user_settings", JSON.stringify(action.userSettings));

            return { ...state, userSettings: action.profileImage };
        case "RESET_STATE":
            // Clear user from localStorage
            localStorage.clear();
            return { ...defaultState };
        default:
            return { ...state };
    }
};
// Context Provider for the user
const AccountSettingsContextProvider = ({ children }: IChildrenProvider) => {
    const [userState, userDispatch] = useReducer(appReducer, defaultState);

    return (
        <AccountSettingsStateContext.Provider value={userState}>
            <AccountSettingsDispatchContext.Provider value={userDispatch}>
                {children}
            </AccountSettingsDispatchContext.Provider>
        </AccountSettingsStateContext.Provider>
    );
};
// Pass the state of the user
const useAccountSettingsState = (): AccountSettingsInterface => {
    const context = useContext(AccountSettingsStateContext);
    if (context === undefined) {
        throw new Error("useUserState must be used within AccountSettingsStateContext");
    }
    return context;
};

// Function to use the userDispatch
const useAccountSettingsDispatch = (): usersDispatchContext => {
    const context = useContext(AccountSettingsDispatchContext);
    if (context === undefined) {
        throw new Error("useUserDispatch must be used within AccountSettingsDispatchContext");
    }
    return context;
};

export { AccountSettingsContextProvider, useAccountSettingsState, useAccountSettingsDispatch };
