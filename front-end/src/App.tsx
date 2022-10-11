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

const App = () => {
  const queryClient = new QueryClient();

  const isLoggedIn = !!localStorage.getItem("user");
  console.log(isLoggedIn);

  return (
    <QueryClientProvider client={queryClient}>
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
              element={
                <PageNotFound
                  statusNumber={404}
                  navText="Sorry, the page you are looking for could not be found."
                  btnText="Go back!"
                  navigationPath={<Index />}
                />
              }
            />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
