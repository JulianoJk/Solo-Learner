/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Group,
  Button,
  Box,
  rem,
  Text,
  Menu,
  UnstyledButton,
  Avatar,
  Drawer,
  ScrollArea,
  Divider,
  Burger,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {
  upperFirst,
  useDisclosure,
  useDocumentTitle,
  useMediaQuery,
} from '@mantine/hooks';
import LogoImage from '../../images/Logo';
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
import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  capitalString,
  checkIfPageIsReload,
  checkTokenValidity,
  isUndefinedOrNullString,
  isUserLoggedIn,
  saveProfileImageAfterReload,
} from '../../utils/utils';
import { useUserDispatch, useUserState } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../context/AppContext';
import TokenExpirationChecker from '../expireSession/TokenExpirationChecker';
import { authenticateAPI, logoutAPI } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { IUserInfoContext, User, fetchUserList } from '../../Model/UserModels';
import { useGetProfile } from '../hooks/useGetProfile';
import jwtDecode from 'jwt-decode';
import { useGetCurrentUser } from '../hooks/useGetCurrentUser';
// import { CopyButtonComponent } from '../CopyButton/CopyButton.component';
import { logoutUser } from '../Auth/LogoutUtils';

import cx from 'clsx';
import React from 'react';
import { useStyles } from './HeaderMenu.styles';

const HeaderMegaMenu = () => {
  const { classes } = useStyles();
  const userDispatch = useUserDispatch();
  const appDisp = useAppDispatch();
  const { pathname } = useLocation();
  const [documentTitle, setDocumentTitle] = useState('');
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState<fetchUserList>();
  const { user, picture } = useUserState();
  const { username: UsernameFromPath } = useParams<{ username: string }>();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const navigate: NavigateFunction = useNavigate();
  const logout = async () => {
    logoutUser(userDispatch, navigate);
  };
  const navigateUserTo = (path: string) => {
    navigate(path);
  };

  const userToken = isUndefinedOrNullString(user.token) ? ' ' : user.token;
  const isTokenExpired = checkTokenValidity(userToken);
  const currentFetchedUser = useGetCurrentUser(userToken);
  useEffect(() => {
    setCurrentUser(currentFetchedUser?.data);
  }, [currentFetchedUser.isFetched]);

  const checkToken = () => {
    if (userToken) {
      localStorage.setItem('lastVisitedPath', location.pathname);

      if (isUserLoggedIn() && isTokenExpired) {
        navigate('/token-expiration');
      }
    }
  };

  const { isLoading } = useQuery(
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

  useEffect(() => {
    checkToken();

    if (pathname === '/profile') {
      useGetProfile(
        (UsernameFromPath === undefined
          ? currentUser?.data?.username !== undefined
            ? user.username
            : ''
          : UsernameFromPath) as string,
        user.token,
      );
    }
    const titles = capitalString(pathname.replace('/', ''));
    if (pathname !== '/') {
      setDocumentTitle(titles + ' - Solo Learner');
    } else if (pathname.includes('/admin')) {
      setDocumentTitle('Admin - Solo Learner');
    } else if (pathname === '/') {
      setDocumentTitle('Solo Learner');
    }
    appDisp({
      type: 'RESET_ERROR_MESSAGE',
    });
  }, [pathname]);
  // TODO!: Add this to the useEffect above
  useDocumentTitle(documentTitle);
  const matches = useMediaQuery('(min-width: 56.25em)');
  const logoNavigation = isUserLoggedIn() ? '/home' : '/';
  const renderAvatar =
    picture !== undefined
      ? picture
      : 'https://avatars.githubusercontent.com/u/47204253?v=4';

  return (
    <Box>
      {/* <Group justify="space-between" style={{ height: '4rem' }}> */}
      {isUserLoggedIn() ? (
        <>
          <header className={classes.headerRoot}>
            <Group
              justify="space-between"
              style={{
                height: '100%',
                marginRight: '1rem',
              }}
            >
              <Box
                style={{
                  width: 70,
                  height: 60,
                  marginTop: '0.4rem',
                }}
                onClick={() => navigateUserTo(logoNavigation)}
              >
                <LogoImage />
              </Box>
              <TokenExpirationChecker />

              <Group>
                <ModeThemeButtonSmall />
                {/* //TODO!: Make the menu to load when the currentUserApi is loading. */}
                {/* {isCurrentUserLoading ? <></> : <></>} */}
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
                      <Group gap={7}>
                        <Avatar
                          // TODO!: Change this
                          src={picture}
                          alt={currentUser?.data?.username ?? 'learner'}
                          radius="xl"
                          size={30}
                          imageProps={{ referrerPolicy: 'no-referrer' }}
                        />
                        {matches && (
                          <Text
                            className={classes.hiddenMobile}
                            fw={500}
                            size="sm"
                            style={{ lineHeight: 1 }}
                            mr={3}
                          >
                            {isLoading === false
                              ? // {isLoading === false && isCurrentUserFetched
                                upperFirst(
                                  currentUser?.data?.username as string,
                                )
                              : 'learner'}
                          </Text>
                        )}

                        <IconChevronDown size="1rem" stroke={1.5} />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {!currentUser?.data?.isAdmin ? (
                      <>
                        <Menu.Label>Main Navigation</Menu.Label>
                        <Menu.Item
                          leftSection={<IconHome size="0.9rem" stroke={1.5} />}
                          onClick={() => navigateUserTo('/home')}
                        >
                          Home
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<IconUser size="0.9rem" stroke={1.5} />}
                          onClick={() =>
                            navigateUserTo(`/profile/${user.username}`)
                          }
                        >
                          Profile
                        </Menu.Item>
                        <Menu.Label>Settings</Menu.Label>

                        <Menu.Item
                          leftSection={
                            <IconSettings size="0.9rem" stroke={1.5} />
                          }
                          onClick={() => {
                            navigateUserTo('/settings');
                          }}
                        >
                          Account settings
                        </Menu.Item>
                        <Menu.Item
                          leftSection={
                            <IconLogout size="0.9rem" stroke={1.5} />
                          }
                          onClick={() => logout()}
                          color="red"
                        >
                          log out
                        </Menu.Item>
                      </>
                    ) : (
                      <>
                        <Menu.Label>Admin</Menu.Label>

                        <Menu.Item
                          leftSection={<IconUser size="0.9rem" stroke={1.5} />}
                          onClick={() => navigateUserTo('/admin/dashboard')}
                        >
                          Admin Dashboard
                        </Menu.Item>

                        <Menu.Label>Main Navigation</Menu.Label>
                        <Menu.Item
                          leftSection={<IconHome size="0.9rem" stroke={1.5} />}
                          onClick={() => navigateUserTo('/home')}
                        >
                          Home
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<IconUser size="0.9rem" stroke={1.5} />}
                          onClick={() =>
                            navigateUserTo(`/profile/${user.username}`)
                          }
                        >
                          Profile
                        </Menu.Item>
                        <Menu.Label>Settings</Menu.Label>
                        <Menu.Item
                          leftSection={
                            <IconSettings size="0.9rem" stroke={1.5} />
                          }
                          onClick={() => {
                            navigateUserTo('/settings');
                          }}
                        >
                          Account settings
                        </Menu.Item>
                        <Menu.Item
                          leftSection={
                            <IconLogout size="0.9rem" stroke={1.5} />
                          }
                          onClick={() => logout()}
                          color="red"
                        >
                          log out
                        </Menu.Item>
                      </>
                    )}
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </header>
        </>
      ) : (
        <>
          <header className={classes.headerRoot}>
            <Group
              justify="space-between"
              style={{
                height: '100%',
                marginRight: '1rem',
              }}
            >
              <Box
                style={{
                  width: 70,
                  height: 60,
                  marginTop: '0.4rem',
                }}
                onClick={() => navigateUserTo(logoNavigation)}
              >
                <LogoImage />
              </Box>
              {matches && (
                <Group
                  style={{ height: '100%' }}
                  gap={14}
                  className={classes.hiddenMobile}
                >
                  <ModeThemeButtonSmall />

                  <Button
                    leftSection={<IconHome size={16} />}
                    radius="sm"
                    onClick={() => navigateUserTo('/')}
                    color="cyan"
                    variant="subtle"
                    className={classes.link}
                    style={{
                      color: colorScheme === 'dark' ? '#fff' : '#000',
                      ':hover': {
                        backgroundColor:
                          colorScheme === 'light'
                            ? theme.colors.dark[6]
                            : theme.colors.gray[5],
                      },
                    }}
                  >
                    Home
                  </Button>

                  <Button
                    leftSection={<IconInfoCircle size={16} />}
                    radius="sm"
                    onClick={() => navigateUserTo('/')}
                    color="cyan"
                    variant="subtle"
                    className={classes.link}
                    style={{
                      color: colorScheme === 'dark' ? '#fff' : '#000',
                      ':hover': {
                        backgroundColor:
                          colorScheme === 'light'
                            ? theme.colors.dark[6]
                            : theme.colors.gray[5],
                      },
                    }}
                  >
                    About
                  </Button>
                </Group>
              )}
              {matches && (
                <Group className={classes.hiddenMobile}>
                  <Button
                    leftSection={<IconLogin size={16} />}
                    variant="filled"
                    color="violet"
                    radius="sm"
                    onClick={() => navigateUserTo('/login')}
                  >
                    <Text fz="md" c="white">
                      Log in
                    </Text>
                  </Button>
                  <Button
                    leftSection={<IconUserEdit size={16} />}
                    radius="sm"
                    onClick={() => navigateUserTo('/register')}
                    color="cyan"
                  >
                    Sign up
                  </Button>
                </Group>
              )}
              {!matches && (
                <Burger
                  opened={drawerOpened}
                  onClick={toggleDrawer}
                  className={classes.hiddenDesktop}
                />
              )}
            </Group>
          </header>
          {!matches && (
            <Drawer
              opened={drawerOpened}
              onClose={closeDrawer}
              size="100%"
              padding="md"
              title="Solo Learner"
              className={classes.hiddenDesktop}
              zIndex={1000000}
            >
              <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
                <Divider
                  my="sm"
                  color={colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />

                <Button
                  leftSection={<IconHome size={16} />}
                  radius="sm"
                  onClick={() => {
                    closeDrawer();
                    navigateUserTo('/');
                  }}
                  color="cyan"
                  variant="subtle"
                  className={classes.link}
                  style={{
                    color: colorScheme === 'dark' ? '#fff' : '#000',
                    ':hover': {
                      backgroundColor:
                        colorScheme === 'light'
                          ? theme.colors.dark[9]
                          : theme.colors.gray[9],
                    },
                  }}
                >
                  Home
                </Button>

                <Button
                  leftSection={<IconInfoCircle size={16} />}
                  radius="sm"
                  onClick={() => {
                    closeDrawer();
                    navigateUserTo('/');
                  }}
                  color="cyan"
                  variant="subtle"
                  className={classes.link}
                  style={{
                    color: colorScheme === 'dark' ? '#fff' : '#000',
                    ':hover': {
                      backgroundColor:
                        colorScheme === 'dark'
                          ? theme.colors.dark[9]
                          : theme.colors.gray[9],
                    },
                  }}
                >
                  About
                </Button>
                <Divider
                  my="sm"
                  color={colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />

                <Group justify="center" grow pb="xl" px="md">
                  <Button
                    leftSection={<IconLogin size={16} />}
                    variant="filled"
                    color="violet"
                    radius="sm"
                    onClick={() => {
                      closeDrawer();
                      navigateUserTo('/login');
                    }}
                  >
                    <Text fz="md" color="white">
                      Log in
                    </Text>
                  </Button>
                  <Button
                    leftSection={<IconUserEdit size={16} />}
                    radius="sm"
                    onClick={() => {
                      closeDrawer();
                      navigateUserTo('/register');
                    }}
                    color="cyan"
                  >
                    Sign up
                  </Button>
                </Group>
              </ScrollArea>
            </Drawer>
          )}
        </>
      )}
    </Box>
  );
};
export default HeaderMegaMenu;
