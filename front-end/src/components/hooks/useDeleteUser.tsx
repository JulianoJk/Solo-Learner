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
    async (userId: string) => {
      // Delete user API request
      return await adminDeleteUserAccount({ token: user.token, Id: userId });
    },
    {
      onSuccess: (response, userId) => {
        // Find and remove the deleted user from the state
        const userToDelete = allUsersAdminDashboard.find(
          (u: User) => u.id.toString() === userId,
        );

        if (userToDelete) {
          const updatedUsers = allUsersAdminDashboard.filter(
            (u: User) => u.id.toString() !== userId,
          );
          userDispatch({
            type: 'SET_ALL_ADMIN_DASHBOARD_USERS',
            allUsersAdminDashboard: updatedUsers,
          });

          // Show success notification
          notificationAlert({
            title: `User "${userToDelete.username}" Deleted`,
            message: `The account for ${userToDelete.username} has been successfully deleted.`,
            iconColor: 'red',
            closeAfter: 5000,
            icon: <IconTrash size={18} />,
          });
        }
      },
      onError: (error) => {
        console.error('Error deleting user:', error);
      },
    },
  );

  // Expose the mutation function and isLoading state
  return {
    handleDeleteUser: (userId: string) => deleteUserMutation.mutate(userId),
    isLoading: deleteUserMutation.isLoading, // Return isLoading state
  };
};
