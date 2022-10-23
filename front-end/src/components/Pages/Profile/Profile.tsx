import { useQuery } from "@tanstack/react-query";
import { useUserState } from "../../../context/UserContext";
import { IUserInfoContext } from "../../../Model/models";
import { profileAPI } from "../../api/api";
import Login from "../../Auth/Login/Login";
import PageNotFound from "../pageNotFound/PageNotFound";
import { Avatar, Button, Center, Image, Loader } from "@mantine/core";
import { useStyles } from "./Profile.styles";
import { isUndefinedOrNullString } from "../../../lib/dist";
import DeleteAccount from "../Settings/DeleteAccount/DeleteAccount";
import { useState } from "react";
import UploadProfileComponent from "../Settings/profileImageSettings/UploadProfile.component";

const Profile: React.FC = () => {
  const { user } = useUserState();
  let userIsLoggedInLocal: any = localStorage.getItem("user");

  const { classes } = useStyles();
  const hasToken = !isUndefinedOrNullString(user.token)
    ? user.token
    : undefined;
  const { isLoading, data: userProfileData } = useQuery(
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

  if (userIsLoggedInLocal) {
    return (
      <>
        {isLoading ? (
          <div className={classes.loader}>
            <Loader size={400} />
          </div>
        ) : (
          <div>
            {/* {image ? } */}
            <Avatar
              className={classes.profileImage}
              radius={200}
              size={300}
              color={"cyan"}
              variant="filled"
              alt="profile-image"
            />
            <h1> Welcome Back: {user.username}!</h1>
            <h2>Date joined:{userProfileData}</h2>
          </div>
        )}
      </>
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
