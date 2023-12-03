import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconCalendarHeart } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[1],
  },
  description: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3] + ' !important'
        : theme.colors.gray[1] + ' !important',
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  avatar: string;
  userName: string;
  role: string;
  displayDateJoined: string | Date | null | undefined;
}

export function UserInfoIcons({
  avatar,
  userName,
  role,
  displayDateJoined,
}: UserInfoIconsProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {role}
          </Text>

          <Text fz="xl" className={classes.name}>
            {userName}
          </Text>

          <Group noWrap spacing={10} mt={3}>
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
