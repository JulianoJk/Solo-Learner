import { useQuery } from '@tanstack/react-query';
import { useUserState } from '../../../context/UserContext';
import { IUserInfoContext } from '../../../Model/models';
import { profileAPI, profileImageAPI } from '../../api/api';
import Login from '../../Auth/Login/Login';
import PageNotFound from '../pageNotFound/PageNotFound';

import { Avatar, Loader, Stack, Text, Title } from '@mantine/core';
import { useStyles } from './Profile.styles';
import { isUndefinedOrNullString } from '../../../lib/dist';
import DeleteAccount from '../Settings/DeleteAccount/DeleteAccount';
import { useEffect, useState } from 'react';
import { useAccountSettingsState } from '../../../context/AccountSettingsContext';

const Profile: React.FC = () => {
  const { user } = useUserState();
  let userIsLoggedInLocal: any = localStorage.getItem('user');
  const { profileImage } = useAccountSettingsState();

  const { classes } = useStyles();
  const [userProfileImage, setUserProfileImage] = useState('');
  const hasToken = !isUndefinedOrNullString(user.token)
    ? user.token
    : undefined;
  const { isLoading, data: userProfileData } = useQuery(
    ['getProfileItems', hasToken],
    async () => {
      if (hasToken) {
        const data: IUserInfoContext | undefined = await profileAPI(hasToken);
        return data;
      }
    },
    {
      // Fetch when token available
      enabled: !!user.token,
      staleTime: Infinity,
    }
  );
  var b;
  useEffect(() => {
    setUserProfileImage(profileImage);
    if (user.id !== undefined) {
      b = profileImageAPI(user.id);
    }
  });
  if (userIsLoggedInLocal) {
    return (
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
      <div>
        <Avatar
          className={classes.profileImage}
          radius={200}
          size={300}
          color={'cyan'}
          variant="filled"
          alt="profile-image"
          src={
            !isUndefinedOrNullString(userProfileImage) ? userProfileImage : ''
          }
        />
        <h1> Welcome Back: {user.username}!</h1>
        <h2>Date joined:{userProfileData}</h2>
        <img src={b} />
      </div>
    );
  } else {
    return (
      <div>
        <PageNotFound
          navText="No Account found. To proceed, you must be logged-in!"
          navigationPath={'/login'}
          btnText="Login"
        />
      </div>
    );
  }
};
export default Profile;
