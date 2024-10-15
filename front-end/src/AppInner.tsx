import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import {
  AppShell,
  Button,
  MantineThemeProvider,
  useMantineColorScheme,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import HeaderMenu from './components/Header/HeaderMenu.component';

import Admin from './components/admin/Admin.component';
import { getGoogleClientIdAPI } from './components/api/api';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Exercises from './components/Pages/LearningUnits/Exercises/Exercises';

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

// import './GlobalStyles.modules.css';
import Home from './components/Pages/Home/Home';

import Preloader from './components/Loader/Preloader.component';
import NotFound from './components/Pages/Error/pageNotFound/NotFound.component';
import AuthenticationForm from './components/Auth/Login/AuthenticationLogin.component';
import AuthenticationRegister from './components/Auth/Register/AuthenticationRegister.component';
// import DragNDrop from './components/Pages/LearningUnits/DragNDrop/DragNDrop.component';

const AppInner = () => {
  const { colorScheme } = useMantineColorScheme();
  useEffect(() => {
    console.log(colorScheme);
    document.body.style.backgroundImage =
      colorScheme === 'dark'
        ? 'linear-gradient(180deg, #1A1B1E 0%, #1A1B1E 100%)'
        : 'linear-gradient(7deg, #F8BBD0 0%, #64B5F6 100%)';
    // : 'linear-gradient(7deg, #F8BBD0 0%, #FFA500 5%, #64B5F6 100%)';
  }, [colorScheme]);

  const { data: googleClientId, isLoading: isGoogleClientIdLoading } = useQuery(
    ['getGoogleClientId'],
    async () => {
      const data = await getGoogleClientIdAPI();
      return data;
    },
    { enabled: true },
  );

  const CommonRoutes = [
    <Route
      key="/"
      path="/"
      element={isGoogleClientIdLoading ? <Preloader /> : <IndexPage />}
    />,
    <Route key="/s" path="/s" element={<IndexPage />} />,
    <Route
      key="/login"
      path="/login"
      element={
        isGoogleClientIdLoading ? (
          <Preloader />
        ) : (
          <AuthenticationForm hasBorder switchToRegister showNotification />
        )
      }
    />,
    <Route
      key="/register"
      path="/register"
      element={
        <AuthenticationRegister
          displaySocialButtons
          hasBorder
          switchToLogin
          showNotification
          isAdminRegister={false}
        />
      }
    />,
    <Route
      key="/*"
      path="/*"
      element={<NotFound navigationPath={'/home'} />}
    />,
  ];

  const ProtectedRoutes = [
    <Route key="/home" path="/home" element={<Home />} />,
    <Route
      key="/profile/:username"
      path="/profile/:username"
      element={<Profile />}
    />,
    <Route key="/settings" path="/settings" element={<Settings />} />,
    <Route
      key="/delete-account"
      path="/delete-account"
      element={<DeleteAccount />}
    />,
    <Route
      key="/learning-units/grammar"
      path="/learning-units/grammar"
      element={<Grammar />}
    />,
    <Route
      key="/learning-units/theory"
      path="/learning-units/theory"
      element={<Theory />}
    />,
    <Route
      key="/learning-units/vocabulary"
      path="/learning-units/vocabulary"
      element={<Vocabulary />}
    />,
    <Route
      key="/learning-units/exercises"
      path="/learning-units/exercises"
      element={<Exercises />}
    />,
    <Route
      key="/admin/dashboard"
      path="/admin/dashboard"
      element={<Admin />}
    />,
    // <Route
    //   key="/user/DragNDrops"
    //   path="/user/DragNDrops"
    //   element={<DragNDrop />}
    // />,
  ];

  return (
    <>
      <MantineThemeProvider
        theme={{
          components: {
            // Avatar: Avatar.extend({
            //   defaultProps: {
            //     size: 'md',
            //     style: () => ({
            //       backgroundColor:
            //         colorScheme === 'light' ? '#004a44' : '#35004c',
            //       '&:hover': {
            //         color: colorScheme === 'light' ? 'red' : 'black',
            //       },
            //       gradient:
            //         colorScheme === 'light'
            //           ? { from: '#0CA678', to: 'blue', deg: 60 }
            //           : { from: '#59A5D8', to: '#84D2F6', deg: 35 },
            //     }),
            //   },
            // }),
            Button: Button.extend({
              defaultProps: {
                size: 'md',
                style: () => ({
                  transition:
                    'background-color 150ms ease, transform 150ms ease, opacity 150ms ease',
                  '&:hover': {
                    transform: 'translateY(1px) scale(0.95)',
                    opacity: 0.9,
                    filter: 'brightness(90%)',
                  },
                }),
              },
            }),
          },
        }}
      >
        <AppContextProvider>
          <ModalsProvider>
            <BrowserRouter>
              <Notifications />
              <UserContextProvider>
                <AccountSettingsContextProvider>
                  <AppShell padding="md">
                    <AppShell.Header
                      style={{
                        background:
                          colorScheme === 'light' ? '#64B5F6' : '#1A1B1E',
                      }}
                    >
                      <HeaderMenu />
                    </AppShell.Header>
                    <AppShell.Main style={{ marginTop: '6rem' }}>
                      <GoogleOAuthProvider clientId={googleClientId ?? ''}>
                        <Routes>{[...CommonRoutes, ...ProtectedRoutes]}</Routes>
                      </GoogleOAuthProvider>
                    </AppShell.Main>
                  </AppShell>
                </AccountSettingsContextProvider>
              </UserContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </ModalsProvider>
        </AppContextProvider>
      </MantineThemeProvider>
    </>
  );
};

export default AppInner;
// https://wordwall.net/el/resource/14833090/english/can-and-cant-for-rules-2
