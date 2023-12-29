// UserRow.jsx
import React from 'react';
import {
  Group,
  Avatar,
  Indicator,
  Tooltip,
  Anchor,
  Text,
  Badge,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';

import { IconPencil, IconTrash } from '@tabler/icons-react';
import { CopyButtonComponent } from '../../../CopyButton/CopyButton.component';
import { getJob, roleColors } from '../../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../Model/UserModels';

interface UserRowProps {
  user: User; // Replace YourUserType with the actual type of your user object
  hoveredUserId: number | null;
  hoveredUsername: boolean;
  hoveredEmail: boolean;
  handleUserHover: (
    userId: number | null,
    isUsername: boolean,
    isEmail: boolean,
  ) => void;
  handleEditButton: () => void;
  handleDeleteUser: (user: User) => void; // Replace YourUserType with the actual type of your user object
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  hoveredUserId,
  hoveredUsername,
  hoveredEmail,
  handleUserHover,
  handleEditButton,
  handleDeleteUser,
}) => {
  const { colorScheme } = useMantineColorScheme();
  // const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <tr
      key={user.username}
      onMouseEnter={() => handleUserHover(user.id, true, false)}
      onMouseLeave={() => handleUserHover(null, false, false)}
    >
      <td>
        <Group gap="sm">
          <Tooltip
            label={user.isUserLoggedIn ? 'Online' : 'Offline'}
            color="gray"
            position="right-end"
            withArrow
            arrowSize={10}
          >
            <Indicator
              inline
              size={12}
              offset={5}
              position="bottom-end"
              color={user.isUserLoggedIn ? 'green' : 'rgba(92, 92, 92, 0.79)'}
              withBorder
            >
              <Avatar size={30} src={user.picture} radius={30} />
            </Indicator>
          </Tooltip>

          <Group>
            <Anchor
              component="button"
              size="sm"
              onClick={() => {
                navigate(`/profile/${user.username}`);
              }}
            >
              {user.username}
            </Anchor>
            <CopyButtonComponent
              value={user.username}
              isHovered={hoveredUsername && hoveredUserId === user.id}
            />
          </Group>
        </Group>
      </td>

      <td>
        <Badge
          color={roleColors[getJob(user.isAdmin, user.isTeacher)]}
          variant={colorScheme === 'dark' ? 'light' : 'filled'}
        >
          {getJob(user.isAdmin, user.isTeacher)}
        </Badge>
      </td>

      <td>
        <Group
          onMouseEnter={() => handleUserHover(user.id, false, true)}
          onMouseLeave={() => handleUserHover(null, false, false)}
        >
          <Anchor
            component="button"
            size="sm"
            onClick={() => {
              navigate(`/profile/${user.username}`);
            }}
          >
            {user.email}
          </Anchor>
          <CopyButtonComponent
            value={user.email}
            isHovered={hoveredEmail && hoveredUserId === user.id}
          />
        </Group>
      </td>

      <td>
        <Text fz="sm" c={colorScheme === 'dark' ? 'dimmed' : ''}>
          {user.formattedLastActive}
        </Text>
      </td>
      <td>
        <Group gap={0} justify="flex-end">
          <ActionIcon onClick={handleEditButton}>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon onClick={() => handleDeleteUser(user)}>
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );
};

export default UserRow;
