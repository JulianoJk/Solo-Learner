import { useUserDispatch } from "../../../context/UserContext";
import { Menu, Group, Header, Burger, Center, Text } from "@mantine/core";
import { useStyles } from "./Navigation.styles";
import { useState } from "react";
import LogoImage from "../../../images/Logo";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "@mantine/hooks";
import { useEffect } from "react";
import { Home } from "tabler-icons-react";
import { useAccountSettingsDispatch } from "../../../context/AccountSettingsContext";
import {
  isUserLoggedIn,
  saveProfileImageAfterReload,
  saveUserAfterReload,
} from "../../../lib/dist";
import { IconSettings, IconTrash, IconUser } from "@tabler/icons";
import TokenExpirationChecker from "../../expireSession/TokenExpirationChecker";

const SmallNavigation: React.FC = () => {
  const navigate = useNavigate();
  const accountSettingsDispatch = useAccountSettingsDispatch();

  let userIsLoggedInLocal = localStorage.getItem("user");

  const { classes } = useStyles();
  const userDispatch = useUserDispatch();

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
    saveUserAfterReload(userDispatch);
    saveProfileImageAfterReload(accountSettingsDispatch);
  }, []);

  return (
    <Header height={90} p="md" className={classes.headerRoot}>
      <Group position="right">
        <LogoImage width={150} height={150} className={classes.logo} />
        {isUserLoggedIn() ? (
          <>
            <TokenExpirationChecker />
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
                    <Home size={16} fontWeight={700} />
                    <Text weight={700} sx={{ paddingLeft: 5 }}>
                      HOME
                    </Text>
                  </Center>
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item
                  color="indigo"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <Center>
                    <IconUser size={16} fontWeight={700} />
                    <Text weight={700} sx={{ paddingLeft: 5 }}>
                      Profile
                    </Text>
                  </Center>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => navigate("/settings")}>
                  <Center>
                    <IconSettings size={16} fontWeight={700} />
                    <Text weight={700} sx={{ paddingLeft: 5 }}>
                      Settings
                    </Text>
                  </Center>
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item
                  color="red"
                  className={classes.menuItems}
                  onClick={() => {
                    logOut();
                    navigate("/");
                  }}
                >
                  <Center>
                    <IconTrash size={16} fontWeight={700} />
                    <Text weight={700} sx={{ paddingLeft: 5 }}>
                      Sign-Out
                    </Text>
                  </Center>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
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
