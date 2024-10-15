import React, { useState } from 'react';
import {
  Avatar,
  Grid,
  Card,
  Text,
  TextInput,
  ScrollArea,
  Anchor,
  Button,
} from '@mantine/core';
import { IconPencil, IconSearch } from '@tabler/icons-react';
import { keys } from '@mantine/utils';
import { User } from '../../../../Model/UserModels';
import { getRandomColor } from '../../../../utils/utils';
import { useUserState } from '../../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export function StudentManagementCards() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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
        sx={{ maxWidth: '20rem', margin: 'auto' }}
      >
        <Card.Section>
          <Avatar
          variant='filled'
            size={120}
            src={row.picture}
            radius={120}
            color={getRandomColor()}
            mx="auto"
            mt="sm"
            key={row.username}
            name={row.username}
          />
        </Card.Section>
        <Text mt="md" size="lg" ta="center">
          <Anchor
            onClick={() => {
              navigate(`/profile/${row.username}`);
            }}
          >
            {row.username}
          </Anchor>
        </Text>
        <Text size="sm" ta="center">
          <a href={`mailto:${row.email}`}>{row.email}</a>
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          Student since {row.createdAt}
        </Text>
        <Button
          variant="outline"
          fullWidth
          mt="md"
          leftSection={<IconPencil size="1.5rem" stroke={2} />}
        >
          Manage User
        </Button>
      </Card>
    </Grid.Col>
  ));

  return (
    <ScrollArea
      h={'88vh'}
      offsetScrollbars={false}
      styles={{
        scrollbar: {
          display: 'none',
        },
      }}
    >
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
