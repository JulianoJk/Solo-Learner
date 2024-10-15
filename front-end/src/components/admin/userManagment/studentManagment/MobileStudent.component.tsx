import React, { useState } from 'react';
import {
  Avatar,
  Grid,
  Card,
  Text,
  ActionIcon,
  Menu,
  TextInput,
  ScrollArea,
  Group,
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

export function StudentManagementCards() {
  const [search, setSearch] = useState('');
  const { allUsersAdminDashboard } = useUserState();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const filteredData = filterData(allUsersAdminDashboard, search);

  const cards = filteredData.map((row) => (
    <Grid.Col key={row.username} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        sx={{ maxWidth: '20rem', margin: 'auto' }} // Center cards
      >
        <Card.Section>
          <Avatar
            size={120}
            src={row.picture}
            radius={120}
            color={getRandomColor()}
            mx="auto"
          />
        </Card.Section>
        <Text mt="md" size="lg">
          {row.username}
        </Text>
        <Text size="sm">
          <a href={`mailto:${row.email}`}>{row.email}</a>
        </Text>
        <Text size="sm" color="dimmed">
          Student since {row.createdAt}
        </Text>
        <Group mt="md">
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
      </Card>
    </Grid.Col>
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
      <Grid gutter="md">{cards}</Grid>
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
