import { Text, ScrollArea, List, Code } from '@mantine/core';
import { modals } from '@mantine/modals';
import React, { useEffect } from 'react';
import { useAppState } from '../../context/AppContext';

const ConfirmationModal = () => {
  const { isAdminDeleteModalOpen, usersToDelete } = useAppState();

  const userList = (
    <List>
      {usersToDelete.map((user, index) => (
        <List.Item key={index}>
          {user.username} - {user.email}
        </List.Item>
      ))}
    </List>
  );

  useEffect(() => {
    if (isAdminDeleteModalOpen && usersToDelete.length > 0) {
      modals.openConfirmModal({
        title: 'Please confirm your action',
        closeOnConfirm: false,
        labels: { confirm: 'Next modal', cancel: 'Close modal' },
        children: (
          <>
            <Text size="sm">
              Are you sure you want to delete the following user(s)? This action
              cannot be undone.
            </Text>

            <ScrollArea
              h={250}
              type="auto"
              offsetScrollbars
              scrollbarSize={12}
              mt="md"
            >
              <Code block>{userList}</Code>
            </ScrollArea>
          </>
        ),
        onConfirm: () =>
          modals.openConfirmModal({
            title: 'This is modal at second layer',
            labels: { confirm: 'Delete user(s)', cancel: 'Back' },
            confirmProps: { color: 'red' },
            closeOnConfirm: false,
            children: (
              <Text size="sm">
                Please confirm that you want to permanently delete the selected
                user(s). This action cannot be undone.
              </Text>
            ),
            onConfirm: modals.closeAll,
          }),
      });
    }
  }, [isAdminDeleteModalOpen, usersToDelete]);

  return null;
};

export default ConfirmationModal;
