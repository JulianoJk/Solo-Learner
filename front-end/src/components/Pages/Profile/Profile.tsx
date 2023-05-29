import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUserState } from '../../../context/UserContext';
import { IUserInfoContext } from '../../../Model/UserModels';
import { profileAPI } from '../../api/api';

import { UserInfoIcons } from './UserInfo.component';
import InstructorProfileCard from '../instructorProfileCard/InstructorProfileCard.component';
import { Box, Loader, Stack, Title } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import ServerError from '../Error/serverError/ServerError.component';

const Profile: React.FC = () => {
  const { user } = useUserState();

  const {
    data: userProfileData,
    isLoading,
    isError,
  } = useQuery(
    ['getProfileItems', user.token],
    async () => {
      if (user.token) {
        const data: IUserInfoContext | undefined = await profileAPI(user.token);
        return data;
      }
      throw new Error('No token found');
    },
    {
      enabled: !!user.token,
      refetchOnWindowFocus: true,
    },
  );

  if (isError || !userProfileData || userProfileData.status !== 'success') {
    return (
      <ServerError errorTitle={'Error loading profile...'} errorCode={401} />
    );
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
    <div>
      {isLoading ? (
        <Stack align="center">
          <div>
            <Loader color="teal" size={400} />
          </div>
          <Title>Loading...</Title>
        </Stack>
      ) : (
        <>
          <UserInfoIcons {...data}></UserInfoIcons>
          <Box sx={{ border: '2px solid white', width: '17rem', margin: 10 }}>
            <Title order={3}>Your Amazing Instructor &#10024;</Title>
            <InstructorProfileCard
              avatar={instructionData.avatar}
              name={instructionData.name}
              email={instructionData.email}
              job={instructionData.job}
            />
          </Box>
        </>
      )}
    </div>
  );
};
export default Profile;
