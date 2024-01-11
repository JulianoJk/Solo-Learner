import React from 'react';
import {
  Avatar,
  Text,
  Paper,
  Badge,
  useMantineColorScheme,
  ActionIcon,
  Menu,
  rem,
  Anchor,
} from '@mantine/core';
import { User } from '../../../../Model/UserModels';
import { getJob, roleColors } from '../../../../utils/utils';
import { IconAdjustments, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface UserCardActionProps {
  user: User;
  handleDeleteUser: (user: User) => void;
  onSendMessage: () => void;
}

const UserCard: React.FC<UserCardActionProps> = ({
  user,
  handleDeleteUser,
}) => {
  const { username, email, picture } = user;
  const { colorScheme } = useMantineColorScheme();

  const navigate = useNavigate();
  return (
    <>
      <Paper
        radius="md"
        withBorder
        p="lg"
        bg="var(--mantine-color-body)"
        style={{ width: '18rem' }}
      >
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="outline" color="gray">
              <IconAdjustments style={{ width: rem(14), height: rem(14) }} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              color="red"
              onClick={() => handleDeleteUser(user)}
              rightSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Delete my account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Avatar
          src={picture || undefined} // Set src to undefined if picture is null
          size={120}
          mx="auto"
        >
          {picture === null && (
            // Render initials using the first two characters of the username
            <div style={{ fontSize: '60px', fontWeight: 'bold' }}>
              {username.slice(0, 2).toUpperCase()}
            </div>
          )}
        </Avatar>
        <Text ta="center" fz="lg" fw={500} mt="md">
          {/* {username} */}

          <Anchor
            component="button"
            size="sm"
            onClick={() => {
              navigate(`/profile/${username}`);
            }}
          >
            {username}
          </Anchor>
        </Text>
        <div style={{ textAlign: 'center' }}>
          <Text c="dimmed" fz="sm">
            {email} •
          </Text>
          <Badge
            color={roleColors[getJob(user.isAdmin, user.isTeacher)]}
            variant={colorScheme === 'dark' ? 'light' : 'filled'}
          >
            {getJob(user.isAdmin, user.isTeacher)}
          </Badge>
        </div>
        {/* <Button variant="default" fullWidth mt="md" onClick={onSendMessage}>
          Send message
        </Button> */}
      </Paper>
    </>
  );
};

export default UserCard;
// https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png
