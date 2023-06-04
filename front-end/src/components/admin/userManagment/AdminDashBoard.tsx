/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { User } from '../../../Model/UserModels';

interface UsersTableProps {
  data: User[];
}

const roleColors: Record<string, string> = {
  student: 'blue',
  admin: 'pink',
  teacher: 'cyan',
  'admin/teacher': 'orange',
};

export function UsersTable({ data }: UsersTableProps) {
  const theme = useMantineTheme();

  const rows = data.map((item) => (
    <tr key={item.username}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {item.username}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          color={roleColors[getJob(item.isAdmin, item.isTeacher)]}
          variant={theme.colorScheme === 'dark' ? 'light' : 'filled'}
        >
          {getJob(item.isAdmin, item.isTeacher)}
        </Badge>
      </td>
      <td>
        <Anchor component="button" size="sm">
          {item.email}
        </Anchor>
      </td>
      <td>
        <Text fz="sm" c={theme.colorScheme === 'dark' ? 'dimmed' : ''}>
          {item.formattedLastActive}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table
        sx={{ minWidth: 800 }}
        verticalSpacing="sm"
        striped={theme.colorScheme === 'dark' ? true : false}
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <thead>
          <tr>
            <th>Employee</th>
            <th>Job title</th>
            <th>Email</th>
            <th>
              <Text>
                Last active <br />
                <Text sx={{ fontSize: 7.5, paddingTop: 2 }}>
                  (YY-MM-DD HH-MM)
                </Text>
              </Text>
            </th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
function getJob(isAdmin: boolean, isTeacher: boolean) {
  if (isAdmin && isTeacher) {
    return 'admin/teacher';
  } else if (isAdmin) {
    return 'admin';
  } else if (isTeacher) {
    return 'teacher';
  } else {
    return 'student';
  }
}
