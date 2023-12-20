import React, { useState } from 'react';
import { useUserState } from '../../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { adminDashboardAPI, adminGetAllUsersAPI } from '../api/api';
// import { NavBar } from '../navBar/NavBar.component';
import { Box, Loader, Stack, Title, useMantineTheme } from '@mantine/core';
import NotFound from '../Pages/Error/pageNotFound/NotFound.component';

import { StudentmanagmentTable } from './userManagment/studentManagment/StudentmanagmenTable';
import { User } from '../../Model/UserModels';
import { AdminNavBar } from '../navBar/AdminNavBar.component';
import { AppState } from '../../context/AppContext';
import UsersTable from './userManagment/AdminDashBoard';
import {
  LastActiveFormat,
  formatLastActive,
} from '../../utils/formattedLastActive';
import RegisterNewUser from './registerNewUsers/RegisterNewUsers.component';

const Admin = () => {
  const { user } = useUserState();
  const { selectedAdminNavbar } = AppState();
  const [isDashBoardSuccess, setIsDashBoardSuccess] = useState(false);
  const [isAllUsersSuccess, setIsAllUsersSuccess] = useState(false);
  const [allUsersList, setAllUsersList] = useState<User[]>([]);
  const theme = useMantineTheme();
  const { isLoading: isAdminDashBoardLoading, isError: isAdminDashBoardError } =
    useQuery(
      ['getAdminDashboardItems', user.token],
      async () => {
        if (user.token) {
          const data = await adminDashboardAPI(user.token);
          return data;
        }
        throw new Error('No token found');
      },
      {
        enabled: !!user.token,
        onSuccess: (data) => {
          if (data?.status === 'success') {
            setIsDashBoardSuccess(true);
          } else {
            setIsDashBoardSuccess(false);
          }
        },
        onError: () => {
          setIsDashBoardSuccess(false);
        },
      },
    );
  const {
    isLoading: isAdminGetAllUsersLoading,
    isError: isAdminGetAllUsersError,
    refetch: refetchAllUsersForDashboard,
  } = useQuery(
    ['adminGetAllUsersAPI', user.token],
    async () => {
      if (user.token) {
        const data = await adminGetAllUsersAPI(user.token);
        if (data?.status === 'success') {
          setAllUsersList(formatLastActive(data.users, LastActiveFormat.FULL));
        }
        return data;
      }
      throw new Error('No token found');
    },

    {
      enabled: !!user.token,
      onSuccess: (data) => {
        
        if (data?.status === 'success') {
          console.log(data.users);
          setAllUsersList(
            formatLastActive(data.users, LastActiveFormat.CUSTOM),
          );
          setIsAllUsersSuccess(true);
        } else {
          setIsAllUsersSuccess(false);
        }
      },

      onError: () => {
        setIsAllUsersSuccess(false);
      },
    },
  );
  if (!user.token) {
    return <NotFound navigationPath={'/'} />;
  }

  if (isAdminDashBoardLoading || isAdminGetAllUsersLoading) {
    return (
      <Stack align="center">
        <Loader color="teal" size={400} />

        <Title>Loading...</Title>
      </Stack>
    );
  }

  if (
    isAdminGetAllUsersError ||
    isAdminDashBoardError ||
    !isDashBoardSuccess ||
    !isAllUsersSuccess
  ) {
    return <NotFound navigationPath={'/home'} />;
  }

  const renderComponentToDisplay = () => {
    switch (selectedAdminNavbar) {
      case 'userManagment':
        return (
          <Box
            sx={{
              backgroundImage:
                theme.colorScheme === 'light'
                  ? theme.fn.linearGradient(7, '#64b4f655') //OR "#4CAF50", "#2196F3"
                  : theme.fn.linearGradient(7, '#303233'),
            }}
          >
            <UsersTable data={allUsersList} />
          </Box>
        );

      case 'billing':
        return (
          <Box
            sx={{
              backgroundImage:
                theme.colorScheme === 'light'
                  ? theme.fn.linearGradient(7, '#64b4f655') //OR "#4CAF50", "#2196F3"
                  : theme.fn.linearGradient(7, '#303233'),
            }}
          >
            <StudentmanagmentTable data={allUsersList}></StudentmanagmentTable>
          </Box>
        );
      case 'register_new_user':
        return (
          <Box
            sx={{
              backgroundImage:
                theme.colorScheme === 'light'
                  ? theme.fn.linearGradient(7, '#64b4f655') //OR "#4CAF50", "#2196F3"
                  : theme.fn.linearGradient(7, '#303233'),
            }}
          >
            <RegisterNewUser refetchUserList={refetchAllUsersForDashboard} />
          </Box>
        );
      default:
        break;
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
