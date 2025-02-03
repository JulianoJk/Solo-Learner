/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Anchor, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { IconBellCog, IconUserCog } from '@tabler/icons-react';

import { useMediaQuery } from '@mantine/hooks';
import { useAppDispatch } from '../../../context/AppContext';
import React from 'react';
import { ChangeUsernameSetting } from './TempOther/ChangeUsernameSetting';
// import { useStyles } from './Settings.styles';

const data = [
  { link: 'Profile', label: 'Profile settings', icon: IconUserCog },
  { link: 'Notification', label: 'Notifications settings', icon: IconBellCog },
];

const Settings = () => {
  // const { classes, cx } = useStyles();
  const [active, setActive] = useState('User Managment');
  const appDispatch = useAppDispatch();
  const isMobile = useMediaQuery('(max-width: 768px)'); // adjust the value as needed
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  // const links = data.map((item) => (
  //   <Anchor
  //     draggable={false}
  //     className={cx(classes.link, {
  //       [classes.linkActive]: item.label === active,
  //     })}
  //     href={item.link}
  //     key={item.label}
  //     onClick={(event) => {
  //       event.preventDefault();
  //       appDispatch({
  //         type: 'SET_ACTIVE_ADMIN_NAV',
  //         selectedAdminNavbar: item.link,
  //       });
  //       setActive(item.label);
  //     }}
  //     style={{ fontSize: isMobile ? '0.6rem' : '1rem' }} // adjust the values as needed
  //   >
  //     {isMobile ? null : (
  //       <item.icon className={classes.linkIcon} stroke={1.5} />
  //     )}
  //     <span>{item.label}</span>
  //   </Anchor>
  // ));

  // return (
  //   <Navbar
  //     styles={{
  //       root: {
  //         backgroundImage:
  //           colorScheme === 'light'
  //             ? theme.fn.linearGradient(7, '#f8bbd09e', '#64b4f694') //OR "#4CAF50", "#2196F3"
  //             : theme.fn.linearGradient(7, '#303233'),
  //       },
  //     }}
  //     height={'100vh'}
  //     width={{
  //       // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
  //       sm: 200,

  //       // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
  //       lg: 300,

  //       // When other breakpoints do not match base width is used, defaults to 100%
  //       base: 100,
  //     }}
  //     p="md"
  //   >
  //     <Navbar.Section grow>{links}</Navbar.Section>
  //   </Navbar>
  return <ChangeUsernameSetting></ChangeUsernameSetting>;
  // return <></>;
};
export default Settings;
