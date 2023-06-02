import React from 'react';
import { useUserState } from '../../../context/UserContext';

import { UserInfoIcons } from './UserInfo.component';
import InstructorProfileCard from '../instructorProfileCard/InstructorProfileCard.component';
import { Box, Loader, Stack, Title } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import NotFound from '../Error/pageNotFound/NotFound.component';
import { useGetProfile } from '../../hooks/useGetProfile';

const Profile: React.FC = () => {
  const { user } = useUserState();
  const {
    data: userProfileData,
    isLoading,
    isError,
    isFetched,
  } = useGetProfile(user.token);

  if (isLoading) {
    return (
      <Stack align="center">
        <Loader color="teal" size={400} />

        <Title>Loading...</Title>
      </Stack>
    );
  }
  if (
    isFetched &&
    (isError || !userProfileData || userProfileData.status !== 'success')
  ) {
    return <NotFound navigationPath={'/'} />;
  }

  const displayUsername = userProfileData?.username || user.username;
  const displayDateJoined = userProfileData?.createdAt;
  const userRole = user.isTeacher ? 'Teacher' : 'Student';

  const data = {
    avatar: '',
    role: userRole,
    userName: upperFirst(displayUsername as string),
    displayDateJoined: displayDateJoined,
  };
  const instructionData = {
    avatar: '',
    name: 'Jane Fingerlicker',
    email: 'randomEmail@me.io',
    job: 'Art director',
  };

  return (
    <>
      <UserInfoIcons {...data}></UserInfoIcons>
      <Box sx={{ border: '2px solid white', width: '17rem', margin: 10 }}>
        <Title order={4} align="center">
          Your Amazing Instructor &#10024;
        </Title>
        <InstructorProfileCard
          avatar={instructionData.avatar}
          name={instructionData.name}
          email={instructionData.email}
          job={instructionData.job}
        />
      </Box>
    </>
  );
};
export default Profile;
