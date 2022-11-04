import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IUserInfoContext, usersDispatchContext } from "../../../Model/models";

import AuthImage from "../../../images/Auth";

import { Link } from "react-router-dom";
import { useUserDispatch } from "../../../context/UserContext";
import {
  PasswordInput,
  Button,
  Box,
  TextInput,
  Anchor,
  Center,
} from "@mantine/core";
import { AlertComponent } from "../../AlertComponent/AlertComponent";
import { loginAPI } from "../../api/api";

import { useStyles } from "../Auth.styles";
import { useMutation } from "@tanstack/react-query";
import { Mail, Lock, Eye, EyeOff } from "tabler-icons-react";
import { isUndefinedOrNullString } from "../../../lib/dist";

const Login: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const { classes } = useStyles();
  const [errorMessage, setErrorMessage] = useState<any>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const userDispatch: usersDispatchContext = useUserDispatch();

  const { mutate: login, isLoading } = useMutation(loginAPI, {
    onSuccess: (data) => {
      const hasToken = !isUndefinedOrNullString(data?.token);

      if (typeof data?.message === "string" || data instanceof String) {
        setErrorMessage(data?.message);
      } else if (!hasToken) {
        setErrorMessage("Something went wrong...");
      } else if (hasToken) {
        const user: IUserInfoContext = {
          id: data?.id,
          username: data?.username,
          token: data?.token,
        };
        userDispatch({ type: "SET_USER", user: user });
        navigate("/home");
      }
    },
  });
  const onEmailChange = (e: React.BaseSyntheticEvent): void => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.BaseSyntheticEvent): void => {
    setPassword(e.target.value);
  };

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      login({ email, password });
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(()=>{
    
  })

  return (
    <Box sx={{ maxWidth: 600 }} mx="auto" className={classes.border_style}>
      <Center>
        <AuthImage />
      </Center>
      <h1 className={classes.title}>Log-In</h1>
      <form onSubmit={handleInputs} className={classes.form}>
        <TextInput
          icon={<Mail />}
          required
          type="email"
          label={<span className={classes.inputLabels}>Email:</span>}
          placeholder="name@example.com"
          value={email}
          onChange={onEmailChange}
          autoComplete="on"
        />

        <PasswordInput
          icon={<Lock />}
          required
          label={<span className={classes.inputLabels}>Password:</span>}
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <EyeOff size={16} /> : <Eye size={16} />
          }
          autoComplete="on"
        />
        <Button
          color="cyan"
          type="submit"
          className={classes.submitButton}
          loading={isLoading}
          uppercase
        >
          Login
        </Button>

        {/*Display error message if any*/}
        <AlertComponent message={errorMessage} />
      </form>
      <span className={classes.switchAuthLinks}>
        New to Solo Learner?
        <Anchor
          component={Link}
          to="/register"
          className={classes.switchAuthLinkAnchor}
        >
          Create an account
        </Anchor>
      </span>
    </Box>
  );
};
export default Login;
