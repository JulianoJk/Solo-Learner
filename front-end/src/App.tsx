import Index from "./components/Pages/Index/Index";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Profile from "./components/Pages/Profile/Profile";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navigation from "./components/Header/Navigation/Navigation";
import { UserContextProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import PageNotFound from "./components/Pages/pageNotFound/PageNotFound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

const App = () => {
  const queryClient = new QueryClient();

  const isLoggedIn = !!localStorage.getItem("user");
  console.log(isLoggedIn);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <ModalsProvider>
          <NotificationsProvider>
            <BrowserRouter>
              <UserContextProvider>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route
                    path="/*"
                    element={isLoggedIn ? <Home /> : <Index />}
                  />
                </Routes>
              </UserContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
