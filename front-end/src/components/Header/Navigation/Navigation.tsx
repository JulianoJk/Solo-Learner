import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserDispatch, useUserState } from "../../../context/UserContext";
import { useEffect } from "react";
import { Logout, Home, User, Login, Pencil } from "tabler-icons-react";
import { Button, Group, Header } from "@mantine/core";
import { useStyles } from "./Navigation.styles";
const Navigation: React.FC = () => {
  const navigate = useNavigate();
  let userIsLoggedInLocal = localStorage.getItem("user");
  const { classes } = useStyles();
  const userDispatch = useUserDispatch();

  const { user } = useUserState();


  // After logout, clear the context for the user and tasks, then navigate to index
  const logOut = () => {
    userDispatch({ type: "RESET_STATE" });
    userDispatch({ type: "RESET_STATE" });
    navigate("/");
  };

  // Check if is user is logged or not
  if (userIsLoggedInLocal) {
    return (
      <Header height={70} p="md" className={classes.root}>
        <Group position="right" classNames={classes.root}>
          <Button
            component={Link}
            to="/home"
            radius="md"
            size="md"
            leftIcon={<Home size={16} />}
            uppercase
          >
            Home
          </Button>

          <Button
            leftIcon={<User size={16} />}
            radius="md"
            size="md"
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
            size="md"
            uppercase
            component={Link}
            to="/"
            m={1}
            onClick={logOut}
          >
            logOut
          </Button>
        </Group>
      </Header>
    );
  } else {
    return (
      <Header height={70} p="md" className={classes.root}>
        <Group position="right" classNames={classes.root}>
          <Button component={Link} to="/" radius="md" size="md" uppercase>
            Index
          </Button>

          <Button
            leftIcon={<Login size={16} />}
            radius="md"
            size="md"
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
            size="md"
            uppercase
            component={Link}
            to="/register"
            color="green"
            m={1}
          >
            Register
          </Button>
        </Group>
      </Header>
    );
  }
};
export default Navigation;
