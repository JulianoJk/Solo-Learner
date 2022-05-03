import Index from './components/Pages/Index/Index';
import Home from './components/Pages/Home/Home';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Profile from './components/Pages/Profile/Profile';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import  {TaskContextProvider}  from './context/TaskContext';
import './App.css';

const App = ()=> {
	return (
		<div>
			<BrowserRouter>
				<TaskContextProvider>
					<Navigation />
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</TaskContextProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
