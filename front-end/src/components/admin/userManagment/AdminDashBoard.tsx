import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Menu,
  rem,
  Center,
  TextInput,
} from '@mantine/core';
import {
  IconDots,
  IconMessages,
  IconMoodSad,
  IconNote,
  IconPencil,
  IconReportAnalytics,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import {
  IApiError,
  IApiMessageResponse,
  User,
  fetchUserList,
} from '../../../Model/UserModels';
import { useNavigate } from 'react-router-dom';
import { modals } from '@mantine/modals';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../../context/AppContext';
import { notificationAlert } from '../../notifications/NotificationAlert';
import { adminDeleteUserAccount } from '../../api/api';
import { useUserState, useUserDispatch } from '../../../context/UserContext';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';
import { CopyButtonComponent } from '../../CopyButton/CopyButton.component';

const roleColors: Record<string, string> = {
  student: 'blue',
  admin: 'pink',
  teacher: 'cyan',
  'admin/teacher': 'orange',
};

const UsersTable = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const {
    user: AdminUser,
    allUsersAdminDashboard,
    isAllUsersAdminDashboardLoading,
  } = useUserState();
  const userDispatch = useUserDispatch();
  const appDispatch = useAppDispatch();
  // const [allUsers, setAllUsers] = useState(data);
  const [currentUser, setCurrentUser] = useState<fetchUserList>();

  const [currentSelectedUser, setCurrentSelectedUser] = useState<
    number | undefined
  >();
  const [search, setSearch] = useState('');

  // const { isLoading: isCurrentUserLoading } = useQuery(

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);

    const filteredUsers = allUsersAdminDashboard.filter(
      (user) =>
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()),
    );
    userDispatch({ type: 'REMOVE_ALL_ADMIN_DASHBOARD_USERS' });

    userDispatch({
      type: 'SET_ALL_ADMIN_DASHBOARD_USERS',
      allUsersAdminDashboard: filteredUsers,
    });
    // setAllUsers(filteredUsers);
  };
  const handleEditButton = () => {
    // TODO!: Add edit user modal
    // console.log('user.id');
  };
  const currentFetchedUser = useGetCurrentUser(AdminUser.token);
  useEffect(() => {
    setCurrentUser(currentFetchedUser?.data);
  }, [currentFetchedUser.isFetched]);
  const { mutate: deleteAccount } = useMutation(adminDeleteUserAccount, {
    onSuccess: (data: IApiMessageResponse | IApiError) => {
      if (typeof data === 'object' && 'error' in data) {
        // handle the error case
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
        });
      } else {
        userDispatch({ type: 'REMOVE_ALL_ADMIN_DASHBOARD_USERS' });

        userDispatch({
          type: 'SET_ALL_ADMIN_DASHBOARD_USERS',
          allUsersAdminDashboard: allUsersAdminDashboard.filter(
            (user) => user.id !== currentSelectedUser,
          ),
        });
        // setAllUsers();

        notificationAlert({
          title: 'Account Deleted.',
          message: data.message,
          iconColor: 'red',
          closeAfter: 5000,
          icon: <IconMoodSad color="yellow" size={18} />,
        });
      }
    },
  });
  // const isCurrentUser = (user: User) => {
  //   if (AdminUser.id === undefined) return false;

  //   if (user.id === parseInt(AdminUser.id)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const handleDeleteUser = (user: User) => {
    if (user.id !== undefined) {
      setCurrentSelectedUser(user.id);

      modals.openConfirmModal({
        title: 'You are about to delete a user',

        children: (
          <Text size="lg">
            {`Are you sure you want to delete `}
            <i>
              <b style={{ textDecoration: 'underline' }}>{user.username}</b>
            </i>
            {`? This action is irreversible`}
          </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onConfirm: () => {
          const requestData = {
            token: AdminUser.token,
            Id: user.id,
          };
          deleteAccount(requestData);
        },
        closeOnCancel: true,
        closeOnConfirm: true,
        confirmProps: { color: 'red' },
      });
    } else {
      notificationAlert({
        title: 'Uh oh!',
        message: "Something went wrong. We couldn't delete the user.",
        iconColor: 'red',
        closeAfter: 5000,
        icon: <IconMoodSad color="black" size={18} />,
      });
    }
  };
  // console.log(allUsersAdminDashboard.map((user) => user));
  const [hoveredUserId, setHoveredUserId] = useState<number | null>(null);
  const [hoveredUsername, setHoveredUsername] = useState(false);
  const [hoveredEmail, setHoveredEmail] = useState(false);
  const handleUserHover = (
    userId: number | null,
    isUsername: boolean,
    isEmail: boolean,
  ) => {
    setHoveredUserId(userId);
    setHoveredUsername(isUsername);
    setHoveredEmail(isEmail);
  };

  const rows = allUsersAdminDashboard
    .filter((user) => user.id !== currentUser?.data?.id)
    .map((item) => (
      <tr
        key={item.username}
        onMouseEnter={() => handleUserHover(item.id, true, false)}
        onMouseLeave={() => handleUserHover(null, false, false)}
      >
        <td>
          <Group spacing="sm">
            <Avatar size={30} src={item.picture} radius={30} />
            <Group>
              <Anchor
                component="button"
                size="sm"
                onClick={() => {
                  navigate(`/profile/${item.username}`);
                }}
              >
                {item.username}
              </Anchor>
              <CopyButtonComponent
                value={item.username}
                isHovered={hoveredUsername && hoveredUserId === item.id}
              />
            </Group>
          </Group>
        </td>

        <td>
          {/* Add the Role title here */}
          {/* Assuming you have a function getJob that returns the role based on isAdmin and isTeacher */}
          <Badge
            color={roleColors[getJob(item.isAdmin, item.isTeacher)]}
            variant={theme.colorScheme === 'dark' ? 'light' : 'filled'}
          >
            {getJob(item.isAdmin, item.isTeacher)}
          </Badge>
        </td>

        <td>
          <Group
            onMouseEnter={() => handleUserHover(item.id, false, true)}
            onMouseLeave={() => handleUserHover(null, false, false)}
          >
            <Anchor
              component="button"
              size="sm"
              onClick={() => {
                navigate(`/profile/${item.username}`);
              }}
            >
              {item.email}
            </Anchor>
            <CopyButtonComponent
              value={item.email}
              isHovered={hoveredEmail && hoveredUserId === item.id}
            />
          </Group>
        </td>

        <td>
          <Text fz="sm" c={theme.colorScheme === 'dark' ? 'dimmed' : ''}>
            {item.formattedLastActive}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={handleEditButton}>
              <IconPencil size="1rem" stroke={1.5} />
            </ActionIcon>
            <Menu
              transitionProps={{ transition: 'pop' }}
              withArrow
              position="bottom-end"
              withinPortal
            >
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDots
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  disabled
                  icon={
                    <IconMessages
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Send message
                </Menu.Item>
                <Menu.Item
                  disabled
                  icon={
                    <IconNote
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Add note
                </Menu.Item>
                <Menu.Item
                  disabled
                  icon={
                    <IconReportAnalytics
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Analytics
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleDeleteUser(item)}
                  icon={
                    <IconTrash
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                  color="red"
                >
                  Delete user
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </td>
      </tr>
    ));

  return (
    <>
      {isAllUsersAdminDashboardLoading ? (
        <div>is loading</div>
      ) : (
        <ScrollArea>
          <TextInput
            placeholder="Search by username or email"
            mb="md"
            icon={<IconSearch size={20} />}
            value={search}
            onChange={handleSearchChange}
          />
          <Table
            sx={{ minWidth: 800 }}
            verticalSpacing="sm"
            striped={theme.colorScheme === 'dark' ? true : false}
            highlightOnHover
            withBorder
            withColumnBorders
          >
            <thead>
              <tr>
                <th>User</th>
                <th>Role title</th>
                <th>Email</th>
                <th>
                  <Text>
                    Last active <br />
                    <Text sx={{ fontSize: 7.5, paddingTop: 2 }}>
                      (YY-MM-DD HH-MM)
                    </Text>
                  </Text>
                </th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <Center>
                      <Text fw={700}>
                        There are currently no users to display.
                        <span style={{ color: 'teal' }}> Invite </span> users to
                        join!
                      </Text>
                    </Center>
                  </td>
                </tr>
              ) : (
                rows
              )}
            </tbody>
          </Table>
        </ScrollArea>
      )}
    </>
  );
};
function getJob(isAdmin: boolean, isTeacher: boolean) {
  if (isAdmin && isTeacher) {
    return 'admin/teacher';
  } else if (isAdmin) {
    return 'admin';
  } else if (isTeacher) {
    return 'teacher';
  } else {
    return 'student';
  }
}
export default UsersTable;

