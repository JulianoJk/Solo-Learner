import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  usersDispatchContext,
  EActionTypes,
  IAuthCredentials,
  IUserInfoContext,
} from "../../../Model/models";
import { useUserDispatch } from "../../../context/UserContext";
import { Box, Button, Center, PasswordInput, TextInput } from "@mantine/core";
import { useStyles } from "../Auth.style";
import AuthImage from "../../../images/Auth";
import { Lock, Mail, UserCircle } from "tabler-icons-react";
// Initial state for the user credentials
const initState: IAuthCredentials = {
  email: undefined,
  username: undefined,
  password: undefined,
  passwordRepeat: undefined,
};

// Reducer to set credentials for the user
const reducer = (state: IAuthCredentials, action: IAuthCredentials) => {
  switch (action.type) {
    case EActionTypes.SET_EMAIL:
      return { ...state, email: action.email };
    case EActionTypes.SET_NAME:
      return { ...state, username: action.username };
    case EActionTypes.SET_PASSWORD:
      return { ...state, password: action.password };
    case EActionTypes.SET_CONFIRM_PASSWORD:
      return { ...state, passwordRepeat: action.passwordRepeat };
    default:
      return { ...state };
  }
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [internalState, formDispatch] = useReducer(reducer, initState);
  const userDispatch: usersDispatchContext = useUserDispatch();

  const { classes } = useStyles();

  // Email handler
  const onEmailChange = (e: React.BaseSyntheticEvent): void => {
    formDispatch({ type: EActionTypes.SET_EMAIL, email: e.target.value });
  };

  const onNameChange = (e: React.BaseSyntheticEvent): void => {
    formDispatch({ type: EActionTypes.SET_NAME, username: e.target.value });
  };

  const handlePassword = (e: React.BaseSyntheticEvent): void => {
    formDispatch({ type: EActionTypes.SET_PASSWORD, password: e.target.value });
  };

  const handleConfirmPassword = (e: React.BaseSyntheticEvent): void => {
    formDispatch({
      type: EActionTypes.SET_CONFIRM_PASSWORD,
      passwordRepeat: e.target.value,
    });
  };

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    // Pass the values to the API call
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: internalState.email,
        username: internalState.username,
        password: internalState.password,
        passwordRepeat: internalState.passwordRepeat,
      }),
    });
    const data: IUserInfoContext = await response.json();
    // If response is true(200) continue
    if (response.ok) {
      const user: IUserInfoContext = {
        id: data["id"],
        username: data["username"],
        token: data["token"],
      };
      userDispatch({ type: "SET_USER", user: user });
      navigate("/home");
    } else {
      alert("Please try again!");
    }
  };

  return (
    <Box sx={{ maxWidth: 600 }} mx="auto" className={classes.border_style}>
      <Center>
        <AuthImage />
      </Center>
      <h1 className={classes.title}>Register</h1>
      <form onSubmit={handleInputs} className={classes.form}>
        <TextInput
          icon={<Mail />}
          type="email"
          value={initState.email}
          id="email"
          placeholder="name@example.com"
          onChange={onEmailChange}
          required={true}
          minLength={5}
          autoComplete="on"
          label={<span className={classes.inputLabels}>Email:</span>}
        />

        <TextInput
          type="text"
          icon={<UserCircle />}
          label={
            <span className={classes.inputLabels}>Username (optional):</span>
          }
          value={initState.username}
          id="Username"
          placeholder="John Smith"
          onChange={onNameChange}
          autoComplete="on"
        />

        <PasswordInput
          icon={<Lock />}
          type="password"
          value={initState.password}
          id="password"
          placeholder="Password"
          onChange={handlePassword}
          required={true}
          minLength={6}
          autoComplete="on"
          label={<span className={classes.inputLabels}>Password:</span>}
        />
        <PasswordInput
          icon={<Lock />}
          type="password"
          value={initState.passwordRepeat}
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleConfirmPassword}
          required={true}
          minLength={6}
          autoComplete="on"
          label={<span className={classes.inputLabels}>Confirm Password:</span>}
        />
        <Button
          type="submit"
          color="cyan"
          className={classes.submitButton}
          uppercase
        >
          register
        </Button>
      </form>
      <Link to="/login">Already a member?</Link>
    </Box>
  );
};
export default Register;
