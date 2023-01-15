import Index from "./components/Pages/Index/Index";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Profile from "./components/Pages/Profile/Profile";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NavigationNormal from "./components/Header/Navigation/NavigationNormal";
import { UserContextProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import PageNotFound from "./components/Pages/pageNotFound/PageNotFound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";
import SmallNavigation from "./components/Header/Navigation/SmallNavigation";
import DeleteAccount from "./components/Pages/Settings/DeleteAccount/DeleteAccount";
import SettingsComponent from "./components/Pages/Settings/Settings.component";
import { checkIfPageIsReload, isUserLoggedIn } from "../src/lib/dist";
import { AccountSettingsContextProvider } from "./context/AccountSettingsContext";
import { AppContextProvider } from "./context/AppContext";
import { useEffect, useState } from "react";
import {
  AvatarDefaultProps,
  ButtonDefaultProps,
} from "./Styles/DefaultPropsStyles.styles";
import Grammar from "./components/Pages/LearningUnits/Grammar/Grammar";
import Theory from "./components/Pages/LearningUnits/Theory/Theory";
import { Vocabulary } from "tabler-icons-react";
import Exercises from "./components/Pages/LearningUnits/Exercises/Exercises";
const App = () => {
  const queryClient = new QueryClient();
  const isSmallWindow = useMediaQuery("(min-width: 650px)");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    const appTheme: any = localStorage.getItem("app-theme");
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
              "*, *::before, *::after": {
                boxSizing: "border-box",
              },

              body: {
                backgroundImage:
                  theme.colorScheme === "light"
                    ? theme.fn.linearGradient(7, "#F8BBD0", "#64B5F6") //OR "#4CAF50", "#2196F3"
                    : theme.fn.linearGradient(7, "#1A1B1E"),
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,
                lineHeight: theme.lineHeight,
              },
            }),
            components: {
              Button: { defaultProps: ButtonDefaultProps },
              Avatar: { defaultProps: AvatarDefaultProps },
            },
            colorScheme,
          }}
        >
          <AppContextProvider>
            <ModalsProvider>
              <NotificationsProvider>
                <BrowserRouter>
                  <UserContextProvider>
                    <AccountSettingsContextProvider>
                      <AppShell
                        padding="md"
                        header={
                          isSmallWindow ? (
                            <NavigationNormal />
                          ) : (
                            <SmallNavigation />
                          )
                        }
                      >
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/home" element={<Home />} />
                          <Route path="/profile" element={<Profile />} />
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
                            path="/learning-units/settings"
                            element={<SettingsComponent />}
                          />

                          <Route
                            path="/*"
                            element={isUserLoggedIn() ? <Home /> : <Index />}
                          />
                        </Routes>
                      </AppShell>
                    </AccountSettingsContextProvider>
                  </UserContextProvider>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
              </NotificationsProvider>
            </ModalsProvider>
          </AppContextProvider>
        </MantineProvider>
      </QueryClientProvider>
    </ColorSchemeProvider>
  );
};

export default App;
