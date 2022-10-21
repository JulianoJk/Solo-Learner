import { useQuery } from "@tanstack/react-query";
import { useUserState } from "../../../context/UserContext";
import { IUserInfoContext } from "../../../Model/models";
import { profileAPI } from "../../api/api";
import Login from "../../Auth/Login/Login";
import PageNotFound from "../pageNotFound/PageNotFound";
import { Button, Center, Image, Loader } from "@mantine/core";
import { useStyles } from "./Profile.styles";
import { isUndefinedOrNullString } from "../../../lib/dist";
import Demo from "../Settings/DeleteAccount/Demo";
import DeleteAccount from "../Settings/DeleteAccount/DeleteAccount";
interface IUserLocalStorage {}
const Profile: React.FC = () => {
  const { user } = useUserState();
  let userIsLoggedInLocal: any = localStorage.getItem("user");
  // console.log(userIsLoggedInLocal);
  console.log(user.token);

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
          <>
            <Image
              src={
                "data:image/jpeg;base64,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"
              }
              style={{ margin: 30, borderRadius: "50%" }}
              radius={1000}
              width={300}
              height={350}
            ></Image>
            <Center>
              <h1> Welcome Back: {user.username}! </h1>
              <h2>Date joined:{userProfileData}</h2>
              <DeleteAccount></DeleteAccount>
            </Center>
          </>
        )}
        {/* <div>
          <h1> Welcome Back: {user.username}! </h1>
          <h2>
            Date joined:
            {isLoading ? <Loader variant="dots" /> : userProfileData}
          </h2>
          <DeleteAccount></DeleteAccount>
        </div> */}
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
