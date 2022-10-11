import { useUserState } from "../../../context/UserContext";
import Login from "../../Auth/Login/Login";
import PageNotFound from "../pageNotFound/PageNotFound";

const Profile: React.FC = () => {
  const { user } = useUserState();
  let userIsLoggedInLocal = localStorage.getItem("user");

  if (userIsLoggedInLocal) {
    return (
      <div>
        <h1> Welcome Back {user.username}! </h1>
      </div>
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
