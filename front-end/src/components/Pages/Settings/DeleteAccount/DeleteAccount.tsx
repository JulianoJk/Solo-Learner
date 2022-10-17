import React, { useState } from "react";
import {
  Modal,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Center,
} from "@mantine/core";
import { Mail, Lock, Trash } from "tabler-icons-react";
import { AlertComponent } from "../../../AlertComponent/AlertComponent";
import { deleteAccountAPI } from "../../../api/api";
import { useMutation } from "@tanstack/react-query";
import { isUndefinedOrNullString } from "../../../../lib/dist";
import { root, useStyles } from "./DeleteAccount.styles";
import { LIGHT_NAVY } from "../../../../Theme/Theme";

const DeleteAccount = () => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    mutate: deleteAccount,
    isLoading,
    status,
  } = useMutation(deleteAccountAPI, {
    onSuccess: (data) => {
      const hasToken = !isUndefinedOrNullString(data?.token);

      // userDispatch({ type: "RESET", user: user });
      // navigate("/index");
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
      deleteAccount({ email, password });
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
