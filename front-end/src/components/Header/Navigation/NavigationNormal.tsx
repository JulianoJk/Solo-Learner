import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserDispatch, useUserState } from "../../../context/UserContext";
import { Logout, Home, User, Login, Pencil } from "tabler-icons-react";
import { Button, Group, Header } from "@mantine/core";
import { useStyles } from "./Navigation.styles";
import LogoImage from "../../../images/Logo";

const NavigationNormal: React.FC = () => {
  const navigate = useNavigate();
  let userIsLoggedInLocal = localStorage.getItem("user");
  const { classes } = useStyles();
  const userDispatch = useUserDispatch();

  const { user } = useUserState();

  // After logout, clear the context for the user and tasks, then navigate to index
  const logOut = () => {
    userDispatch({ type: "RESET_STATE" });
    navigate("/");
  };

  return (
    <Header height={90} p="md" className={classes.headerRoot}>
      <Group position="right">
        <LogoImage width={170} height={160} className={classes.logo} />
        {userIsLoggedInLocal ? (
          <>
            <Button
              component={Link}
              to="/home"
              radius="md"
              size="lg"
              leftIcon={<Home size={16} />}
              uppercase
            >
              Home
            </Button>

            <Button
              leftIcon={<User size={16} />}
              radius="md"
              size="lg"
              uppercase
              color="yellow"
              m={1}
              component={Link}
              to="/profile"
            >
              Profile
            </Button>
            <Button
              leftIcon={<Logout size={16} />}
              radius="md"
              color="red"
              size="lg"
              uppercase
              component={Link}
              to="/"
              m={1}
              onClick={logOut}
            >
              logOut
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/" radius="md" size="lg" uppercase>
              Index
            </Button>

            <Button
              leftIcon={<Login size={16} />}
              radius="md"
              size="lg"
              uppercase
              color="green"
              variant="outline"
              m={1}
              component={Link}
              to="/login"
            >
              Log-In
            </Button>
            <Button
              leftIcon={<Pencil size={16} />}
              radius="md"
              size="lg"
              uppercase
              component={Link}
              to="/register"
              color="green"
              m={1}
            >
              Register
            </Button>
          </>
        )}
      </Group>
    </Header>
  );
};
export default NavigationNormal;
