import React, { useCallback, useMemo, useState, useEffect } from 'react';
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
  IconMoodSad2,
} from '@tabler/icons-react';
import type { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { DataTable } from 'mantine-datatable';
import { useUserState } from '../../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../context/AppContext';
import {
  formatOptional,
  fullUserDisplayName,
  getBadgeColor,
  getJob,
} from '../../../../utils/utils';
import ConfirmationModal from '../../../ConfirmationModal/ConfirmationModal.component';
import { useDeleteUser } from '../../../hooks/useDeleteUser';
import EditUserForm from './EditUserForm';
import type { User } from '../../../../Model/UserModels';
import {
  ROLE_FILTER_DATA,
  TABLE_PAGINATION_SIZE,
} from '../../../Pages/LearningUnits/constants';
import { ERROR_DARK_COLOR } from '../../../../Theme/Styles';

const filterAdminUsers = (
  users: User[],
  search: string,
  roleFilter: string | null,
): User[] => {
  const needle = search.trim().toLowerCase();
  return users.filter((u) => {
    const matchesText =
      needle === '' ||
      u.email.toLowerCase().includes(needle) ||
      u.username.toLowerCase().includes(needle);
    const matchesRole =
      !roleFilter ||
      (roleFilter === 'Admin' && u.isAdmin) ||
      (roleFilter === 'Teacher' && u.isTeacher) ||
      (roleFilter === 'Student' && u.isStudent);
    return matchesText && matchesRole;
  });
};

type UserActionsMenuProps = {
  user: User;
  deleteDisabled: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

const UserActionsMenu = ({
  user,
  deleteDisabled,
  onEdit,
  onDelete,
}: UserActionsMenuProps) => (
  <Menu shadow="md" width={200} position="bottom-end" withinPortal>
    <Menu.Target>
      <ActionIcon
        variant="subtle"
        color="gray"
        onClick={(e) => e.stopPropagation()}
        aria-label="User actions"
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
          onEdit(user);
        }}
      >
        Edit User
      </Menu.Item>
      <Menu.Item leftSection={<IconPhoto size={14} />} disabled>
        View Profile
      </Menu.Item>
      <Menu.Item leftSection={<IconArrowsLeftRight size={14} />} disabled>
        Transfer Data
      </Menu.Item>
      <Menu.Item
        color="red"
        leftSection={<IconTrash size={14} />}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(user);
        }}
        disabled={deleteDisabled}
      >
        Delete User
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

type ExpandedUserPanelProps = {
  user: User;
  onViewProfile: (username: string) => void;
};

const ExpandedUserPanel = ({ user, onViewProfile }: ExpandedUserPanelProps) => {
  const studentLine = user.students?.length
    ? user.students.map((s) => s.username).join(', ')
    : null;
  const teacherLine = user.teachers?.length
    ? user.teachers.map((t) => t.username).join(', ')
    : null;

  return (
    <Box p="sm">
      <Group align="flex-start">
        <Avatar src={user.picture} size={50} radius="xl" />
        <Stack gap={4}>
          <Text size="sm" fw={500}>
            Username: {user.username}
          </Text>
          <Text size="sm" fw={500}>
            ID: {user.id}
          </Text>
          <Text size="sm">Full Name: {fullUserDisplayName(user)}</Text>
          <Text size="sm">Email: {user.email}</Text>
          <Text size="sm">Phone: {formatOptional(user.phoneNumber)}</Text>
          <Group gap={6} align="center">
            <Text size="sm">Country:</Text>
            <Avatar src={user.country.flag} size={16} radius="xl" />
            <Text size="sm">{user.country.name}</Text>
          </Group>
          <Text size="sm">Joined: {user.createdAt}</Text>
          {studentLine && (
            <Text size="xs" c="dimmed">
              Students: {studentLine}
            </Text>
          )}
          {teacherLine && (
            <Text size="xs" c="dimmed">
              Teachers: {teacherLine}
            </Text>
          )}
          <Button
            size="xs"
            variant="light"
            onClick={() => onViewProfile(user.username)}
            mt="xs"
          >
            View Full Profile
          </Button>
        </Stack>
      </Group>
      <Divider my="sm" />
    </Box>
  );
};

const StudentManagementTable = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const { allUsersAdminDashboard, user: sessionUser } = useUserState();
  
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<User>>({
    columnAccessor: 'username',
    direction: 'asc',
  });

  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const { isLoading } = useDeleteUser();

  const sortedAndFilteredData = useMemo(() => {
    const data = filterAdminUsers(allUsersAdminDashboard, search, roleFilter);
    
    return [...data].sort((a, b) => {
      const accessor = sortStatus.columnAccessor as keyof User;
      let aValue: any = a[accessor];
      let bValue: any = b[accessor];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortStatus.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [allUsersAdminDashboard, search, roleFilter, sortStatus]);

  const filteredRecords = useMemo(() => {
    const from = (page - 1) * TABLE_PAGINATION_SIZE;
    const to = from + TABLE_PAGINATION_SIZE;
    return sortedAndFilteredData.slice(from, to);
  }, [sortedAndFilteredData, page]);

  useEffect(() => {
    setPage(1);
  }, [search, roleFilter, sortStatus]);

  const openDeleteModal = useCallback(
    (user: User) => {
      appDispatch({
        type: 'SET_ADMIN_DELETE_MODAL_OPEN',
        isAdminDeleteModalOpen: true,
      });
      appDispatch({ type: 'SET_USERS_TO_DELETE', users: [user] });
    },
    [appDispatch],
  );

  const goToProfile = useCallback(
    (username: string) => navigate(`/profile/${username}`),
    [navigate],
  );

  const columns = useMemo<DataTableColumn<User>[]>(
    () => [
      {
        accessor: 'avatar',
        title: 'Img',
        render: (u) => <Avatar src={u.picture} size={30} radius="xl" />,
        width: 50,
      },
      {
        accessor: 'username',
        title: 'Username',
        sortable: true,
        render: (u) => u.username,
      },
      { accessor: 'firstName', title: 'First Name', sortable: true },
      {
        accessor: 'middleName',
        title: 'Middle Name',
        sortable: true,
        render: (u) => formatOptional(u.middleName),
      },
      { accessor: 'lastName', title: 'Last Name', sortable: true },
      { accessor: 'email', title: 'Email', sortable: true },
      {
        accessor: 'role',
        title: 'Role',
        render: (u) => (
          <Badge color={getBadgeColor(u.isAdmin, u.isTeacher)}>
            {getJob(u.isAdmin, u.isTeacher)}
          </Badge>
        ),
      },
      {
        accessor: 'actions',
        title: 'Actions',
        textAlign: 'right',
        render: (u) => (
          <UserActionsMenu
            user={u}
            deleteDisabled={isLoading}
            onEdit={setEditUser}
            onDelete={openDeleteModal}
          />
        ),
      },
    ],
    [isLoading, openDeleteModal],
  );

  const rowExpansion = useMemo(
    () => ({
      content: ({
        record,
      }: {
        record: User;
        index: number;
        collapse: () => void;
      }) => <ExpandedUserPanel user={record} onViewProfile={goToProfile} />,
    }),
    [goToProfile],
  );

  const closeEditModal = useCallback(() => setEditUser(null), []);

  return (
    <>
      <Group justify="space-between" mb="md">
        <TextInput
          w={320}
          placeholder="Search by username or email"
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setPage(1);
          }}
          rightSection={<IconSearch size={16} />}
        />
        <Group>
          {selectedRecords.length !== 0 && (
            <Button
              onClick={() => {
                appDispatch({
                  type: 'SET_ADMIN_DELETE_MODAL_OPEN',
                  isAdminDeleteModalOpen: true,
                });

                appDispatch({
                  type: 'SET_USERS_TO_DELETE',
                  users: selectedRecords,
                });
              }}
              variant="filled"
              color={ERROR_DARK_COLOR}
              size="xs"
            >
              Delete
            </Button>
          )}
          <Select
            w={240}
            placeholder="Filter by role"
            clearable
            value={roleFilter}
            onChange={setRoleFilter}
            data={ROLE_FILTER_DATA}
            searchable
          />
        </Group>
      </Group>

      <DataTable<User>
        withTableBorder
        minHeight="10rem"
        borderRadius="md"
        withColumnBorders
        striped
        highlightOnHover
        records={filteredRecords}
        columns={columns}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        rowExpansion={rowExpansion}
        page={page}
        onPageChange={(p) => setPage(p)}
        totalRecords={sortedAndFilteredData.length}
        recordsPerPage={TABLE_PAGINATION_SIZE}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        noRecordsIcon={
          <Box
            p={4}
            mb={4}
            style={{
              fontSize: 0,
              color:
                'light-dark(var(--mantine-colors-dark-3), var(--mantine-colors-gray-5))',
              border:
                '2px solid light-dark(var(--mantine-colors-gray-4), var(--mantine-colors-dark-5))',
              borderRadius: 'var(--mantine-radius-md)',
              background:
                'light-dark(var(--mantine-colors-gray-1), var(--mantine-colors-dark-6))',
            }}
          >
            <IconMoodSad2 size={26} strokeWidth={1.5} />
          </Box>
        }
        noRecordsText="No users found"
      />

      <Modal
        opened={!!editUser}
        onClose={closeEditModal}
        title="Edit User"
        size="lg"
        centered
      >
        {editUser && (
          <EditUserForm
            user={editUser}
            adminToken={sessionUser.token}
            onClose={closeEditModal}
          />
        )}
      </Modal>
      <ConfirmationModal />
    </>
  );
};

export default StudentManagementTable;