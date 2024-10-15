// Admin.js
import React, { useState, useEffect } from 'react';
import { Drawer, Button, Box } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useUserDispatch, useUserState } from '../../context/UserContext';
import { useAppState } from '../../context/AppContext';
import { NavbarSimpleColored } from '../navBar/deleteAfter/AdminNavBar.component';
import NotFound from '../Pages/Error/pageNotFound/NotFound.component';
import { useQuery } from '@tanstack/react-query';
import { adminDashboardAPI, adminGetAllUsersAPI } from '../api/api';

import RegisterNewUser from './registerNewUsers/RegisterNewUsers.component';
import {
  formatLastActive,
  LastActiveFormat,
} from '../../utils/formattedLastActive';
import { useMediaQuery } from '@mantine/hooks';
import AdminDrawer from '../navBar/AdminTabs.component';
import { StudentManagementCards } from './userManagment/studentManagment/MobileStudent.component';
import StudentmanagmenTable from './userManagment/studentManagment/StudentManagmentTable.component';

const Admin = () => {
  const { user } = useUserState();
  const { selectedAdminNavbar } = useAppState();
  const userDispatch = useUserDispatch();
  const [isAllUsersSuccess, setIsAllUsersSuccess] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const matches = useMediaQuery('(min-width: 56.25em)'); // Check for desktop

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
        return !matches ? <StudentManagementCards /> : <StudentmanagmenTable />;
      case 'billing':
        return <StudentmanagmenTable />;
      case 'register_new_user':
        return <RegisterNewUser refetchUserList={refetchAllUsers} />;
      case 'Assignent':
        return <StudentmanagmenTable />;
      default:
        return null;
    }
  };

  const ArrowButton = ({ onClick, isClosed }: any) => (
    <Button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '20em',
        right: '-2.6em', // Align on the right side
        transform: 'translateY(-50%)',
        zIndex: 999,
        border: 'none',
        background: 'transparent',
      }}
      size="lg"
    >
      <div>
        {isClosed ? (
          <IconChevronLeft size={30} stroke={4} color="gray" />
        ) : (
          <IconChevronRight size={30} stroke={4} color="gray" />
        )}
      </div>
    </Button>
  );

  return (
    <Box style={{ position: 'relative' }}>
      {/* Render Drawer only on mobile */}
      {!matches && (
        <Drawer
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          size="lg"
          padding="md"
          title="Solo Learner"
          zIndex={1000000}
        >
          <NavbarSimpleColored
            drawerOpened={drawerOpened}
            setDrawerOpened={setDrawerOpened} // Pass the state and toggle function
          />
        </Drawer>
      )}

      {/* Render Arrow button on right side */}
      {!matches && (
        <ArrowButton
          onClick={() => setDrawerOpened((prev) => !prev)}
          isClosed={!drawerOpened}
        />
      )}

      {/* Render AdminDrawer on desktop */}
      {matches && <AdminDrawer />}

      {renderComponentToDisplay()}
    </Box>
  );
};

export default Admin;
