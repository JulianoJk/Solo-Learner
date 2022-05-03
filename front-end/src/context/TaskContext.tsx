import React, { useContext, useReducer } from 'react'
import { dispatchContext, StateInterface, TAction} from '../Model/models'

// Default state fot the user context
const defaultState: StateInterface= {
    user:{
        username: undefined,
        token: undefined,
        id: undefined
    },
    isLoggedIn: false
}
// Reducer function 
const appReducer = (state: StateInterface, action: TAction) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.user};
		case 'SET_IS_LOGGED_IN':
			return { ...state, isLoggedIn: action.isLoggedIn };
      case 'RESET_STATE':
        return { ...defaultState };
      default:
        return { ...state };
	}
};

const TaskStateContext = React.createContext<StateInterface | undefined>(undefined);
TaskStateContext.displayName = 'TaskStateContext';
const TaskDispatchContext = React.createContext<dispatchContext | undefined>(undefined);

// TODO!: Replace props type
const TaskContextProvider = (props: any) => {
	const [state, dispatch] = useReducer(appReducer, defaultState);

	return (
		<TaskStateContext.Provider value={state}>
			<TaskDispatchContext.Provider value={dispatch}>{props.children}</TaskDispatchContext.Provider>
		</TaskStateContext.Provider>
	);
};

// Pass the state of the user 
const useTaskState = () => {
	const context = useContext(TaskStateContext);
	if (context === undefined) {
		throw new Error('useTaskState must be used within TaskContextProvider');
	}
	return context;
};

// Function to use the dispatch
const useTaskDispatch = () => {
	const context = useContext(TaskDispatchContext);
	if (context === undefined) {
		throw new Error('useTaskDispatch must be used within TaskContextProvider');
	}
	return context;
};

export { TaskContextProvider, useTaskState, useTaskDispatch };