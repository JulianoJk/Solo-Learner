import React from 'react';
import { Avatar, Text, Button, Paper } from '@mantine/core';
interface InstructorProfileCardProps {
  avatar: string;
  name: string;
  email: string;
  job: string;
}

const InstructorProfileCard: React.FC<InstructorProfileCardProps> = (props) => {
  const { avatar, name, email, job } = props;
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx="auto" color="pink" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {email} • {job}
      </Text>

      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
};
export default InstructorProfileCard;
