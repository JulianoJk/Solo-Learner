import { useQuery } from "@tanstack/react-query";
import { useUserState } from "../../../context/UserContext";
import { IUserInfoContext } from "../../../Model/UserModels";
import { profileAPI, getProfileImageAPI } from "../../api/api";

import PageNotFound from "../pageNotFound/PageNotFound";

import { Avatar } from "@mantine/core";
import { isUndefinedOrNullString } from "../../../lib/dist";

import { useEffect } from "react";

const Profile: React.FC = () => {
  const { user } = useUserState();
  let userIsLoggedInLocal: any = localStorage.getItem("user");
  const hasToken = !isUndefinedOrNullString(user.token)
    ? user.token
    : undefined;
  const { data: userProfileData } = useQuery(
    ["getProfileItems", hasToken],
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
  // var b;
  // useEffect(() => {
  //   if (user.id !== undefined) {
  //     b = profileImageAPI(user.id);
  //   }
  // });
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
        <Avatar radius="xl" color="indigo" />
        {/* <Avatar radius="xl" color="indigo" src={
            !isUndefinedOrNullString(userProfileImage) ? userProfileImage : ""
          } /> */}
        <h1> Welcome Back: {user.username}!</h1>
        <h2>Date joined:{userProfileData}</h2>
        {/* <img src={b} /> */}
      </div>
    );
  } else {
    return (
      <div>
        <PageNotFound
          navText="No Account found. To proceed, you must be logged-in!"
          navigationPath={"/login"}
          btnText="Login"
        />
      </div>
    );
  }
};
export default Profile;
