import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUserDispatch } from '../../../context/UserContext';
import {
  IconHome,
  IconUserCircle,
  IconLogin,
  IconPencil,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import {
  Button,
  Group,
  Header,
  Anchor,
  Menu,
  Avatar,
  UnstyledButton,
} from '@mantine/core';
import { useStyles } from './Navigation.styles';
import LogoImage from '../../../images/Logo';
import {
  capitalString,
  isUserLoggedIn,
  saveProfileImageAfterReload,
  checkIfPageIsReload,
} from '../../../utils/utils';
import { useEffect, useState } from 'react';
import {
  useClickOutside,
  useDocumentTitle,
  useMediaQuery,
} from '@mantine/hooks';
import { useAccountSettingsDispatch } from '../../../context/AccountSettingsContext';
import { useAppDispatch } from '../../../context/AppContext';
// import TokenExpirationChecker from '../../expireSession/TokenExpirationChecker';
import ModeThemeButtonSmall from '../../../Styles/ModeThemeButtonSmall';

const NavigationNormal: React.FC = () => {
  const [documentTitle, setDocumentTitle] = useState('');
  const accountSettingsDispatch = useAccountSettingsDispatch();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { classes } = useStyles();
  const appDisp = useAppDispatch();
  const [opened, setOpened] = useState(false);
  const clickedOutsideRef = useClickOutside(() => setOpened(false));

  const isSmallWindow: any = useMediaQuery('(min-width: 650px)');
  useEffect(() => {
    appDisp({ type: 'IS_SMALL_WINDOW', isSmallWindow: isSmallWindow });
  }, [isSmallWindow]);

  useDocumentTitle(documentTitle);
  useEffect(() => {
    const titles = capitalString(pathname.replace('/', ''));
    if (pathname !== '/') {
      setDocumentTitle(titles + ' - Solo Learner');
    } else {
      setDocumentTitle('Solo Learner');
    }
    appDisp({
      type: 'RESET_ERROR_MESSAGE',
    });
  }, [pathname]);

  useEffect(() => {
    // saveUserAfterReload(userDispatch)
    saveProfileImageAfterReload(accountSettingsDispatch);
  }, [checkIfPageIsReload]);

  // After logout, clear the context for the user and tasks, then navigate to index
  const logOut = () => {
    userDispatch({ type: 'RESET_STATE' });
    navigate('/');
  };
  const handleClick = () => {
    setOpened((openedMenuDropdown) => !openedMenuDropdown);
  };

  const logoNavigation = isUserLoggedIn() ? '/home' : '/';
  return (
    <Header height={90} p="md" className={classes.headerRoot}>
      <Group position="right">
        <ModeThemeButtonSmall />

        <Anchor
          onClick={() => {
            navigate(logoNavigation);
          }}
        >
          <LogoImage width={170} height={160} />
        </Anchor>

        {isUserLoggedIn() ? (
          <>
            <Button
              component={Link}
              to="/home"
              radius="md"
              size="lg"
              leftIcon={<IconHome size={16} />}
              uppercase
            >
              Home
            </Button>
            <Button
              leftIcon={<IconUserCircle size={16} />}
              radius="md"
              size="lg"
              uppercase
              color="indigo"
              m={1}
              component={Link}
              to="/profile"
            >
              profile
            </Button>
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
                <UnstyledButton onClick={handleClick}>
                  <Avatar ref={clickedOutsideRef} radius="xl" color="indigo" />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconSettings size={14} />}
                  onClick={() => {
                    appDisp({
                      type: 'SET_USER_SETTINGS_MODAL',
                      isUserSettingsOpen: true,
                    });
                  }}
                >
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={14} />}
                  onClick={() => {
                    logOut();
                    navigate('/');
                  }}
                >
                  SIGN-OUT
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/"
              radius="md"
              size="lg"
              uppercase
              variant="gradient"
            >
              Index
            </Button>

            <Button
              leftIcon={<IconLogin size={16} />}
              radius="md"
              size="lg"
              variant="filled"
              uppercase
              m={1}
              component={Link}
              to="/login"
            >
              Sign-in
            </Button>
            <Button
              leftIcon={<IconPencil size={16} />}
              radius="md"
              size="lg"
              uppercase
              component={Link}
              to="/register"
              color="cyan"
              variant="filled"
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
