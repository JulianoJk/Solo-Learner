import Index from './components/Pages/Index/Index';
import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import NavigationNormal from './components/Header/Navigation/NavigationNormal';
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
// import SmallNavigation from './components/Header/Navigation/SmallNavigation';
import DeleteAccount from './components/Pages/Settings/TempOther/DeleteAccount/DeleteAccount';
import { checkIfPageIsReload, isUserLoggedIn } from './lib/dist';
import { AccountSettingsContextProvider } from './context/AccountSettingsContext';
import { AppContextProvider } from './context/AppContext';
import { useEffect, useState } from 'react';
import {
  AvatarDefaultProps,
  ButtonDefaultProps,
} from './Styles/DefaultPropsStyles.styles';
import Grammar from './components/Pages/LearningUnits/Grammar/Grammar';
import Theory from './components/Pages/LearningUnits/Theory/Theory';
import Exercises from './components/Pages/LearningUnits/Exercises/Exercises';
import Vocabulary from './components/Pages/LearningUnits/Vocabulary/Vocabulary';
import HeaderMenu from './components/Header/HeaderMenu.component';
import NotFound from './components/Pages/Error/pageNotFound/NotFound.component';
import AuthenticationLoginForm from './components/Auth/Login/AuthenticationLoginForm';
import AuthenticationRegisterForm from './components/Auth/Login/AuthenticationRegisterForm';
import Settings from './components/Pages/Settings/Settings.component';
import AdminDashboard from './components/admin/AdminDashboard.component';

const App = () => {
  const queryClient = new QueryClient();
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
                    <AppShell
                      padding="md"
                      // navbar={<>{isAdminPath ? <NavBar /> : <></>}</>}
                      header={<HeaderMenu />}
                    >
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route
                          path="/login"
                          element={
                            <AuthenticationLoginForm
                              hasBorder={true}
                              switchToRegister={true}
                            />
                          }
                        />
                        <Route
                          path="/register"
                          element={<AuthenticationRegisterForm />}
                        />
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
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

                        <Route
                          path="/admin/dashboard"
                          element={<AdminDashboard />}
                        />

                        <Route
                          path="/*"
                          // element={isUserLoggedIn() ? <Home /> : <Index />}
                          element={
                            <NotFound
                              navigationPath={isUserLoggedIn() ? '/home' : '/'}
                              statusNumber={404}
                            />
                          }
                        />
                      </Routes>
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
