/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  Text,
  ScrollArea,
  Center,
  TextInput,
  useMantineColorScheme,
  SimpleGrid,
  rem,
} from '@mantine/core';
import { IconMoodSad, IconSearch } from '@tabler/icons-react';
import {
  IApiError,
  IApiMessageResponse,
  User,
  fetchUserList,
} from '../../../../Model/UserModels';
import React, { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../../../context/AppContext';
import { notificationAlert } from '../../../notifications/NotificationAlert';
import { adminDeleteUserAccount } from '../../../api/api';
import { useUserState, useUserDispatch } from '../../../../context/UserContext';
import { ChangeEvent } from 'react';
import { useGetCurrentUser } from '../../../hooks/useGetCurrentUser';
// import UserRow from './UserRow.component';
import UserCard from './UserCard.component';

const UsersTable = () => {
  const { colorScheme } = useMantineColorScheme();

  const {
    user: AdminUser,
    allUsersAdminDashboard,
    isAllUsersAdminDashboardLoading,
  } = useUserState();
  const userDispatch = useUserDispatch();
  const appDispatch = useAppDispatch();

  const [currentUser, setCurrentUser] = useState<fetchUserList>();
  const [currentSelectedUser, setCurrentSelectedUser] = useState<
    number | undefined
  >();
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [rows, setRows] = useState<React.ReactNode[]>([]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);

    const filteredUsers = allUsersAdminDashboard.filter(
      (user) =>
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredUsers(filteredUsers);
  };

  const handleEditButton = () => {
    // TODO!: Add edit user modal
    // console.log('user.id');
  };

  const currentFetchedUser = useGetCurrentUser(AdminUser.token);
  useEffect(() => {
    setCurrentUser(currentFetchedUser?.data);
  }, [currentFetchedUser.isFetched]);

  const { mutate: deleteAccount } = useMutation(adminDeleteUserAccount, {
    onSuccess: (data: IApiMessageResponse | IApiError) => {
      if (typeof data === 'object' && 'error' in data) {
        // handle the error case
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
        });
      } else {
        userDispatch({ type: 'REMOVE_ALL_ADMIN_DASHBOARD_USERS' });

        userDispatch({
          type: 'SET_ALL_ADMIN_DASHBOARD_USERS',
          allUsersAdminDashboard: allUsersAdminDashboard.filter(
            (user) => user.id !== currentSelectedUser,
          ),
        });

        notificationAlert({
          title: 'Account Deleted.',
          message: data.message,
          iconColor: 'red',
          closeAfter: 5000,
          icon: <IconMoodSad color="yellow" size={18} />,
        });
      }
    },
  });

  const handleDeleteUser = (user: User) => {
    if (user.id !== undefined) {
      setCurrentSelectedUser(user.id);

      modals.openConfirmModal({
        title: 'You are about to delete a user',

        children: (
          <Text size="lg">
            {`Are you sure you want to delete `}
            <i>
              <b style={{ textDecoration: 'underline' }}>{user.username}</b>
            </i>
            {`? This action is irreversible`}
          </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onConfirm: () => {
          const requestData = {
            token: AdminUser.token,
            Id: user.id,
          };
          deleteAccount(requestData);
        },
        closeOnCancel: true,
        closeOnConfirm: true,
        confirmProps: { color: 'red' },
      });
    } else {
      notificationAlert({
        title: 'Uh oh!',
        message: "Something went wrong. We couldn't delete the user.",
        iconColor: 'red',
        closeAfter: 5000,
        icon: <IconMoodSad color="black" size={18} />,
      });
    }
  };

  const [hoveredUserId, setHoveredUserId] = useState<number | null>(null);
  const [hoveredUsername, setHoveredUsername] = useState(false);
  const [hoveredEmail, setHoveredEmail] = useState(false);

  const handleUserHover = (
    userId: number | null,
    isUsername: boolean,
    isEmail: boolean,
  ) => {
    setHoveredUserId(userId);
    setHoveredUsername(isUsername);
    setHoveredEmail(isEmail);
  };

  useEffect(() => {
    // Update rows whenever allUsersAdminDashboard changes

    setRows(updatedRows);
  }, [allUsersAdminDashboard, currentUser, filteredUsers, search]);
  const updatedRows =
    search === ''
      ? allUsersAdminDashboard
          .filter((user) => user.id !== currentUser?.data?.id)
          .map((item) => (
            <UserCard
              key={item.id}
              user={item}
              onSendMessage={() => {
                console.log('send message');
              }}
              handleDeleteUser={handleDeleteUser}
            />
          ))
      : filteredUsers
          .filter((user) => user.id !== currentUser?.data?.id)
          .map((item) => (
            <UserCard
              key={item.id}
              user={item}
              onSendMessage={() => {
                console.log('send message');
              }}
              handleDeleteUser={handleDeleteUser}
            />
          ));
  return (
    <>
      {isAllUsersAdminDashboardLoading ? (
        <div>is loading</div>
      ) : (
        <ScrollArea>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={
              <IconSearch
                style={{ width: 16, height: 16 }} // Remove rem function here
                stroke={1.5}
              />
            }
            value={search}
            onChange={handleSearchChange}
          />
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3, xl: 6 }}
            spacing={{ base: 5, sm: 'md' }}
            // verticalSpacing={{ base: 'md', sm: 'xl' }}
          >
            {rows}
          </SimpleGrid>
        </ScrollArea>
      )}
    </>
  );
};

export default UsersTable;
