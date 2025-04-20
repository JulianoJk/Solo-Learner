import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Group,
  ActionIcon,
  Anchor,
  TextInput,
  Menu,
  Select,
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

const StudentManagementTable = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const { allUsersAdminDashboard } = useUserState();
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const { isLoading } = useDeleteUser();

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
          sx={{ width: '15em' }}
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
        borderRadius="sm"
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
            render: (user) => (
              <Anchor onClick={() => navigate(`/profile/${user.username}`)}>
                {user.username}
              </Anchor>
            ),
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
          { accessor: 'countryName', title: 'Country' },
          { accessor: 'phoneNumber', title: 'Phone' },
          { accessor: 'createdAt', title: 'Joined' },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (user) => (
              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconSettings size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Manage User</Menu.Label>
                  <Menu.Item
                    leftSection={<IconPencil size={14} />}
                    onClick={() => {
                      appDispatch({
                        type: 'SET_ADMIN_MOBILE_MODAL_OPEN',
                        adminMobileModalOpen: true,
                      });
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
                    onClick={() => {
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
      />

      <ConfirmationModal />
    </>
  );
};

export default StudentManagementTable;
