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
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserContextProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default App;
