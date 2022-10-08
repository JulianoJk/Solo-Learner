import React from 'react';
import { useTaskState } from '../../../context/UserContext';

const Home:React.FC = () => {
	const {isLoggedIn} = useTaskState();

	if (isLoggedIn) {
		return (
			<div>
				<h1>Welcome back</h1>
			</div>
		);
	} else {
		return (
			<div>
				<h1> No Account found! Log-In/Register to proceed!</h1>
			</div>
		);
	}
};

export default Home;