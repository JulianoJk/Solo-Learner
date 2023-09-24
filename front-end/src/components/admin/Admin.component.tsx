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
import AuthenticationRegisterForm from '../Auth/Login/AuthenticationRegisterForm';

const Admin = () => {
  const { user } = useUserState();
  const { selectedAdminNavbar } = AppState();
  const [isDashBoardSuccess, setIsDashBoardSuccess] = useState(false);
  const [isAllUsersSuccess, setIsAllUsersSuccess] = useState(false);
  const [allUsersList, setAllUsersList] = useState<User[]>([]);
  const theme = useMantineTheme();
  const avatarData = [
    {
      avatar:
        'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
  ];
  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarData.length);
    return avatarData[randomIndex].avatar;
  };
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
          const updatedUsers = data.users.map((user) => ({
            ...user,
            avatar: getRandomAvatar(),
          }));
          setAllUsersList(
            formatLastActive(updatedUsers, LastActiveFormat.CUSTOM),
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
      case 'addNewUser':
        return (
          <Box
            sx={{
              backgroundImage:
                theme.colorScheme === 'light'
                  ? theme.fn.linearGradient(7, '#64b4f655') //OR "#4CAF50", "#2196F3"
                  : theme.fn.linearGradient(7, '#303233'),
            }}
          >
            <AuthenticationRegisterForm
              hasBorder={false}
              registerTitle={'Add New User'}
              switchToLogin={false}
              refreshPageAfterRegister={false}
            ></AuthenticationRegisterForm>
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
