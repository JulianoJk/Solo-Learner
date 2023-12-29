/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import {
  AppShell,
  Button,
  MantineProvider,
  Avatar,
  ColorSchemeScript,
  // useMantineColorScheme,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import HeaderMenu from './components/Header/HeaderMenu.component';

import Admin from './components/admin/Admin.component';
import { getGoogleClientIdAPI } from './components/api/api';
import { checkIfPageIsReload } from './utils/utils';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Exercises from './components/Pages/LearningUnits/Exercises/Exercises';
import AuthenticationLoginForm from './components/Auth/Login/AuthenticationLoginForm';
import AuthenticationRegisterForm from './components/Auth/Login/AuthenticationRegisterForm';
// import Home from './components/Pages/Home/Home';
import IndexPage from './components/Pages/Index/IndexPage';
import Grammar from './components/Pages/LearningUnits/Grammar/Grammar';
import Theory from './components/Pages/LearningUnits/Theory/Theory';
import Profile from './components/Pages/Profile/Profile';
import Settings from './components/Pages/Settings/Settings.component';
import DeleteAccount from './components/Pages/Settings/TempOther/DeleteAccount/DeleteAccount';

import Vocabulary from './images/Vocabulary';
import { AccountSettingsContextProvider } from './context/AccountSettingsContext';
import { AppContextProvider } from './context/AppContext';
import { UserContextProvider } from './context/UserContext';
import Demo from './components/Demo';
import './GlobalStyles.modules.css';

const App = () => {
  const queryClient = new QueryClient();
  const [clientId, setClientId] = useState('');
  // const { colorScheme } = useMantineColorScheme();
  const [loadingClientId, setLoadingClientId] = useState(true);

  // const toggleColorScheme = (value?: ColorScheme) =>
  //   setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  // useEffect(() => {
  //   const appTheme: any = localStorage.getItem('app-theme');
  //   if (checkIfPageIsReload() && appTheme !== null) {
  //     const appThemes = JSON.parse(appTheme);
  //     toggleColorScheme(appThemes);
  //   }
  // }, [window.location.pathname]);

  const fetchGoogleClientId = async () => {
    try {
      const fetchedClientId = await getGoogleClientIdAPI();
      setClientId(fetchedClientId);
    } catch (error) {
      console.error('Failed to fetch Google Client ID:', error);
    } finally {
      setLoadingClientId(false);
    }
  };

  useEffect(() => {
    fetchGoogleClientId();
  }, []);

  if (loadingClientId) {
    return <div>Loading...</div>;
  }
  const CommonRoutes = [
    <Route key="/" path="/" element={<IndexPage />} />,
    // <Route key="/s" path="/" element={<IndexPage />} />,
    // <Route
    //   key="/login"
    //   path="/login"
    //   element={
    //     <AuthenticationLoginForm hasBorder switchToRegister showNotification />
    //   }
    // />,
    // <Route
    //   key="/register"
    //   path="/register"
    //   element={
    //     <AuthenticationRegisterForm
    //       displaySocialButtons
    //       hasBorder
    //       switchToLogin
    //       showNotification
    //       isAdminRegister={false}
    //     />
    //   }
    // />,
  ];

  const ProtectedRoutes = [
    <Route key="/" path="/" element={<Demo />} />,

    // <Route key="/home" path="/home" element={<Home />} />,
    // <Route
    //   key="/profile/:username"
    //   path="/profile/:username"
    //   element={<Profile />}
    // />,
    // <Route key="/settings" path="/settings" element={<Settings />} />,
    // <Route
    //   key="/delete-account"
    //   path="/delete-account"
    //   element={<DeleteAccount />}
    // />,
    // <Route
    //   key="/learning-units/grammar"
    //   path="/learning-units/grammar"
    //   element={<Grammar />}
    // />,
    // <Route
    //   key="/learning-units/theory"
    //   path="/learning-units/theory"
    //   element={<Theory />}
    // />,
    // <Route
    //   key="/learning-units/vocabulary"
    //   path="/learning-units/vocabulary"
    //   element={<Vocabulary />}
    // />,
    // <Route
    //   key="/learning-units/exercises"
    //   path="/learning-units/exercises"
    //   element={<Exercises />}
    // />,
    // <Route
    //   key="/admin/dashboard"
    //   path="/admin/dashboard"
    //   element={<Admin />}
    // />,
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript defaultColorScheme="dark" />

      <MantineProvider
        defaultColorScheme="dark"
        // theme={{
        //   components: {
        //     Avatar: Avatar.extend({
        //       defaultProps: {
        //         size: 'md',
        //         style: () => ({
        //           backgroundColor:
        //             colorScheme === 'light' ? '#004a44' : '#35004c',
        //           '&:hover': {
        //             color: colorScheme === 'light' ? 'red' : 'black',
        //           },
        //           gradient:
        //             colorScheme === 'light'
        //               ? { from: '#0CA678', to: 'blue', deg: 60 }
        //               : { from: '#59A5D8', to: '#84D2F6', deg: 35 },
        //         }),
        //       },
        //     }),
        //     Button: Button.extend({
        //       defaultProps: {
        //         size: 'md',
        //         style: () => ({
        //           transition:
        //             'background-color 150ms ease, transform 150ms ease, opacity 150ms ease',
        //           '&:hover': {
        //             transform: 'translateY(1px) scale(0.95)',
        //             opacity: 0.9,
        //             filter: 'brightness(90%)',
        //           },
        //         }),
        //       },
        //     }),
        //   },
        // }}
      >
        <AppContextProvider>
          <ModalsProvider>
            <BrowserRouter>
              <Notifications />
              <UserContextProvider>
                <AccountSettingsContextProvider>
                  <AppShell padding="md">
                    <AppShell.Header>
                      <HeaderMenu />
                    </AppShell.Header>
                    <GoogleOAuthProvider clientId={clientId}>
                      <Routes>{[...CommonRoutes, ...ProtectedRoutes]}</Routes>
                    </GoogleOAuthProvider>
                  </AppShell>
                </AccountSettingsContextProvider>
              </UserContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </ModalsProvider>
        </AppContextProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
