import { useMutation } from '@tanstack/react-query';
import { IconTrash } from '@tabler/icons-react';
import React from 'react';
import { useUserState, useUserDispatch } from '../../context/UserContext';
import { User } from '../../Model/UserModels';
import { adminDeleteUserAccount } from '../api/api';
import { notificationAlert } from '../notifications/NotificationAlert';

export const useDeleteUser = () => {
  const { allUsersAdminDashboard, user } = useUserState();
  const userDispatch = useUserDispatch();

  const deleteUserMutation = useMutation(
    async (userIds: string[]) => {
      // Delete users one by one
      return Promise.all(
        userIds.map((id) =>
          adminDeleteUserAccount({ token: user.token, Id: id }),
        ),
      );
    },
    {
      onSuccess: (_, userIds) => {
        // Remove all deleted users from the state
        const updatedUsers = allUsersAdminDashboard.filter(
          (u: User) => !userIds.includes(u.id.toString()),
        );

        userDispatch({
          type: 'SET_ALL_ADMIN_DASHBOARD_USERS',
          allUsersAdminDashboard: updatedUsers,
        });

        // Show success notification
        notificationAlert({
          title: 'Users Deleted',
          message: 'The selected users have been successfully deleted.',
          iconColor: 'red',
          closeAfter: 5000,
          icon: <IconTrash size={18} />,
        });
      },
      onError: (error) => {
        console.error('Error deleting users:', error);
      },
    },
  );

  return {
    handleDeleteUser: (userIds: string[]) => deleteUserMutation.mutate(userIds),
    isLoading: deleteUserMutation.isLoading,
  };
};
