import React from 'react';
import { useUserState } from '../../../context/UserContext';
import { UserInfoIcons } from './UserInfo.component';
import { Box, Loader, Stack, Title } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import NotFound from '../Error/pageNotFound/NotFound.component';
import { useGetProfile } from '../../hooks/useGetProfile';
import { useParams } from 'react-router-dom';
import InstructorProfileCard from '../instructorProfileCard/InstructorProfileCard.component';
const Profile: React.FC = () => {
  const { user } = useUserState();
  const { username: UsernameFromPath } = useParams<{ username: string }>();
  const {
    data: userProfileData,
    isLoading,
    isError,
    isFetched,
  } = useGetProfile(UsernameFromPath as string, user.token);
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
  const displayUsername = userProfileData?.user.username;
  const displayDateJoined = userProfileData?.user.createdAt;
  const userRole = userProfileData?.user.isTeacher ? 'Teacher' : 'Student';

  const data = {
    picture: userProfileData?.user.picture ?? '',
    role: userRole,
    userName: upperFirst(displayUsername as string),
    displayDateJoined: displayDateJoined,
  };
  const instructionData = {
    picture: '',
    name: 'Jane Fingerlicker',
    email: 'randomEmail@me.io',
    job: 'Art director',
  };
  const hasTeacher = userProfileData?.user.isTeacher;

  return (
    <>
      <UserInfoIcons {...data} />
      {hasTeacher ? (
        <Box sx={{ border: '2px solid white', width: '17rem', margin: 10 }}>
          <Title order={4} align="center">
            Your Amazing Instructor &#10024;
          </Title>
          <InstructorProfileCard
            picture={instructionData.picture}
            name={instructionData.name}
            email={instructionData.email}
            job={instructionData.job}
          />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};
export default Profile;
