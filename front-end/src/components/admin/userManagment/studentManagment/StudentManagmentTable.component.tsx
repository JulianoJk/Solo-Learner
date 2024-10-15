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
} from '@mantine/core';
import { IconPencil, IconSearch, IconTrash } from '@tabler/icons-react';
import { useUserState } from '../../../../context/UserContext';
import { User } from '../../../../Model/UserModels';
import { keys } from '@mantine/utils';
import { useNavigate } from 'react-router-dom';

const StudentmanagmenTable = () => {
  const [search, setSearch] = useState('');
  const { allUsersAdminDashboard } = useUserState();
  const navigate = useNavigate();
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
          <ActionIcon variant="subtle" color="gray">
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
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

function getJob(isAdmin: boolean, isTeacher: boolean) {
  if (isAdmin && isTeacher) {
    return 'Admin/Teacher';
  } else if (isAdmin) {
    return 'Admin';
  } else if (isTeacher) {
    return 'Teacher';
  } else {
    return 'Student';
  }
}

function getBadgeColor(isAdmin: boolean, isTeacher: boolean) {
  if (isAdmin && isTeacher) {
    return '#311B92'; // Dark Indigo
  } else if (isAdmin) {
    return '#3E2723'; // Dark Brown
  } else if (isTeacher) {
    return '#1B5E20'; // Dark Green
  } else {
    return '#F57C00'; // Dark Amber
  }
}

export default StudentmanagmenTable;
