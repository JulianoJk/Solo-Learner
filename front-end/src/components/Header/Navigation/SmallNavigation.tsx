import { useUserDispatch } from "../../../context/UserContext";
import { Menu, Group, Header, Burger, Center, Anchor } from "@mantine/core";
import { useStyles } from "./Navigation.styles";
import { useState } from "react";
import LogoImage from "../../../images/Logo";
import { useLocation, useNavigate } from "react-router-dom";
import { useClickOutside } from "@mantine/hooks";
import { useEffect } from "react";
import { Home } from "tabler-icons-react";
import { useDocumentTitle } from "@mantine/hooks";
import { capitalString, isUserLoggedIn } from "../../../lib/dist";

const SmallNavigation: React.FC = () => {
  const navigate = useNavigate();

  let userIsLoggedInLocal = localStorage.getItem("user");

  const { classes } = useStyles();
  const userDispatch = useUserDispatch();

  const [documentTitle, setDocumentTitle] = useState("");
  useDocumentTitle(documentTitle);
  const { pathname } = useLocation();

  const [opened, setOpened] = useState(false);

  const ref = useClickOutside(() => setOpened(false));

  const title = opened ? "Close navigation" : "Open navigation";

  const handleClick = () => {
    setOpened((openedBurger) => !openedBurger);
  };

  const logOut = () => {
    userDispatch({ type: "RESET_STATE" });
    navigate("/");
  };
  useEffect(() => {
    const titles = capitalString(pathname.replace("/", ""));
    if (pathname !== "/") {
      setDocumentTitle(titles + " - Solo Learner");
    } else {
      setDocumentTitle("Solo Learner");
    }
  }, [pathname]);
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
        {userIsLoggedInLocal ? (
          <Menu
            shadow="md"
            width={200}
            opened={opened}
            withArrow
            closeOnClickOutside={true}
            closeOnEscape={true}
            closeOnItemClick={true}
          >
            <Menu.Target>
              <Burger
                opened={opened}
                onClick={handleClick}
                title={title}
                ref={ref}
              />
            </Menu.Target>

            <Menu.Dropdown className={classes.menuDropDown}>
              <Menu.Item
                onClick={() => {
                  navigate("/home");
                }}
                className={classes.menuItems}
              >
                <Center>
                  <Home size={16} /> HOME
                </Center>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                onClick={() => {
                  navigate("/profile");
                }}
                className={classes.menuItems}
              >
                <Center>PROFILE</Center>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color={"indigo"}
                onClick={() => {
                  navigate("/settings");
                }}
                className={classes.menuItems}
              >
                <Center>Settings</Center>
              </Menu.Item>
              <Menu.Divider />

              <Menu.Item onClick={logOut} className={classes.menuItems}>
                <Center>LOG OUT</Center>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Menu
            shadow="md"
            width={200}
            opened={opened}
            withArrow
            closeOnClickOutside={true}
            closeOnEscape={true}
            closeOnItemClick={true}
          >
            <Menu.Target>
              <Burger
                opened={opened}
                onClick={handleClick}
                title={title}
                ref={ref}
              />
            </Menu.Target>

            <Menu.Dropdown className={classes.menuDropDown}>
              <Menu.Item
                onClick={() => {
                  navigate("/");
                }}
                className={classes.menuItems}
              >
                <Center>INDEX</Center>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                onClick={() => {
                  navigate("/login");
                }}
                className={classes.menuItems}
              >
                <Center>LOGIN</Center>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                onClick={() => {
                  navigate("/register");
                }}
                className={classes.menuItems}
              >
                <Center>REGISTER</Center>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Header>
  );
};
export default SmallNavigation;
