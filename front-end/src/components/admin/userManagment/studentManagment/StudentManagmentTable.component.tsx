import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Group,
  ActionIcon,
  TextInput,
  Menu,
  Select,
  Text,
  Stack,
  Divider,
  Button,
  Box,
  Modal,
} from '@mantine/core';
import {
  IconPencil,
  IconSearch,
  IconTrash,
  IconSettings,
  IconPhoto,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { useUserState } from '../../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../context/AppContext';
import { getBadgeColor, getJob } from '../../../../utils/utils';
import ConfirmationModal from '../../../ConfirmationModal/ConfirmationModal.component';
import { useDeleteUser } from '../../../hooks/useDeleteUser';
import EditUserForm from './EditUserForm';

const StudentManagementTable = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const { allUsersAdminDashboard } = useUserState();
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const { isLoading } = useDeleteUser();
  const [editUser, setEditUser] = useState<any | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const filteredData = allUsersAdminDashboard.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      !roleFilter ||
      (roleFilter === 'Admin' && user.isAdmin) ||
      (roleFilter === 'Teacher' && user.isTeacher) ||
      (roleFilter === 'Student' && user.isStudent);
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <Group justify="space-between" mb="md">
        <TextInput
          sx={{ width: '20em' }}
          placeholder="Search by username or email"
          value={search}
          onChange={handleSearchChange}
          rightSection={<IconSearch size={16} />}
        />

        <Select
          sx={{ width: '15em' }}
          placeholder="Filter by role"
          clearable
          value={roleFilter}
          onChange={setRoleFilter}
          data={['Admin', 'Teacher', 'Student']}
          searchable
        />
      </Group>

      <DataTable
        withTableBorder
        borderRadius="md"
        withColumnBorders
        striped
        highlightOnHover
        records={filteredData}
        columns={[
          {
            accessor: 'avatar',
            title: 'Img',
            render: (user) => (
              <Avatar src={user.picture} size={30} radius="xl" />
            ),
            width: 50,
          },
          {
            accessor: 'username',
            title: 'Username',
            render: (user) => user.username,
          },
          { accessor: 'firstName', title: 'First Name' },
          { accessor: 'middleName', title: 'Middle Name' },
          { accessor: 'lastName', title: 'Last Name' },
          { accessor: 'email', title: 'Email' },
          {
            accessor: 'role',
            title: 'Role',
            render: (user) => (
              <Badge color={getBadgeColor(user.isAdmin, user.isTeacher)}>
                {getJob(user.isAdmin, user.isTeacher)}
              </Badge>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (user) => (
              <Menu shadow="md" width={200} position="bottom-end" withinPortal>
                <Menu.Target>
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={(e) => e.stopPropagation()} // prevents rowExpansion
                  >
                    <IconSettings size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Manage User</Menu.Label>
                  <Menu.Item
                    leftSection={<IconPencil size={14} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditUser(user);
                    }}
                  >
                    Edit User
                  </Menu.Item>
                  <Menu.Item leftSection={<IconPhoto size={14} />} disabled>
                    View Profile
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconArrowsLeftRight size={14} />}
                    disabled
                  >
                    Transfer Data
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={<IconTrash size={14} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      appDispatch({
                        type: 'SET_ADMIN_DELETE_MODAL_OPEN',
                        isAdminDeleteModalOpen: true,
                      });
                      appDispatch({
                        type: 'SET_USERS_TO_DELETE',
                        users: [user],
                      });
                    }}
                    disabled={isLoading}
                  >
                    Delete User
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ),
          },
        ]}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        rowExpansion={{
          content: ({ record }) => (
            <Box p="sm">
              <Group align="flex-start">
                <Avatar src={record.picture} size={50} radius="xl" />
                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Username: {record.username}
                  </Text>
                  <Text size="sm" fw={500}>
                    ID: {record.id}
                  </Text>
                  <Text size="sm">
                    Full Name: {record.firstName} {record.middleName}{' '}
                    {record.lastName}
                  </Text>
                  <Text size="sm">Email: {record.email}</Text>
                  <Text size="sm">Phone: {record.phone}</Text>
                  <Group gap={6} align="center">
                    <Text size="sm">Country:</Text>
                    <Avatar src={record.country.flag} size={16} radius="xl" />
                    <Text size="sm">{record.country.name}</Text>
                  </Group>

                  <Text size="sm">Joined: {record.createdAt}</Text>
                  {record.students?.length > 0 && (
                    <Text size="xs" c="dimmed">
                      Students:{' '}
                      {record.students
                        .map((s: { username: any }) => s.username)
                        .join(', ')}
                    </Text>
                  )}
                  {record.teachers?.length > 0 && (
                    <Text size="xs" c="dimmed">
                      Teachers:{' '}
                      {record.teachers
                        .map((t: { username: any }) => t.username)
                        .join(', ')}
                    </Text>
                  )}
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() => navigate(`/profile/${record.username}`)}
                    mt="xs"
                  >
                    View Full Profile
                  </Button>
                </Stack>
              </Group>
              <Divider my="sm" />
            </Box>
          ),
        }}
      />
      <Modal
        opened={!!editUser}
        onClose={() => setEditUser(null)}
        title="Edit User"
        size="lg"
        centered
      >
        <EditUserForm user={editUser} onClose={() => setEditUser(null)} />
      </Modal>
      <ConfirmationModal />
    </>
  );
};

export default StudentManagementTable;
