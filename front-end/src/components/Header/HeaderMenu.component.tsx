/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Drawer,
  ScrollArea,
  Divider,
  Center,
  Collapse,
  Burger,
  Anchor,
} from '@mantine/core';
import { upperFirst, useDisclosure, useDocumentTitle } from '@mantine/hooks';
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
import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  capitalString,
  isUndefinedOrNullString,
  isUserLoggedIn,
} from '../../utils/utils';
import { useUserDispatch, useUserState } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../context/AppContext';
import TokenExpirationChecker from '../expireSession/TokenExpirationChecker';
import { authenticateAPI, getCurrentUser } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../Model/UserModels';
import { useGetProfile } from '../hooks/useGetProfile';

const HeaderMegaMenu = () => {
  const { classes, cx, theme } = useStyles();
  const userDispatch = useUserDispatch();
  const appDisp = useAppDispatch();
  const { pathname } = useLocation();
  const [documentTitle, setDocumentTitle] = useState('');
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const { user } = useUserState();
  const { username: UsernameFromPath } = useParams<{ username: string }>();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const navigate: NavigateFunction = useNavigate();
  const logOut = () => {
    userDispatch({ type: 'RESET_STATE' });
    navigate('/');
  };
  const navigateUserTo = (path: string) => {
    navigate(path);
  };
  const userToken = isUndefinedOrNullString(user.token) ? ' ' : user.token;

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

  const { isFetched: isCurrentUserFetched, isLoading: isCurrentUserLoading } =
    useQuery(
      ['getCurrentUser', userToken],
      async () => {
        if (user.token) {
          const data = await getCurrentUser(user.token);
          return data;
        }
        throw new Error('No token found');
      },
      {
        onSuccess: (data) => {
          if (data?.status === 'success') {
            setCurrentUser(data.data);
          }
        },
        enabled: !!user.token,
      },
    );

  useEffect(() => {
    if (pathname === '/profile') {
      useGetProfile(
        (UsernameFromPath === undefined
          ? currentUser?.username !== undefined
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
  const logoNavigation = isUserLoggedIn() ? '/home' : '/';

  return (
    <Box>
      <Header height={60} px="md" className={classes.headerRoot}>
        <Group position="apart" sx={{ height: '100%' }}>
          {isUserLoggedIn() ? (
            <>
              <Box
                sx={{ width: 70, height: 60, marginTop: '0.4rem' }}
                onClick={() => navigateUserTo(logoNavigation)}
              >
                <LogoImage />
              </Box>
              <ModeThemeButtonSmall />
              <Group>
                <TokenExpirationChecker />
                {/* //TODO!: Make the menu to load when the currentUserApi is loading. */}
                {isCurrentUserLoading ? <></> : <></>}
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
                          alt={currentUser?.username ?? 'learner'}
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
                          {isLoading === false && isCurrentUserFetched
                            ? upperFirst(currentUser?.username as string)
                            : 'learner'}
                        </Text>
                        <IconChevronDown size={rem(12)} stroke={1.5} />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {!currentUser?.isAdmin ? (
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
                          onClick={() =>
                            navigateUserTo(`/profile/${user.username}`)
                          }
                        >
                          Profile
                        </Menu.Item>
                        <Menu.Label>Settings</Menu.Label>

                        <Menu.Item
                          icon={<IconSettings size="0.9rem" stroke={1.5} />}
                          onClick={() => {
                            navigateUserTo('/settings');
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

                        <Menu.Label>Main Navigation</Menu.Label>
                        <Menu.Item
                          icon={<IconHome size="0.9rem" stroke={1.5} />}
                          onClick={() => navigateUserTo('/home')}
                        >
                          Home
                        </Menu.Item>
                        <Menu.Item
                          icon={<IconUser size="0.9rem" stroke={1.5} />}
                          onClick={() =>
                            navigateUserTo(`/profile/${user.username}`)
                          }
                        >
                          Profile
                        </Menu.Item>
                        <Menu.Label>Settings</Menu.Label>
                        <Menu.Item
                          icon={<IconSettings size="0.9rem" stroke={1.5} />}
                          onClick={() => {
                            navigateUserTo('/settings');
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
              <Box pb={120}>
                <Header height={60} px="md" className={classes.headerRoot}>
                  <Group position="apart" sx={{ height: '100%' }}>
                    <Box
                      sx={{ width: 70, height: 60, marginTop: '0.4rem' }}
                      onClick={() => navigateUserTo(logoNavigation)}
                    >
                      <LogoImage />
                    </Box>
                    <Group
                      sx={{ height: '100%' }}
                      spacing={14}
                      className={classes.hiddenMobile}
                    >
                      <ModeThemeButtonSmall />
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
                    </Group>

                    <Group className={classes.hiddenMobile}>
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

                    <Burger
                      opened={drawerOpened}
                      onClick={toggleDrawer}
                      className={classes.hiddenDesktop}
                    />
                  </Group>
                </Header>

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
                      color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                    />

                    <Button
                      leftIcon={<IconHome size={16} />}
                      radius="sm"
                      onClick={() => {
                        closeDrawer();
                        navigateUserTo('/');
                      }}
                      color="cyan"
                      variant="subtle"
                      className={classes.link}
                    >
                      Home
                    </Button>

                    <Button
                      leftIcon={<IconInfoCircle size={16} />}
                      radius="sm"
                      onClick={() => {
                        closeDrawer();
                        navigateUserTo('/');
                      }}
                      color="cyan"
                      variant="subtle"
                      className={classes.link}
                    >
                      About
                    </Button>
                    <Divider
                      my="sm"
                      color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                    />

                    <Group position="center" grow pb="xl" px="md">
                      <Button
                        leftIcon={<IconLogin size={16} />}
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
                        leftIcon={<IconUserEdit size={16} />}
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
              </Box>
            </>
          )}
        </Group>
      </Header>
    </Box>
  );
};
export default HeaderMegaMenu;
