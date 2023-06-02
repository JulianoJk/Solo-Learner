import {
  Header,
  Group,
  Button,
  Box,
  rem,
  Text,
  Menu,
  UnstyledButton,
  Avatar,
  Skeleton,
} from '@mantine/core';
import { upperFirst, useDocumentTitle } from '@mantine/hooks';
import LogoImage from '../../images/Logo';
import { useStyles } from './HeaderMenu.styles';
import ModeThemeButtonSmall from '../../Styles/ModeThemeButtonSmall';
import {
  IconChevronDown,
  IconHome,
  IconInfoCircle,
  IconLogin,
  IconLogout,
  IconSettings,
  IconUser,
  IconUserEdit,
} from '@tabler/icons-react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import {
  capitalString,
  isUndefinedOrNullString,
  isUserLoggedIn,
} from '../../lib/dist';
import { useUserDispatch, useUserState } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../context/AppContext';
import TokenExpirationChecker from '../expireSession/TokenExpirationChecker';
import { authenticateAPI } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { useGetProfile } from '../hooks/useGetProfile';

const HeaderMegaMenu = () => {
  const { classes, cx } = useStyles();
  const userDispatch = useUserDispatch();
  const appDisp = useAppDispatch();
  const { pathname } = useLocation();
  const [documentTitle, setDocumentTitle] = useState('');
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user } = useUserState();
  const { data: profileData } = useGetProfile(user.token);

  const navigate: NavigateFunction = useNavigate();
  const logOut = () => {
    userDispatch({ type: 'RESET_STATE' });
    navigate('/');
  };
  const navigateUserTo = (path: string) => {
    navigate(path);
  };
  const userToken = isUndefinedOrNullString(user.token) ? ' ' : user.token;

  const { isLoading, data } = useQuery(
    ['authenticateUser', userToken],
    async () => {
      if (user.token) {
        const data = await authenticateAPI(user.token);
        return data;
      }
      throw new Error('No token found');
    },
    { enabled: !!user.token },
  );
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
  const logoNavigation = isUserLoggedIn() ? '/home' : '/';
  useEffect(() => {
    if (data) {
      userDispatch({
        type: 'SET_USER',
        user: {
          username: data.username,
          email: data.email,
          isAdmin: data.isAdmin,
          token: user.token,
        },
      });
    }
  }, [data]);

  return (
    <Box>
      <Header height={60} px="md" className={classes.headerRoot}>
        <Group position="apart" sx={{ height: '100%' }}>
          <Box
            sx={{ width: 70, height: 60, marginTop: '0.4rem' }}
            onClick={() => navigateUserTo(logoNavigation)}
          >
            <LogoImage />
          </Box>
          {isUserLoggedIn() ? (
            <>
              <ModeThemeButtonSmall />
              <Group>
                <TokenExpirationChecker />
                <Menu
                  width={260}
                  position="bottom-end"
                  transitionProps={{ transition: 'pop-top-right' }}
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
                  withinPortal
                  withArrow
                  closeOnClickOutside
                  closeOnItemClick
                >
                  <Menu.Target>
                    <UnstyledButton
                      className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                      })}
                    >
                      <Group spacing={7}>
                        <Avatar
                          // TODO!: Change this
                          src={
                            'https://avatars.githubusercontent.com/u/47204253?v=4'
                          }
                          alt={profileData?.username ?? 'learner'}
                          radius="xl"
                          size={20}
                        />
                        <Text
                          className={classes.hiddenMobile}
                          weight={500}
                          size="sm"
                          sx={{ lineHeight: 1 }}
                          mr={3}
                        >
                          {upperFirst(profileData?.username ?? 'learner')}
                        </Text>
                        <IconChevronDown size={rem(12)} stroke={1.5} />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {!profileData?.isAdmin ? (
                      <>
                        <Menu.Label>Main Navigation</Menu.Label>
                        <Menu.Item
                          icon={<IconHome size="0.9rem" stroke={1.5} />}
                          onClick={() => navigateUserTo('/home')}
                        >
                          Home
                        </Menu.Item>
                        <Menu.Item
                          icon={<IconUser size="0.9rem" stroke={1.5} />}
                          onClick={() => navigateUserTo('/profile')}
                        >
                          Profile
                        </Menu.Item>
                        <Menu.Label>Settings</Menu.Label>

                        <Menu.Item
                          icon={<IconSettings size="0.9rem" stroke={1.5} />}
                          onClick={() => {
                            navigateUserTo('/settings');
                            appDisp({
                              type: 'SET_USER_SETTINGS_MODAL',
                              isUserSettingsOpen: true,
                            });
                          }}
                        >
                          Account settings
                        </Menu.Item>
                        <Menu.Item
                          icon={<IconLogout size="0.9rem" stroke={1.5} />}
                          onClick={() => logOut()}
                          color="red"
                        >
                          log out
                        </Menu.Item>
                      </>
                    ) : (
                      <>
                        <Menu.Label>Admin</Menu.Label>
                        <Menu.Item
                          icon={<IconUser size="0.9rem" stroke={1.5} />}
                          onClick={() => navigateUserTo('/admin/dashboard')}
                        >
                          Admin settings
                        </Menu.Item>
                        <Menu.Item
                          disabled={isLoading}
                          icon={
                            isLoading ? (
                              <IconHome size="0.9rem" stroke={1.5} />
                            ) : null
                          }
                        >
                          {isLoading ? (
                            <Skeleton height={28} mt={6} radius="sm" />
                          ) : (
                            'Admin menu item'
                          )}
                        </Menu.Item>
                        <Menu.Label>Main Navigation</Menu.Label>
                        <Menu.Item
                          icon={<IconHome size="0.9rem" stroke={1.5} />}
                          onClick={() => navigateUserTo('/home')}
                        >
                          Home
                        </Menu.Item>
                        <Menu.Item
                          icon={<IconUser size="0.9rem" stroke={1.5} />}
                          onClick={() => navigateUserTo('/profile')}
                        >
                          Profile
                        </Menu.Item>
                        <Menu.Label>Settings</Menu.Label>
                        <Menu.Item
                          icon={<IconSettings size="0.9rem" stroke={1.5} />}
                          onClick={() => {
                            navigateUserTo('/settings');
                            appDisp({
                              type: 'SET_USER_SETTINGS_MODAL',
                              isUserSettingsOpen: true,
                            });
                          }}
                        >
                          Account settings
                        </Menu.Item>
                        <Menu.Item
                          icon={<IconLogout size="0.9rem" stroke={1.5} />}
                          onClick={() => logOut()}
                          color="red"
                        >
                          log out
                        </Menu.Item>
                      </>
                    )}
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </>
          ) : (
            <>
              <Group sx={{ height: '100%' }} spacing={0}>
                <Button
                  leftIcon={<IconHome size={16} />}
                  radius="sm"
                  onClick={() => navigateUserTo('/')}
                  color="cyan"
                  variant="subtle"
                  className={classes.link}
                >
                  Home
                </Button>

                <Button
                  leftIcon={<IconInfoCircle size={16} />}
                  radius="sm"
                  onClick={() => navigateUserTo('/')}
                  color="cyan"
                  variant="subtle"
                  className={classes.link}
                >
                  About
                </Button>
                <ModeThemeButtonSmall />
              </Group>
              <Group>
                <Button
                  leftIcon={<IconLogin size={16} />}
                  variant="filled"
                  color="violet"
                  radius="sm"
                  onClick={() => navigateUserTo('/login')}
                >
                  <Text fz="md" color="white">
                    Log in
                  </Text>
                </Button>
                <Button
                  leftIcon={<IconUserEdit size={16} />}
                  radius="sm"
                  onClick={() => navigateUserTo('/register')}
                  color="cyan"
                >
                  Sign up
                </Button>
              </Group>
            </>
          )}
        </Group>
      </Header>
    </Box>
  );
};
export default HeaderMegaMenu;
