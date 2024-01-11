import React, { useEffect, useState } from 'react';
import { useUserDispatch, useUserState } from '../../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { adminDashboardAPI, adminGetAllUsersAPI } from '../api/api';
import { Box } from '@mantine/core';
import NotFound from '../Pages/Error/pageNotFound/NotFound.component';
import { StudentmanagmentTable } from './userManagment/studentManagment/StudentmanagmenTable';
// import { AdminNavBar } from '../navBar/AdminNavBar.component';
import RegisterNewUser from './registerNewUsers/RegisterNewUsers.component';
import { useAppState } from '../../context/AppContext';
import {
  LastActiveFormat,
  formatLastActive,
} from '../../utils/formattedLastActive';
import UsersTable from './userManagment/AdminDashboard/UserTable.component';
import AdminDrawer from '../navBar/AdminTabs.component';
import Demo from '../Demo';

const Admin = () => {
  const { user } = useUserState();
  const { selectedAdminNavbar } = useAppState();
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
      case 'Assignent':
        return <Demo />;
      default:
        return null;
    }
  };

  // const ArrowButton = ({ onClick, isClosed }: any) => (
  //   <span
  //     onMouseEnter={() => setIsHovered(true)}
  //     onMouseLeave={() => setIsHovered(false)}
  //     style={{ display: 'flex', alignItems: 'center' }}
  //   >
  //     <Tooltip
  //       label={isClosed ? 'Open sidebar' : 'Close sidebar'}
  //       color="gray"
  //       offset={-20}
  //       position="right"
  //       withArrow
  //       arrowSize={10}
  //     >
  //       <Button
  //         onClick={onClick}
  //         style={{
  //           position: 'absolute',
  //           top: '20em',
  //           left: '-2.6em',
  //           transform: 'translateY(-50%)',
  //           zIndex: 999,
  //           border: 'none',
  //           background: 'transparent',
  //         }}
  //         size="lg"
  //       >
  //         <div>
  //           {!isHovered ? (
  //             <IconMinusVertical size={30} stroke={4} color="gray" />
  //           ) : isClosed ? (
  //             <IconChevronLeft size={30} stroke={4} color="gray" />
  //           ) : (
  //             <IconChevronRight size={30} stroke={4} color="gray" />
  //           )}
  //         </div>
  //       </Button>
  //     </Tooltip>
  //   </span>
  // );

  return (
    <Box style={{ position: 'relative' }}>
      {/* {isNavbarVisible && <AdminNavBar />} */}
      <AdminDrawer />
      {renderComponentToDisplay()}
    </Box>
  );
};

export default Admin;
