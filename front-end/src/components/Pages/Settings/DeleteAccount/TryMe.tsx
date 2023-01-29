import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { MoodSad } from "tabler-icons-react";
import { useUserDispatch, useUserState } from "../../../../context/UserContext";
import { isUndefinedOrNullString } from "../../../../lib/dist";
import { deleteAccountAPI, testmeAPI } from "../../../api/api";

export default function TryMe() {
  const [password, setPassword] = useState<string>("");
  const { user } = useUserState();
  const userDispatch = useUserDispatch();
  const id = !isUndefinedOrNullString(user.id) ? user.id : undefined;
  const {
    mutate: deleteAccount,
    isLoading,
    status,
  } = useMutation(testmeAPI, {
    onSuccess: (data) => {
      showNotification({
        id: "deletedAccount",
        message: data,
        autoClose: 6000,
        // style: { backgroundColor: LIGHT_NAVY, border: "1px solid black" },
        icon: <MoodSad />,
      });
      console.log("Done!");
    },
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (/^\S+$/.test(value) ? null : "Invalid password"),
    },
  });

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const emails = form.values.email;
    const passwords = form.values.password;
    try {
      deleteAccount({ id, emails, password });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
