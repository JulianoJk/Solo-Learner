import React, { useEffect, useState } from 'react';
import { useUserDispatch, useUserState } from '../../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { adminDashboardAPI, adminGetAllUsersAPI } from '../api/api';
import { Box } from '@mantine/core';
import NotFound from '../Pages/Error/pageNotFound/NotFound.component';
import { StudentmanagmentTable } from './userManagment/studentManagment/StudentmanagmenTable';
import { AdminNavBar } from '../navBar/AdminNavBar.component';
import UsersTable from './userManagment/AdminDashBoard';
import RegisterNewUser from './registerNewUsers/RegisterNewUsers.component';
import { AppState } from '../../context/AppContext';
import {
  LastActiveFormat,
  formatLastActive,
} from '../../utils/formattedLastActive';

const Admin = () => {
  const { user } = useUserState();
  const { selectedAdminNavbar } = AppState();
  const userDispatch = useUserDispatch();

  const [isAllUsersSuccess, setIsAllUsersSuccess] = useState(false);

  const { data: adminDashboardData, isLoading: isAdminLoading } = useQuery(
    ['getAdminDashboardItems', user.token],
    async () => {
      if (!user.token) throw new Error('No token found');
      const data = await adminDashboardAPI(user.token);
      if (data?.status === 'success') {
        setIsAllUsersSuccess(true);
      } else {
        setIsAllUsersSuccess(false);
      }
      return data;
    },
    { enabled: !!user.token },
  );

  const { refetch: refetchAllUsers } = useQuery(
    ['adminGetAllUsersAPI', user.token],
    async () => {
      if (!user.token) throw new Error('No token found');
      const data = await adminGetAllUsersAPI(user.token);
      if (data?.status === 'success') {
        userDispatch({ type: 'REMOVE_ALL_ADMIN_DASHBOARD_USERS' });
        userDispatch({
          type: 'SET_ALL_ADMIN_DASHBOARD_USERS',
          allUsersAdminDashboard: formatLastActive(
            data.users,
            LastActiveFormat.CUSTOM,
          ),
        });
        setIsAllUsersSuccess(true);
      } else {
        setIsAllUsersSuccess(false);
      }
      return data;
    },
    { enabled: !!user.token },
  );

  useEffect(() => {
    userDispatch({
      type: 'SET_ALL_USERS_ADMIN_DASHBOARD_LOADING',
      isAllUsersAdminDashboardLoading: isAdminLoading,
    });
  }, [isAdminLoading]);

  if (!user.token) return <NotFound navigationPath={'/'} />;

  if (isAdminLoading || adminDashboardData?.isError || !isAllUsersSuccess) {
    return <NotFound navigationPath={'/home'} />;
  }

  const renderComponentToDisplay = () => {
    switch (selectedAdminNavbar) {
      case 'userManagment':
        return <UsersTable />;
      case 'billing':
        return <StudentmanagmentTable />;
      case 'register_new_user':
        return <RegisterNewUser refetchUserList={refetchAllUsers} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <AdminNavBar />
      {renderComponentToDisplay()}
    </Box>
  );
};

export default Admin;
