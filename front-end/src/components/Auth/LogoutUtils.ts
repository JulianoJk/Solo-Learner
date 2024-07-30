// logoutUtils.ts

import { useNavigate } from 'react-router-dom';

import { logoutAPI } from '../api/api';

export const logoutUser = async (
  userDispatch: any,
  navigate: ReturnType<typeof useNavigate>,
) => {
  const userLastVisitedPath = localStorage.getItem('lastVisitedPath');
  const userToken = localStorage.getItem('jwtToken');

  try {
    await logoutAPI(userToken as string, userLastVisitedPath);

    // Check if the component is still mounted before updating state
    userDispatch({ type: 'RESET_STATE' });
    navigate('/');
    console.log('Logout successful!');
  } catch (error: any) {
    console.error('Logout failed:', error.message);
  }
};
