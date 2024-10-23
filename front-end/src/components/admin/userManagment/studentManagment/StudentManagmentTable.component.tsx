import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  TextInput,
  Menu,
  Checkbox,
  Button,
} from '@mantine/core';
import {
  IconPencil,
  IconSearch,
  IconTrash,
  IconSettings,
  IconPhoto,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import { useUserState } from '../../../../context/UserContext';
import { User } from '../../../../Model/UserModels';
import { keys } from '@mantine/utils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../context/AppContext';
import MobileManageUserModal from './mobileManageUserModal/MobileManageUserModal.component';
import { getBadgeColor, getJob } from '../../../../utils/utils';
import { useDeleteUser } from '../../../hooks/useDeleteUser';

const StudentManagementTable = () => {
  const [search, setSearch] = useState('');
  const [selection, setSelection] = useState<string[]>([]);
  const { allUsersAdminDashboard } = useUserState();

  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const { handleDeleteUser, isLoading } = useDeleteUser();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const handleRowToggle = (id: string) => {
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const toggleAll = () => {
    setSelection((current) =>
      current.length === filteredData.length
        ? []
        : filteredData.map((item) => item.id.toString()),
    );
  };

  const filteredData = filterData(allUsersAdminDashboard, search);

  const rows = filteredData.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>
        <Checkbox
          checked={selection.includes(row.id.toString())}
          onChange={() => handleRowToggle(row.id.toString())}
        />
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={row.picture} radius={30} />
          <Text fz="sm" fw={500}>
            <Anchor
              onClick={() => {
                navigate(`/profile/${row.username}`);
              }}
            >
              {row.username}
            </Anchor>
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {row.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Group gap={4} align="center">
          <Badge color={getBadgeColor(row.isAdmin, row.isTeacher)}>
            {getJob(row.isAdmin, row.isTeacher)}
          </Badge>
        </Group>
      </Table.Td>
      <Table.Td>{row.createdAt}</Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          {/* Using Menu Dropdown triggered by IconPencil */}
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconPencil
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Manage User</Menu.Label>
              <Menu.Item
                onClick={() => {
                  console.log('Edit User');
                  appDispatch({
                    type: 'SET_ADMIN_MOBILE_MODAL_OPEN',
                    adminMobileModalOpen: true,
                  });
                }}
                leftSection={
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Edit User
              </Menu.Item>
              <Menu.Item
                disabled
                leftSection={
                  <IconPhoto style={{ width: rem(14), height: rem(14) }} />
                }
              >
                View Profile
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                disabled
                leftSection={
                  <IconArrowsLeftRight
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Transfer Data
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => handleDeleteUser(row.id.toString())}
            disabled={isLoading}
          >
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table.ScrollContainer minWidth={800}>
        <TextInput
          placeholder="Search by name or email"
          mb="md"
          rightSection={<IconSearch size="0.9rem" stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === filteredData.length}
                  indeterminate={
                    selection.length > 0 &&
                    selection.length !== filteredData.length
                  }
                />
              </Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Student Since</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>
                <Menu position="bottom-end" shadow="md" width={200}>
                  <Menu.Target>
                    <div>
                      {selection.length > 0 && (
                        <ActionIcon
                          color="gray"
                          variant="filled"
                          onClick={() => {
                            console.log('Maximize action for selected users');
                          }}
                          title="Maximize selection"
                        >
                          <IconSettings
                            style={{ width: rem(22), height: rem(24) }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      )}
                    </div>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item
                      disabled
                      leftSection={
                        <IconSettings
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Send all message
                    </Menu.Item>
                    <Menu.Item
                      disabled
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      color="red"
                    >
                      Delete Selected
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {selection.length > 0 && (
        <Button
          variant="outline"
          onClick={() => {
            console.log('Action for selected users');
          }}
          mt="md"
        >
          Action for Selected Users
        </Button>
      )}
      <MobileManageUserModal />
    </>
  );
};

function filterData(data: User[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(item).some((key) =>
      item[key]?.toString().toLowerCase().includes(query),
    ),
  );
}

export default StudentManagementTable;
