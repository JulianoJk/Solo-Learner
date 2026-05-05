import { Text, ScrollArea, List, Code } from '@mantine/core';
import { modals } from '@mantine/modals';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../context/AppContext';
import { useAppState } from '../../context/AppContext';
import { useDeleteUser } from '../hooks/useDeleteUser';

const ConfirmationModal = () => {
  const { isAdminDeleteModalOpen, usersToDelete } = useAppState();
  const appDispatch = useAppDispatch();
  const { handleDeleteUser } = useDeleteUser();

  useEffect(() => {
    if (!isAdminDeleteModalOpen || usersToDelete.length === 0) return;

    modals.openConfirmModal({
      title: 'Please confirm your action',
      closeOnConfirm: false,
      labels: { confirm: 'Delete user(s)', cancel: 'Cancel' },
      children: (
        <>
          <Text size="sm">
            Please confirm that you want to permanently delete the selected
            user(s). This action cannot be undone.
          </Text>

          <ScrollArea
            h={250}
            type="auto"
            offsetScrollbars
            scrollbarSize={12}
            mt="md"
          >
            <Code block>
              <List>
                {usersToDelete.map((user) => (
                  <List.Item key={user.id}>
                    {user.username} - {user.email}
                  </List.Item>
                ))}
              </List>
            </Code>
          </ScrollArea>
        </>
      ),
      onConfirm: () => {
        appDispatch({
          type: 'SET_ADMIN_DELETE_MODAL_OPEN',
          isAdminDeleteModalOpen: false,
        });
        handleDeleteUser(usersToDelete.map((u) => u.id));
        modals.closeAll();
      },
      onCancel: () => {
        appDispatch({
          type: 'SET_ADMIN_DELETE_MODAL_OPEN',
          isAdminDeleteModalOpen: false,
        });
        modals.closeAll();
      },
    });
  }, [isAdminDeleteModalOpen, usersToDelete, appDispatch, handleDeleteUser]);

  return null;
};

export default ConfirmationModal;
