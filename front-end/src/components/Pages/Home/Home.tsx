/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

import Grammar from '../LearningUnits/Grammar/Grammar';
import Theory from '../LearningUnits/Theory/Theory';
import Vocabulary from '../LearningUnits/Vocabulary/Vocabulary';
import { useStyles } from './Home.styles';
import { DemoHome } from './DemoHome';
import { useUserState } from '../../../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { authenticateAPI } from '../../api/api';
import NotFound from '../Error/pageNotFound/NotFound.component';
import { Button, Loader, Stack, Title } from '@mantine/core';

const Home: React.FC = () => {
  const { classes } = useStyles();
  const { user } = useUserState();

  const {
    data: userStatus,
    isLoading,
    isError,
    isFetched,
  } = useQuery(['authenticateUser', user.token], async () => {
    if (user.token) {
      const data = await authenticateAPI(user.token);
      return data;
    }
    throw new Error('No token found');
  });

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
    (isError || !userStatus || userStatus.status !== 'success')
  ) {
    return <NotFound navigationPath={'/'} />;
  }

  return (
    <>
      {isLoading ? (
        <Stack align="center">
          <Loader color="teal" size={400} />

          <Title>Loading...</Title>
        </Stack>
      ) : (
        <DemoHome />
      )}
    </>
  );
};

export default Home;

{
  /*   
  return (
    <>
      {isLoading ? (
        <Stack align="center">
          <Loader color="teal" size={400} />

          <Title>Loading...</Title>
        </Stack>
      ) : (
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
      )}
    </>
  );
};
export default Profile; */
}
