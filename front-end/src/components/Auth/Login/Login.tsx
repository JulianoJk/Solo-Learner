import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {  useTaskDispatch } from '../../../context/TaskContext';
import { dispatchContext, IUserContext } from '../../../Model/models';
import { Button } from '../../button/Button.component';
import auth from "../../../images/auth.jpg";
import '../Auth.css';

const Login:React.FC = ()=> {
  const navigate: NavigateFunction = useNavigate();
  
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const taskDispatch: dispatchContext = useTaskDispatch();

  // Email handler	
  const onEmailChange = (e: React.BaseSyntheticEvent):void => {
		setEmail(e.target.value);
	};
  // Password handler
	const onPasswordChange = (e: React.BaseSyntheticEvent):void => {
		setPassword(e.target.value);
	};
	
	const handleInputs = async (e: React.BaseSyntheticEvent) =>{
		e.preventDefault();

		const response = await fetch('http://localhost:3001/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
  		const data: IUserContext = await response.json();
		// If response is true(200) continue
		if(response.ok){
			const user: IUserContext = {
				id: data['id'],
				username: data['username'],
				token: data['token'],
			};
			taskDispatch({ type: 'SET_USER', user: user });
			taskDispatch({ type: 'SET_IS_LOGGED_IN', isLoggedIn: true });
			navigate('/home');
		}else{
			alert("Please try again!")
		}
	}

  return (
	<div className="container flex-column input-container w-50 p-3 border border_style">
		<div>
			<img src={auth} alt="Logo" className="rounded mx-auto d-block " />
			<h1 className="title">Login</h1>
		</div>
    	<form onSubmit={handleInputs}>
			<label htmlFor="email" className="control-label text">
				<strong>Email:</strong>
			</label>
			<input
				type="email"
				className="form-control email-icon"
				value={email}
				id="email"
				placeholder="name@example.com"
				onChange={onEmailChange}
				autoComplete="on"
			/>
			<br />

			<label htmlFor="password" className="control-label text">
				<strong>Password:</strong>
			</label>
			
			<input
				type="password"
				value={password}
				className="form-control password-icon"
				id="password"
				onChange={onPasswordChange}
				placeholder="Password"
				autoComplete="on"
			/>
			<br />
				<div className="d-grid gap-2">
					<Button text={'Submit'} />
				</div>
		</form>
    </div>
  )
}
export default Login;