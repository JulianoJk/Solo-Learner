/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ReactSVG } from 'react-svg';

// import { DemoHome } from './DemoHome';
import { useUserState } from '../../../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { authenticateAPI } from '../../api/api';
import NotFound from '../Error/pageNotFound/NotFound.component';
import { Box, Center, Image, Loader, Stack, Title } from '@mantine/core';
import Modules from './DemoHome';
import Forbitten from '../../../images/Forbitten.svg';
const Home: React.FC = () => {
  const { user } = useUserState();
  const {
    data: userStatus,
    isLoading,
    isError,
    isFetched,
  } = useQuery(
    ['authenticateUser', user.token],
    async () => {
      if (user.token) {
        const data = await authenticateAPI(user.token);
        return data;
      }
      throw new Error('No token found');
    },
    {
      enabled: !!user.token.trim(),
    },
  );

  if (
    isFetched &&
    (isError || !userStatus || userStatus.status !== 'success')
  ) {
    return <NotFound navigationPath={'/'} />;
  }

  return <Modules isLoading={isLoading} />;
};

export default Home;

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
          <Box style={{ border: '2px solid white', width: '17rem', margin: 10 }}>
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
