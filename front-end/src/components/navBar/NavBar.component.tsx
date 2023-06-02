import { useState } from 'react';
import { createStyles, Navbar, getStylesRef, rem, Anchor } from '@mantine/core';
import {
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconUserCog,
} from '@tabler/icons-react';
import { useAppDispatch } from '../../context/AppContext';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const data = [
  { link: 'userManagment', label: 'User Managment', icon: IconUserCog },
  { link: 'billing', label: 'Billing', icon: IconReceipt2 },
  { link: 'security', label: 'Security', icon: IconFingerprint },
  { link: 'SSH', label: 'SSH Keys', icon: IconKey },
  { link: 'Databases', label: 'Databases', icon: IconDatabaseImport },
  { link: 'Authentication', label: 'Authentication', icon: Icon2fa },
  { link: 'settings', label: 'Other Settings', icon: IconSettings },
];

export function NavBar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('User Managment');
  const appDispatch = useAppDispatch();
  const isMobile = useMediaQuery('(max-width: 768px)'); // adjust the value as needed

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        appDispatch({
          type: 'SET_ACTIVE_ADMIN_NAV',
          selectedAdminNavbar: item.link,
        });
        setActive(item.label);
      }}
      style={{ fontSize: isMobile ? '0.6rem' : '1rem' }} // adjust the values as needed
    >
      {isMobile ? null : (
        <item.icon className={classes.linkIcon} stroke={1.5} />
      )}
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      height={'100vh'}
      width={{
        // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
        sm: 300,

        // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
        lg: 400,

        // When other breakpoints do not match base width is used, defaults to 100%
        base: 100,
      }}
      p="md"
    >
      <Navbar.Section grow>{links}</Navbar.Section>

      {/* TODO!: ADD IMAGE FOR THE ADMIN ETC */}
      <Navbar.Section className={classes.footer}>
        <Anchor
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Anchor>

        <Anchor
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Anchor>
      </Navbar.Section>
    </Navbar>
  );
}
