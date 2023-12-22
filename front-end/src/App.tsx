import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  AvatarDefaultProps,
  ButtonDefaultProps,
} from './Styles/DefaultPropsStyles.styles';
import HeaderMenu from './components/Header/HeaderMenu.component';

import Admin from './components/admin/Admin.component';
import { getGoogleClientIdAPI } from './components/api/api';
import { checkIfPageIsReload } from './utils/utils';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Exercises from './components/Pages/LearningUnits/Exercises/Exercises';
import AuthenticationLoginForm from './components/Auth/Login/AuthenticationLoginForm';
import AuthenticationRegisterForm from './components/Auth/Login/AuthenticationRegisterForm';
import Home from './components/Pages/Home/Home';
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

const App = () => {
  const queryClient = new QueryClient();
  const [clientId, setClientId] = useState('');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const [loadingClientId, setLoadingClientId] = useState(true);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const appTheme: any = localStorage.getItem('app-theme');
    if (checkIfPageIsReload() && appTheme !== null) {
      const appThemes = JSON.parse(appTheme);
      toggleColorScheme(appThemes);
    }
  }, [window.location.pathname]);

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
    <Route
      key="/login"
      path="/login"
      element={
        <AuthenticationLoginForm hasBorder switchToRegister showNotification />
      }
    />,
    <Route
      key="/register"
      path="/register"
      element={
        <AuthenticationRegisterForm
          displaySocialButtons
          hasBorder
          switchToLogin
          showNotification
          isAdminRegister={false}
        />
      }
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
  ];
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{
            globalStyles: (theme) => ({
              '*, *::before, *::after': {
                boxSizing: 'border-box',
              },
              body: {
                overflow: 'auto',
                backgroundImage:
                  theme.colorScheme === 'light'
                    ? theme.fn.linearGradient(7, '#F8BBD0', '#64B5F6')
                    : theme.fn.linearGradient(7, '#1A1B1E'),
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[0]
                    : theme.black,
                lineHeight: theme.lineHeight,
              },
            }),
            components: {
              Avatar: { defaultProps: AvatarDefaultProps },
              Button: { defaultProps: ButtonDefaultProps },
            },
            colorScheme,
          }}
        >
          <AppContextProvider>
            <ModalsProvider>
              <BrowserRouter>
                <Notifications />
                <UserContextProvider>
                  <AccountSettingsContextProvider>
                    <AppShell padding="md" header={<HeaderMenu />}>
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
    </ColorSchemeProvider>
  );
};

export default App;
