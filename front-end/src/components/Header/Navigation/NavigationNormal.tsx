import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUserDispatch, useUserState } from '../../../context/UserContext';
import { Logout, Home, User, Login, Pencil } from 'tabler-icons-react';
import { Button, Group, Header, Anchor, Menu, Burger } from '@mantine/core';
import { useStyles } from './Navigation.styles';
import LogoImage from '../../../images/Logo';
import {
  capitalString,
  saveUserAfterReload,
  isUserLoggedIn,
  saveProfileImageAfterReload,
} from '../../../lib/dist';
import { useEffect, useState } from 'react';
import {
  useClickOutside,
  useDocumentTitle,
  useMediaQuery,
} from '@mantine/hooks';
import {
  useAccountSettingsDispatch,
  useAccountSettingsState,
} from '../../../context/AccountSettingsContext';
import { AppDispatch } from '../../../context/AppContext';
import { IconSettings, IconTrash } from '@tabler/icons';

const NavigationNormal: React.FC = () => {
  const [documentTitle, setDocumentTitle] = useState('');
  const accountSettingsDispatch = useAccountSettingsDispatch();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { classes } = useStyles();
  const appDisp = AppDispatch();
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

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
  }, [pathname]);

  useEffect(() => {
    saveUserAfterReload(userDispatch);
    saveProfileImageAfterReload(accountSettingsDispatch);
  }, []);

  // After logout, clear the context for the user and tasks, then navigate to index
  const logOut = () => {
    userDispatch({ type: 'RESET_STATE' });
    navigate('/');
  };
  const handleClick = () => {
    setOpened((openedBurger) => !openedBurger);
  };

  const logoNavigation = isUserLoggedIn() ? '/home' : '/';
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
                <Burger opened={opened} onClick={handleClick} ref={ref} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconSettings size={14} />}
                  onClick={() => navigate('/settings')}
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
              Sign-in
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
