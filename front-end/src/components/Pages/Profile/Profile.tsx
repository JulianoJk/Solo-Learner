import { useQuery } from "@tanstack/react-query";
import { useUserState } from "../../../context/UserContext";
import { IUserInfoContext } from "../../../Model/models";
import { profileAPI } from "../../api/api";
import Login from "../../Auth/Login/Login";
import PageNotFound from "../pageNotFound/PageNotFound";
import { Button, Loader } from "@mantine/core";
import { useStyles } from "./Profile.styles";
import { isUndefinedOrNullString } from "../../../lib/dist";
import Demo from "../Settings/DeleteAccount/Demo";
import DeleteAccount from "../Settings/DeleteAccount/DeleteAccount";
const Profile: React.FC = () => {
  const { user } = useUserState();
  let userIsLoggedInLocal = localStorage.getItem("user");
  const { classes } = useStyles();
  const hasID = !isUndefinedOrNullString(user.id) ? user.id : undefined;
  const { isLoading, data: userProfileData } = useQuery(
    ["getProfileItems", hasID],
    async () => {
      if (hasID) {
        const data: IUserInfoContext | undefined = await profileAPI(hasID);
        return data;
      }
    },
    {
      // Fetch when token available
      enabled: !!user.id,
      staleTime: Infinity,
    }
  );

  if (userIsLoggedInLocal) {
    return (
      <>
        {/* {isLoading ? (
          <div className={classes.loader}>
            <Loader size={400} />
          </div>
        ) : (
          <div>
            <h1> Welcome Back: {user.username}! </h1>
            <h2> Date joined: {userProfileData}! </h2>
            // <DeleteAccount></DeleteAccount>
          </div>
        )} */}
        <div>
          <h1> Welcome Back: {user.username}! </h1>
          <h2>
            Date joined:
            {isLoading ? <Loader variant="dots" /> : userProfileData}
          </h2>
          <DeleteAccount></DeleteAccount>
        </div>
      </>
    );
  } else {
    return (
      // <div>
      //   <PageNotFound
      //     navText="No Account found. To proceed, you must be logged-in!"
      //     navigationPath={<Login />}
      //     btnText="Login"
      //   />
      // </div>
      <h1>{userProfileData}</h1>
    );
  }
};
export default Profile;
