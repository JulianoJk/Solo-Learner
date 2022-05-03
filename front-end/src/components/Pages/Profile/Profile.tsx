import { useTaskState } from '../../../context/TaskContext';

const Profile:React.FC = ()=> {
	const taskState = useTaskState();
	const isLoggedIn = taskState.isLoggedIn;

	if (isLoggedIn) {
		return (
			<div>
				<h1> Welcome Back {taskState.user.username}! </h1>
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
export default Profile;