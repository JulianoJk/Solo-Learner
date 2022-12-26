import Index from "./components/Pages/Index/Index";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Profile from "./components/Pages/Profile/Profile";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NavigationNormal from "./components/Header/Navigation/NavigationNormal";
import { UserContextProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import PageNotFound from "./components/Pages/pageNotFound/PageNotFound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";
import SmallNavigation from "./components/Header/Navigation/SmallNavigation";
import DeleteAccount from "./components/Pages/Settings/DeleteAccount/DeleteAccount";
import SettingsComponent from "./components/Pages/Settings/Settings.component";
import { isUserLoggedIn } from "../src/lib/dist";
import { AccountSettingsContextProvider } from "./context/AccountSettingsContext";
import { AppContextProvider } from "./context/AppContext";

const App = () => {
  const queryClient = new QueryClient();
  const isSmallWindow = useMediaQuery("(min-width: 650px)");

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          activeStyles: { transform: "scale(0.95)" },
          colorScheme: "light",
          colors: {},
        }}
      >
        <AppContextProvider>
          <ModalsProvider>
            <NotificationsProvider>
              <BrowserRouter>
                <UserContextProvider>
                  <AccountSettingsContextProvider>
                    {isSmallWindow ? <NavigationNormal /> : <SmallNavigation />}
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
                      <Route path="/settings" element={<SettingsComponent />} />

                      <Route
                        path="/*"
                        element={isUserLoggedIn() ? <Home /> : <Index />}
                      />
                    </Routes>
                  </AccountSettingsContextProvider>
                </UserContextProvider>
              </BrowserRouter>
              <ReactQueryDevtools initialIsOpen={false} />
            </NotificationsProvider>
          </ModalsProvider>
        </AppContextProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
