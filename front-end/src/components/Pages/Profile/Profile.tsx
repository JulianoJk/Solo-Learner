import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUserState } from '../../../context/UserContext';
import { IUserInfoContext } from '../../../Model/UserModels';
import { profileAPI } from '../../api/api';
import { Avatar } from '@mantine/core';
import { isUndefinedOrNullString } from '../../../lib/dist';

const Profile: React.FC = () => {
  const { user } = useUserState();
  const hasToken = !isUndefinedOrNullString(user.token) ? user.token : ' ';
  const { data: userProfileData } = useQuery(
    ['getProfileItems', hasToken],
    async () => {
      if (hasToken) {
        const data: IUserInfoContext | undefined = await profileAPI(hasToken);
        return data;
      }
    },
    {
      enabled: true,
      refetchOnWindowFocus: true,
    },
  );
  const displayUsername = isUndefinedOrNullString(userProfileData?.username)
    ? user.username
    : userProfileData?.username;
  const displayDateJoined = isUndefinedOrNullString(
    userProfileData?.createdAt as string,
  )
    ? null
    : userProfileData?.createdAt;

  // var b;
  // useEffect(() => {
  //   if (user.id !== undefined) {
  //     b = profileImageAPI(user.id);
  //   }
  // });

  // <>
  //   {isLoading ? (
  //     <Stack align="center">
  //       <div>
  //         <Loader size={400} />
  //       </div>
  //       <Title>Loading...</Title>
  //     </Stack>
  //   ) : (
  //     <div>
  //       <Avatar
  //         className={classes.profileImage}
  //         radius={200}
  //         size={300}
  //         color={'cyan'}
  //         variant="filled"
  //         alt="profile-image"
  //         src={
  //           !isUndefinedOrNullString(userProfileImage)
  //             ? userProfileImage
  //             : ''
  //         }
  //       />
  //       <h1> Welcome Back: {user.username}!</h1>
  //       <h2>Date joined:{userProfileData}</h2>
  //     </div>
  //   )}
  // </>

  return (
    <div>
      <Avatar radius="xl" color="indigo" />
      {/* <Avatar radius="xl" color="indigo" src={
        !isUndefinedOrNullString(userProfileImage) ? userProfileImage : ""
      } /> */}
      <h1> Welcome Back: {displayUsername}!</h1>
      {displayDateJoined === null ? (
        <></>
      ) : (
        <h2>Date joined:{displayDateJoined}</h2>
      )}
      {/* <img src={b} /> */}
    </div>
  );
};
export default Profile;
