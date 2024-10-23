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

  const StudentmanagmenTable = () => {
    const [search, setSearch] = useState('');
    const { allUsersAdminDashboard } = useUserState();

    const navigate = useNavigate();
    const appDispatch = useAppDispatch();
    const { handleDeleteUser, isLoading } = useDeleteUser();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      setSearch(value);
    };

    const filteredData = filterData(allUsersAdminDashboard, search);

    const rows = filteredData.map((row, index) => (
      <Table.Tr key={index}>
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
              disabled={isLoading} // Disable if deletion is in progress
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
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Student Since</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
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

  export default StudentmanagmenTable;
