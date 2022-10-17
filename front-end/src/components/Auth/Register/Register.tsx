import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersDispatchContext, IUserInfoContext } from "../../../Model/models";
import { useUserDispatch } from "../../../context/UserContext";
import {
  PasswordInput,
  Button,
  Box,
  TextInput,
  Anchor,
  Center,
} from "@mantine/core";
import { useStyles } from "../Auth.styles";
import AuthImage from "../../../images/Auth";
import { Eye, EyeOff, Lock, Mail, UserCircle } from "tabler-icons-react";
import { registerAPI } from "../../api/api";
import { AlertComponent } from "../../AlertComponent/AlertComponent";
import { useMutation } from "@tanstack/react-query";
import { isUndefinedOrNullString } from "../../../lib/dist";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const userDispatch: usersDispatchContext = useUserDispatch();
  const { classes } = useStyles();

  const [errorMessage, setErrorMessage] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");

  const { mutate: register, isLoading } = useMutation(registerAPI, {
    onSuccess: (data) => {
      const hasToken = isUndefinedOrNullString(data?.token);

      if (typeof data?.message === "string" || data instanceof String) {
        setErrorMessage(data?.message);
      } else if (hasToken) {
        setErrorMessage("Something went wrong...");
      } else if (!hasToken) {
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

  // Email handler
  const onEmailChange = (e: React.BaseSyntheticEvent): void => {
    setEmail(e.target.value);
  };

  const onNameChange = (e: React.BaseSyntheticEvent): void => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.BaseSyntheticEvent): void => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.BaseSyntheticEvent): void => {
    setPasswordRepeat(e.target.value);
  };

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    register({ email, username, password, passwordRepeat });
  };

  return (
    <Box sx={{ maxWidth: 600 }} mx="auto" className={classes.border_style}>
      <Center className={classes.imageContainer}>
        <AuthImage />
      </Center>
      <h1 className={classes.title}>Register</h1>
      <form onSubmit={handleInputs} className={classes.form}>
        <TextInput
          icon={<Mail />}
          type="email"
          value={email}
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
          value={username}
          id="Username"
          placeholder="John Smith"
          onChange={onNameChange}
          autoComplete="on"
        />

        <PasswordInput
          icon={<Lock />}
          value={password}
          placeholder="Password"
          onChange={handlePassword}
          required={true}
          minLength={6}
          autoComplete="on"
          label={<span className={classes.inputLabels}>Password:</span>}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <EyeOff size={16} /> : <Eye size={16} />
          }
        />
        <PasswordInput
          icon={<Lock />}
          required
          value={passwordRepeat}
          placeholder="Confirm Password"
          onChange={handleConfirmPassword}
          minLength={6}
          autoComplete="on"
          label={<span className={classes.inputLabels}>Confirm Password:</span>}
          defaultValue="secret"
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <EyeOff size={16} /> : <Eye size={16} />
          }
        />

        <Button
          color="cyan"
          type="submit"
          className={classes.submitButton}
          loading={isLoading}
          uppercase
        >
          Register
        </Button>
        <AlertComponent message={errorMessage} />
      </form>
      <span className={classes.switchAuthLinks}>
        Already a member?
        <Anchor
          component={Link}
          to="/login"
          className={classes.switchAuthLinkAnchor}
        >
          Log-In
        </Anchor>
      </span>
    </Box>
  );
};
export default Register;
