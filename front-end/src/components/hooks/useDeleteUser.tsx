import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { IconTrash } from '@tabler/icons-react';

import { useUserState, useUserDispatch } from '../../context/UserContext';
import { User } from '../../Model/UserModels';
import {
  adminDeleteUserAccount,
  adminBulkDeleteUsersAccount,
} from '../api/api';
import { notificationAlert } from '../notifications/NotificationAlert';

export const useDeleteUser = () => {
  const { allUsersAdminDashboard, user } = useUserState();
  const userDispatch = useUserDispatch();

  const deletedUserName = (userId: number) => {
    const targetUser = allUsersAdminDashboard.find(
      (u: User) => u.id === userId,
    );
    return targetUser?.username ? targetUser.username : 'User';
  };

  const deleteUserMutation = useMutation(
    async (userIds: number[]) => {
      if (!userIds || userIds.length === 0) {
        return { error: { message: 'No users selected.' } };
      }
      if (userIds.length === 1) {
        // single delete
        return adminDeleteUserAccount({
          token: user.token,
          Id: userIds[0],
        });
      }

      // bulk delete
      return adminBulkDeleteUsersAccount({
        token: user.token,
        Id: userIds,
      });
    },
    {
      onSuccess: (_, userIds) => {
        // remove deleted users from state
        const updatedUsers = allUsersAdminDashboard.filter(
          (u: User) => !userIds.includes(u.id),
        );

        notificationAlert({
          title: userIds.length > 1 ? 'Users Deleted' : 'User Deleted',
          message:
            userIds.length > 1
              ? 'Selected users have been deleted.'
              : `${deletedUserName(userIds[0])} has been successfully deleted.`,
          iconColor: 'red',
          closeAfter: 5000,
          icon: <IconTrash size={18} />,
        });

        userDispatch({
          type: 'SET_ALL_ADMIN_DASHBOARD_USERS',
          allUsersAdminDashboard: updatedUsers,
        });
      },
      onError: (error: any) => {
        notificationAlert({
          title: "Couldn't delete user(s)",
          message:
            error?.error?.message || 'Something went wrong. Please try again.',
          iconColor: 'red',
          closeAfter: 5000,
          icon: <IconTrash size={18} />,
        });
      },
    },
  );

  const handleDeleteUser = useCallback(
    (userIds: number[]) => {
      deleteUserMutation.mutate(userIds);
    },
    [deleteUserMutation],
  );

  return {
    handleDeleteUser,
    isLoading: deleteUserMutation.isLoading,
  };
};
