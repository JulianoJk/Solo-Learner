import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  usersDispatchContext,
  EActionTypes,
  IAuthCredentials,
  IUserInfoContext,
} from "../../../Model/models";
import { useUserDispatch } from "../../../context/UserContext";
import auth from "../../../images/auth.jpg";
import {
  Box,
  Button,
  Center,
  Image,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useStyles } from "../Auth.style";

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
    <Box sx={{ maxWidth: 540 }} mx="auto" className="border">
      <Center>
        <Image radius="md" src={auth} alt="Logo" />
      </Center>
      <h1 className="title">Register</h1>
      <form onSubmit={handleInputs}>
        <TextInput
          type="email"
          value={initState.email}
          className={classes.emailIcon}
          id="email"
          placeholder="name@example.com"
          onChange={onEmailChange}
          required={true}
          minLength={5}
          autoComplete="on"
        />
        <TextInput
          type="text"
          label="Username"
          value={initState.username}
          // className="form-control user-icon"
          className={classes.userIcon}
          id="Username"
          placeholder="John Smith"
          onChange={onNameChange}
          autoComplete="on"
        />
        <br />
        <label htmlFor="password">
          <strong>Password:</strong>
        </label>{" "}
        <PasswordInput
          type="password"
          value={initState.password}
          className={classes.passwordIcon}
          id="password"
          placeholder="Password"
          onChange={handlePassword}
          required={true}
          minLength={6}
          autoComplete="on"
          label="Password"
        />
        <PasswordInput
          type="password"
          value={initState.passwordRepeat}
          className={classes.passwordIcon}
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleConfirmPassword}
          required={true}
          minLength={6}
          autoComplete="on"
          label="Confirm Password"
        />
        <Button type="submit">Submit</Button>
      </form>
      <Link to="/login" className="text flex-wrap link-light">
        Already a member?
      </Link>
    </Box>
  );
};
export default Register;
