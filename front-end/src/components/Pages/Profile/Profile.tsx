import { useQuery } from "@tanstack/react-query";
import { useUserState } from "../../../context/UserContext";
import { IUserInfoContext } from "../../../Model/models";
import { profileAPI } from "../../api/api";
import Login from "../../Auth/Login/Login";
import PageNotFound from "../pageNotFound/PageNotFound";
import { Loader } from "@mantine/core";
import { useStyles } from "./Profile.styles";
const Profile: React.FC = () => {
  const { user } = useUserState();
  let userIsLoggedInLocal = localStorage.getItem("user");
  const { classes } = useStyles();
  const {
    error,
    isLoading,
    status,
    data: userProfileData,
  } = useQuery(
    ["getProfileItems", user.token],
    async () => {
      const data: IUserInfoContext | undefined = await profileAPI(user.token);
      console.log(data);
      return data;
    },
    {
      // Fetch when token available
      enabled: !!user.token,
      staleTime: Infinity,
    }
  );

  if (status === "success") {
    console.log("success!");
    console.log(userProfileData);
  }
  if (isLoading) {
    console.log("loading");
  }
  if (error) {
    console.log(error);
  }
  if (userIsLoggedInLocal) {
    return (
      <>
        {isLoading ? (
          <div className={classes.loader}>
            <Loader size={400} />
          </div>
        ) : (
          <div>
            <h1> Welcome Back {user.username}! </h1>
            <h2> Date joined: {userProfileData?.dateJoined}! </h2>
          </div>
        )}
      </>
    );
  } else {
    return (
      <div>
        <PageNotFound
          navText="No Account found. To proceed, you must be logged-in!"
          navigationPath={<Login />}
          btnText="Login"
        />
      </div>
    );
  }
};
export default Profile;
