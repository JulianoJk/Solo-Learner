import React, { useState } from 'react';
import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  ScrollArea,
  TextInput,
} from '@mantine/core';
import {
  IconDots,
  IconMessages,
  IconNote,
  IconPencil,
  IconReportAnalytics,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import { keys } from '@mantine/utils';
import { User } from '../../../../Model/UserModels';
import { getRandomColor } from '../../../../utils/utils';
import { useUserState } from '../../../../context/UserContext';

export function StudentmanagmentTable() {
  const [search, setSearch] = useState('');
  const { allUsersAdminDashboard } = useUserState();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const filteredData = filterData(allUsersAdminDashboard, search);

  const rows = filteredData.map((row) => (
    <tr key={row.username}>
      <td>
        <Group gap="sm">
          <Avatar
            size={40}
            src={row.picture}
            radius={40}
            color={getRandomColor()}
          />
          <div>
            <Text fz="sm" fw={500}>
              {row.username}
            </Text>
            <Text c="dimmed" fz="xs">
              {getJob(row.isAdmin, row.isTeacher)}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text fz="sm">
          <a href={`mailto:${row.email}`}>{row.email}</a>
        </Text>
        <Text fz="xs" c="dimmed">
          Email
        </Text>
      </td>
      <td>
        <Text fz="sm">{row.createdAt}</Text>
        <Text fz="xs" c="dimmed">
          Student since
        </Text>
      </td>
      <td>
        <Group gap={0} justify="flex-end">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <Menu
            transitionProps={{ transition: 'pop' }}
            withArrow
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                rightSection={<IconMessages size="1rem" stroke={1.5} />}
              >
                Send message
              </Menu.Item>
              <Menu.Item rightSection={<IconNote size="1rem" stroke={1.5} />}>
                Add note
              </Menu.Item>
              <Menu.Item
                rightSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
              >
                Analytics
              </Menu.Item>
              <Menu.Item
                rightSection={<IconTrash size="1rem" stroke={1.5} />}
                color="red"
              >
                Terminate contract
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea h={'88vh'}>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        rightSection={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        style={{ tableLayout: 'fixed' }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Student since</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

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
