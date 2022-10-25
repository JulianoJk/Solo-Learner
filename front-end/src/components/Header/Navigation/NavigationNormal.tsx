import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserDispatch, useUserState } from "../../../context/UserContext";
import {
  Logout,
  Home,
  User,
  Login,
  Pencil,
  Settings,
} from "tabler-icons-react";
import { Button, Group, Header, Avatar, Anchor } from "@mantine/core";
import { useStyles } from "./Navigation.styles";
import LogoImage from "../../../images/Logo";
import {
  capitalString,
  checkIfUserReloads,
  isUserLoggedIn,
} from "../../../lib/dist";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "@mantine/hooks";

const NavigationNormal: React.FC = () => {
  const [documentTitle, setDocumentTitle] = useState("");
  useDocumentTitle(documentTitle);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const titles = capitalString(pathname.replace("/", ""));
    if (pathname !== "/") {
      setDocumentTitle(titles + " - Solo Learner");
    } else {
      setDocumentTitle("Solo Learner");
    }
  }, [pathname]);

  const { classes } = useStyles();
  const userDispatch = useUserDispatch();

  const { user } = useUserState();

  useEffect(() => {
    checkIfUserReloads(userDispatch);
  }, []);

  // After logout, clear the context for the user and tasks, then navigate to index
  const logOut = () => {
    userDispatch({ type: "RESET_STATE" });
    navigate("/");
  };

  const logoNavigation = isUserLoggedIn() ? "/home" : "/";
  return (
    <Header height={90} p="md" className={classes.headerRoot}>
      <Group position="right">
        <Anchor
          onClick={() => {
            navigate(logoNavigation);
          }}
        >
          <LogoImage width={170} height={160} className={classes.logo} />
        </Anchor>

        {isUserLoggedIn() ? (
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
              color="indigo"
              m={1}
              component={Link}
              to="/settings"
            >
              Settings
            </Button>
            <>
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
            </>

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
              color="indigo"
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
