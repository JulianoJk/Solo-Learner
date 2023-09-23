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
  Menu,
  rem,
} from '@mantine/core';
import {
  IconDots,
  IconMessages,
  IconMoodSad,
  IconNote,
  IconPencil,
  IconReportAnalytics,
  IconTrash,
} from '@tabler/icons-react';
import {
  IApiError,
  IApiMessageResponse,
  User,
} from '../../../Model/UserModels';
import { useNavigate } from 'react-router-dom';

import { modals } from '@mantine/modals';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../../context/AppContext';
import { notificationAlert } from '../../notifications/NotificationAlert';
import { adminDeleteUserAccount } from '../../api/api';
import { useUserState } from '../../../context/UserContext';

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
  const navigate = useNavigate();
  const { user: AdminUser } = useUserState();
  const appDispatch = useAppDispatch();
  const handleEditButton = () => {
    // TODO!: Add edit user modal
    console.log('user.id');
  };
  const { mutate: deleteAccount } = useMutation(adminDeleteUserAccount, {
    onSuccess: (data: IApiMessageResponse | IApiError) => {
      if (typeof data === 'object' && 'error' in data) {
        // handle the error case
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
        });
      } else {
        notificationAlert({
          title: 'Account Deleted.',
          message: data.message,
          iconColor: 'red',
          closeAfter: 5000,
          icon: <IconMoodSad color="yellow" size={18} />,
        });
        window.location.reload();
      }
    },
  });

  const handleDeleteUser = (user: User) => {
    modals.openConfirmModal({
      title: 'You are about to delete a user',

      children: (
        <Text size="lg">
          {`Are you sure you want to delete `}
          <i>
            <b style={{ textDecoration: 'underline' }}>{user.username}</b>
          </i>
          {`? This action is irreversible`}
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        const requestData = {
          token: AdminUser.token,
          Id: user.id,
        };

        deleteAccount(requestData);
      },
      closeOnCancel: true,
      closeOnConfirm: true,
      confirmProps: { color: 'red' },
    });
  };

  const rows = data.map((item) => (
    <tr key={item.username}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Anchor
            component="button"
            size="sm"
            onClick={() => {
              navigate(`/profile/${item.username}`);
            }}
          >
            {item.username}
          </Anchor>
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
          <ActionIcon onClick={handleEditButton}>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <Menu
            transitionProps={{ transition: 'pop' }}
            withArrow
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                disabled
                icon={
                  <IconMessages
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Send message
              </Menu.Item>
              <Menu.Item
                disabled
                icon={
                  <IconNote
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Add note
              </Menu.Item>
              <Menu.Item
                disabled
                icon={
                  <IconReportAnalytics
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Analytics
              </Menu.Item>
              <Menu.Item
                onClick={() => handleDeleteUser(item)}
                icon={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                color="red"
              >
                Delete user
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
