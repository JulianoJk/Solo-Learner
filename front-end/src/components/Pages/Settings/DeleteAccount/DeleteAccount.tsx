import React, { useState } from "react";
import {
  Modal,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Center,
} from "@mantine/core";
import { Mail, Lock, Trash, MoodSad } from "tabler-icons-react";
import { AlertComponent } from "../../../AlertComponent/AlertComponent";
import { deleteAccountAPI } from "../../../api/api";
import { useMutation } from "@tanstack/react-query";
import { isUndefinedOrNullString } from "../../../../lib/dist";
import { useStyles } from "./DeleteAccount.styles";
import { LIGHT_NAVY } from "../../../../Theme/Theme";
import { useUserDispatch, useUserState } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { showNotification, hideNotification } from "@mantine/notifications";

const DeleteAccount = () => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user } = useUserState();
  const navigate = useNavigate();
  const userDispatch = useUserDispatch();

  const id = !isUndefinedOrNullString(user.id) ? user.id : undefined;

  const {
    mutate: deleteAccount,
    isLoading,
    status,
  } = useMutation(deleteAccountAPI, {
    onSuccess: (data) => {
      showNotification({
        id: "deletedAccount",
        message: data,
        autoClose: 6000,
        // style: { backgroundColor: LIGHT_NAVY, border: "1px solid black" },
        className: classes.notification,
        icon: <MoodSad />,
      });

      userDispatch({ type: "RESET_STATE" });
      navigate("/");
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
      deleteAccount({ id, email, password });
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Delete account"
        styles={{ modal: { backgroundColor: LIGHT_NAVY } }}
      >
        <Center>
          <h1>
            Are you sure you want to delete your account? If yes, please fill
          </h1>
        </Center>
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
            autoComplete="on"
          />
          <Button
            color="cyan"
            type="submit"
            className={classes.submitButton}
            loading={isLoading}
            uppercase
          >
            Delete
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          variant="outline"
          color="pink"
          leftIcon={<Trash />}
        >
          Open Modal
        </Button>
      </Group>
    </>
  );
};
export default DeleteAccount;
