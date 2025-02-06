// AdminNavBar.component.js
import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconSwitchHorizontal,
  IconLogout,
  IconUserCog,
  IconUserPlus,
  IconSchool,
  IconPencil,
} from '@tabler/icons-react';
import React from 'react';
import { useStyles } from './AdminNavBar.styles';
import { useAppDispatch, useAppState } from '../../../context/AppContext';

const data = [
  { link: 'userManagment', label: 'User Management', icon: IconUserCog },
  { link: 'register_new_user', label: 'Register New User', icon: IconUserPlus },
  { link: 'RegisterUser', label: 'RegisterUser', icon: IconSchool },
  { link: 'Assignent', label: 'Assign Assignment', icon: IconPencil },
  { link: 'TestIt', label: 'Test Me', icon: IconPencil },
];

export function NavbarSimpleColored({
  drawerOpened,
  setDrawerOpened,
}: {
  drawerOpened: boolean;
  setDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch(); // Dispatch for handling active tab
  const { selectedAdminNavbar } = useAppState(); // Get current selected navbar item
  const [active, setActive] = useState(selectedAdminNavbar); // Set initial active from state

  const { classes } = useStyles();

  const handleLinkClick = (label: string, link: string) => {
    setActive(label);
    dispatch({
      type: 'SET_ACTIVE_ADMIN_NAV', // Update the context when clicked
      selectedAdminNavbar: link,
    });
  };

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={`#${item.link}`} // Ensure it has an href, if necessary
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        handleLinkClick(item.label, item.link);
        if (drawerOpened) setDrawerOpened(false); // Close drawer on link click if opened
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700} className={classes.version}>
            v3.1.2
          </Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
