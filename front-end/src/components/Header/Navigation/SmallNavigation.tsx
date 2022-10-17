import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserDispatch, useUserState } from "../../../context/UserContext";
import { useEffect } from "react";
import { Logout, Home, User, Login, Pencil } from "tabler-icons-react";
import { Menu, Group, Header, Burger } from "@mantine/core";
import { useStyles } from "./Navigation.styles";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import LogoImage from "../../../images/Logo";

const SmallNavigation: React.FC = () => {
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

  const [opened, setOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";

  const handleClick = () => {
    setOpened((openedBurger) => !openedBurger);
    setMenuOpened((openedMenu) => !openedMenu);
  };

  return (
    <Header height={90} p="md" className={classes.headerRoot}>
      <Group position="right">
        <LogoImage width={150} height={150} className={classes.logo} />
        {userIsLoggedInLocal ? (
          <Menu shadow="md" width={200} opened={opened} withArrow>
            <Menu.Target>
              <Burger opened={opened} onClick={handleClick} title={title} />
            </Menu.Target>

            <Menu.Dropdown className={classes.menuDropDown}>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item>Settings</Menu.Item>
              <Menu.Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item>Transfer my data</Menu.Item>,
              <Menu.Item color="red">Delete my account</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Menu shadow="md" width={200} opened={opened} withArrow>
            <Menu.Target>
              <Burger opened={opened} onClick={handleClick} title={title} />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item>Settings</Menu.Item>
              <Menu.Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item>Transfer my data</Menu.Item>,
              <Menu.Item color="red">Delete my account</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Header>
  );
};
export default SmallNavigation;
