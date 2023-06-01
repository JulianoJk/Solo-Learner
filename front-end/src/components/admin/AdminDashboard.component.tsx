import React, { useState } from 'react';
import { useUserState } from '../../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { adminDashboardAPI } from '../api/api';
import { NavBar } from '../navBar/NavBar.component';
import { Loader, Stack, Title } from '@mantine/core';
import NotFound from '../Pages/Error/pageNotFound/NotFound.component';

const AdminDashboard = () => {
  const { user } = useUserState();
  const [isSuccess, setIsSuccess] = useState(false);

  const { isLoading, isError } = useQuery(
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
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      },
      onError: () => {
        setIsSuccess(false);
      },
    },
  );

  if (!user.token) {
    return <NotFound navigationPath={'/'} />;
  }

  if (isLoading) {
    return (
      <Stack align="center">
        <Loader color="teal" size={400} />

        <Title>Loading...</Title>
      </Stack>
    );
  }

  if (isError || !isSuccess) {
    return <NotFound navigationPath={'/home'} />;
  }

  return (
    <>
      <h1>haudhasud</h1>
      <NavBar />
    </>
  );
};

export default AdminDashboard;
