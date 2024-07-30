import { Tabs, useMantineColorScheme } from '@mantine/core';
import {
  IconPencil,
  IconUserCog,
  IconUserPlus,
  IconSchool,
} from '@tabler/icons-react';
import { useAppDispatch } from '../../context/AppContext';
import React from 'react';
const data = [
  { link: 'userManagment', label: 'User Management', icon: IconUserCog },
  { link: 'register_new_user', label: 'Register New User', icon: IconUserPlus },
  { link: 'billing', label: 'billing', icon: IconSchool },
  { link: 'Assignent', label: 'Assign assigment', icon: IconPencil },
];

const AdminDrawer = () => {
  const { colorScheme } = useMantineColorScheme();
  const appDispatch = useAppDispatch();

  const handleTabClick = (link: string) => {
    appDispatch({
      type: 'SET_ACTIVE_ADMIN_NAV',
      selectedAdminNavbar: link,
    });
  };

  return (
    <Tabs
      defaultValue={data[0].link}
      color={colorScheme === 'dark' ? 'green' : 'white'}
      autoContrast
      mb={10}
    >
      <Tabs.List grow>
        {data.map((tab) => (
          <Tabs.Tab
            key={tab.link}
            value={tab.link}
            leftSection={<tab.icon size="0.8rem" />}
            onClick={() => handleTabClick(tab.link)}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};

export default AdminDrawer;
