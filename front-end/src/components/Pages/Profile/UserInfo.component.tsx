import { Avatar, Text, Group } from '@mantine/core';
import { IconCalendarHeart } from '@tabler/icons-react';
import classes from './Profile.module.css';
import React from 'react';
interface UserInfoIconsProps {
  picture: string;
  userName: string;
  role: string;
  displayDateJoined: string | Date | null | undefined;
}

export function UserInfoIcons({
  picture,
  userName,
  role,
  displayDateJoined,
}: UserInfoIconsProps) {
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src={picture} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {role}
          </Text>

          <Text fz="xl" className={classes.name}>
            {userName}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconCalendarHeart
              stroke={1.5}
              size="1rem"
              className={classes.icon}
            />
            <Text fz="sm" fw={500} className={classes.description}>
              Member since: {displayDateJoined}!
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
