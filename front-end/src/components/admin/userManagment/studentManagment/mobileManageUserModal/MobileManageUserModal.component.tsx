import { Modal, Button, Grid, Divider, Text, Stack } from '@mantine/core';
import React from 'react';
import { useAppDispatch, useAppState } from '../../../../../context/AppContext';

const MobileManageUserModal = () => {
  const { adminMobileModalOpen } = useAppState();
  const appDispatch = useAppDispatch();

  const closeModal = () => {
    appDispatch({
      type: 'SET_ADMIN_MOBILE_MODAL_OPEN',
      adminMobileModalOpen: false,
    });
  };

  const handleAction = (action: string) => {
    console.log(`Performing action: ${action}`);
    // Add your action logic here
  };

  return (
    <Modal
      opened={adminMobileModalOpen as boolean}
      onClose={closeModal}
      title="Manage User"
    >
      {/* Account Management Section */}
      <Text size="sm" w="100%" mt="md">
        Account Management
      </Text>
      <Divider my="sm" />
      <Grid>
        <Grid.Col span={6}>
          <Button fullWidth onClick={() => handleAction('editDetails')}>
            Edit Details
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button fullWidth onClick={() => handleAction('resetPassword')}>
            Reset Password
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button fullWidth onClick={() => handleAction('resetPassword')}>
            Reset Password
          </Button>
        </Grid.Col>
      </Grid>

      {/* Permissions and Roles Section */}
      <Text size="sm" w="100%" mt="xl">
        Permissions and Roles
      </Text>
      <Divider my="sm" />
      <Grid>
        <Grid.Col span={6}>
          <Button fullWidth onClick={() => handleAction('assignRole')}>
            Assign Roles/Permissions
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button fullWidth onClick={() => handleAction('promoteUser')}>
            Promote to Admin/Teacher
          </Button>
        </Grid.Col>
      </Grid>

      {/* User Activity Section */}
      <Text size="sm" w="100%" mt="xl">
        User Activity
      </Text>
      <Divider my="sm" />
      <Grid>
        <Grid.Col span={6}>
          <Button fullWidth onClick={() => handleAction('viewActivity')}>
            View User Activity
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button fullWidth onClick={() => handleAction('sendNotification')}>
            Send Notification
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button fullWidth onClick={() => handleAction('suspendUser')}>
            Suspend User
          </Button>
        </Grid.Col>
      </Grid>

      {/* Critical Actions Section */}
      <Text size="sm" w="100%" mt="xl" color="red">
        Critical Actions
      </Text>
      <Divider my="sm" />
      <Stack gap="sm">
        <Button fullWidth color="red" onClick={() => handleAction('banUser')}>
          Ban User
        </Button>
        <Button
          fullWidth
          color="red"
          onClick={() => handleAction('deleteUser')}
        >
          Delete User
        </Button>
      </Stack>
    </Modal>
  );
};

export default MobileManageUserModal;
