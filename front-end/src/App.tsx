/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import DeleteAccount from './components/Pages/Settings/TempOther/DeleteAccount/DeleteAccount';
import { checkIfPageIsReload, isUserLoggedIn } from './utils/utils';
import { AccountSettingsContextProvider } from './context/AccountSettingsContext';
import { AppContextProvider } from './context/AppContext';
import { useEffect, useState } from 'react';
import {
  AvatarDefaultProps,
  ButtonDefaultProps,
} from './Styles/DefaultPropsStyles.styles';
import HeaderMenu from './components/Header/HeaderMenu.component';
import NotFound from './components/Pages/Error/pageNotFound/NotFound.component';
import AuthenticationLoginForm from './components/Auth/Login/AuthenticationLoginForm';
import AuthenticationRegisterForm from './components/Auth/Login/AuthenticationRegisterForm';
import Settings from './components/Pages/Settings/Settings.component';
import Admin from './components/admin/Admin.component';
import Grammar from './components/Pages/LearningUnits/Grammar/Grammar';
import Theory from './components/Pages/LearningUnits/Theory/Theory';
import Vocabulary from './images/Vocabulary';
import Exercises from './components/Pages/LearningUnits/Exercises/Exercises';
import Index from './components/Pages/Index/Index';
import ForbiddenPage from './components/Pages/Error/forbidden/Forbidden.component';
import { getGoogleClientIdAPI } from './components/api/api';

const App = () => {
  const queryClient = new QueryClient();
  const [clientId, setClientId] = useState('');

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  // const isAdminPath = window.location.pathname.includes('/admin');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const appTheme: any = localStorage.getItem('app-theme');
    if (checkIfPageIsReload()) {
      if (appTheme !== null) {
        const appThemes = JSON.parse(appTheme);
        toggleColorScheme(appThemes);
      }
    }
  });

  useEffect(() => {
    const fetchGoogleClientId = async () => {
      try {
        const clientId = await getGoogleClientIdAPI();
        // Do something with the clientId, e.g., store it in state.
        setClientId(clientId);
      } catch (error) {
        console.error('Failed to fetch Google Client ID:', error);
        // Handle the error, e.g., show an error message.
      }
    };

    fetchGoogleClientId();
  });
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
                    ? theme.fn.linearGradient(7, '#F8BBD0', '#64B5F6') //OR "#4CAF50", "#2196F3"
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
                      {/* <GoogleOAuthProvider clientId={clientId}> */}
                      <GoogleOAuthProvider
                        clientId={
                          '1000892995039-p5u6pu6h88nilovjnbts0m48mp4lbtqb.apps.googleusercontent.com'
                        }
                      >
                        <Routes>
                          {/* <Route path="/" element={<Index />} /> */}
                          <Route path="/" element={<Index />} />
                          <Route
                            path="/login"
                            element={
                              <AuthenticationLoginForm
                                hasBorder
                                switchToRegister
                                showNotification
                              />
                            }
                          />
                          <Route
                            path="/register"
                            element={
                              <AuthenticationRegisterForm
                                displaySocialButtons
                                hasBorder
                                switchToLogin
                                showNotification
                                refreshPageAfterRegister
                              />
                            }
                          />
                          <Route path="/home" element={<Home />} />
                          <Route
                            path="/profile/:username"
                            element={<Profile />}
                          />

                          <Route path="/settings" element={<Settings />} />
                          <Route
                            path="/delete-account"
                            element={<DeleteAccount />}
                          />

                          <Route
                            path="/learning-units/grammar"
                            element={<Grammar />}
                          />
                          <Route
                            path="/learning-units/theory"
                            element={<Theory />}
                          />
                          <Route
                            path="/learning-units/vocabulary"
                            element={<Vocabulary />}
                          />
                          <Route
                            path="/learning-units/exercises"
                            element={<Exercises />}
                          />

                          <Route path="/admin/dashboard" element={<Admin />} />

                          <Route
                            path="/*"
                            // element={isUserLoggedIn() ? <Home /> : <Index />}
                            element={
                              <NotFound
                                navigationPath={
                                  isUserLoggedIn() ? '/home' : '/'
                                }
                                statusNumber={404}
                              />
                              // <ForbiddenPage navigationPath={''} />
                            }
                          />
                        </Routes>
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
