import {
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Center,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LogoImage from '../../images/Logo';
import { useStyles } from './HeaderMenu.styles';
import ModeTheme from '../../Styles/ModeTheme';
import {
  IconHome,
  IconInfoCircle,
  IconLogin,
  IconUserEdit,
} from '@tabler/icons-react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const navigate: NavigateFunction = useNavigate();

  const navigateUserTo = (path: string) => {
    navigate(path);
    closeDrawer();
  };
  return (
    <Box pb={120}>
      <Header height={60} px="md" className={classes.headerRoot}>
        <Group position="apart" sx={{ height: '100%' }}>
          <Box sx={{ width: 70, height: 60, marginTop: '0.4rem' }} onClick={()=>navigateUserTo('/')}>
            <LogoImage />
          </Box>

          <Group
            sx={{ height: '100%' }}
            spacing={0}
            className={classes.hiddenMobile}
          >
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

            <ModeTheme />
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button
              leftIcon={<IconLogin size={16} />}
              variant="default"
              radius="sm"
              onClick={() => navigateUserTo('/login')}
            >
              Log in
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
        withCloseButton
        closeButtonProps={{ size: 'md' }}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <>
            <Center>
              <Box
                sx={{ width: 70, height: 60 }}
                onClick={() => navigateUserTo('/')}
              >
                <LogoImage />
              </Box>
            </Center>
          </>
        }
        className={classes.hiddenDesktop}
        zIndex={1000000}
        transitionProps={{
          transition: 'fade',
          duration: 200,
          timingFunction: 'ease',
        }}
      >
        <ScrollArea
          h={`calc(100vh - ${rem(60)})`}
          mx="-md"
          className={classes.headerRoot}
        >
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
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

          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button
              leftIcon={<IconLogin size={16} />}
              variant="default"
              radius="sm"
              onClick={() => navigateUserTo('/login')}
            >
              Log in
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
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
export default HeaderMegaMenu;
