import React, { useState } from 'react';
import { useUserState } from '../../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { adminDashboardAPI, adminGetAllUsersAPI } from '../api/api';
// import { NavBar } from '../navBar/NavBar.component';
import { Box, Loader, Stack, Title } from '@mantine/core';
import NotFound from '../Pages/Error/pageNotFound/NotFound.component';

import { StudentmanagmentTable } from './userManagment/studentManagment/StudentmanagmenTable';
import { User } from '../../Model/UserModels';
import { NavBar } from '../navBar/NavBar.component';
import { AppState } from '../../context/AppContext';

const AdminDashboard = () => {
  const { user } = useUserState();
  const { selectedAdminNavbar } = AppState();
  const [isDashBoardSuccess, setIsDashBoardSuccess] = useState(false);
  const [isAllUsersSuccess, setIsAllUsersSuccess] = useState(false);

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
        return data;
      }
      throw new Error('No token found');
    },
    {
      enabled: !!user.token,
      onSuccess: (data) => {
        if (data?.status === 'success') {
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

  const sortData: User[] = [
    {
      id: 1,
      email: 'Elouise.Prohaska@yahoo.com',
      username: 'Athena Weissnat',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 2,
      email: 'Kadin_Trantow87@yahoo.com',
      username: 'Deangelo Runolfsson',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 3,
      email: 'Marina3@hotmail.com',
      username: 'Danny Carter',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 4,
      email: 'Antonina.Pouros@yahoo.com',
      username: 'Trace Tremblay PhD',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 5,
      email: 'Abagail29@hotmail.com',
      username: 'Derek Dibbert',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 6,
      email: 'Jamie23@hotmail.com',
      username: 'Viola Bernhard',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 7,
      email: 'Genesis42@yahoo.com',
      username: 'Austin Jacobi',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 8,
      email: 'Idella.Stehr28@yahoo.com',
      username: 'Hershel Mosciski',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 9,
      email: 'Hildegard17@hotmail.com',
      username: 'Mylene Ebert',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 10,
      email: 'Hillard.Barrows1@hotmail.com',
      username: 'Lou Trantow',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 11,
      email: 'Colleen80@gmail.com',
      username: 'Dariana Weimann',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 12,
      email: 'Lilyan98@gmail.com',
      username: 'Dr. Christy Herman',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 13,
      email: 'Erich_Brekke76@gmail.com',
      username: 'Katelin Schuster',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 14,
      email: 'Kylee4@yahoo.com',
      username: 'Melyna Macejkovic',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 15,
      email: 'Fiona.Kutch@hotmail.com',
      username: 'Pinkie Rice',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
    {
      id: 16,
      email: 'Rico98@hotmail.com',
      username: 'Brain Kreiger',
      isAdmin: false,
      password: null,
      isTeacher: false,
      createdAt: '2023-05-26',
      updatedAt: '2023-05-26',
    },
  ];
  const renderComponentToDisplay = () => {
    switch (selectedAdminNavbar) {
      case 'userManagment':
        return <StudentmanagmentTable data={sortData}></StudentmanagmentTable>;
        break;
      default:
        break;
    }
  };
  return (
    <Box>
      <NavBar />
      {renderComponentToDisplay()}
    </Box>
  );
};

export default AdminDashboard;
