import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from "@mantine/form";
import {
  Button,
  Group,
  TextInput,
  NumberInput,
  Box,
  PasswordInput,
  Modal,
} from "@mantine/core";
import { AppDispatch } from "../../../../context/AppContext";
import { useState } from "react";
import { notificationAlert } from "../../../notifications/NotificationAlert";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function MantineDemo() {
  const navigate: NavigateFunction = useNavigate();
  const appDispatch = AppDispatch();
  const [errorMessage, setErrorMessage] = useState<any>();
  const [opened, setOpened] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Invalid email"),
      password: hasLength(
        { min: 6, max: 60 },
        "Password must be at least 6 characters!"
      ),
    },
  });

  const handleConfirm = () => {
    if (form.validate().hasErrors) {
      return;
    } else {
      notificationAlert({
        title: "Account Deleted.",
        message: "We're sorry to see you go:(. ",
        iconColor: "red",
        closeAfter: 3000,
      });
      navigate("/home");
    }
  };
  return (
    <>
      <Modal
        title="Delete your profile"
        transition="fade"
        centered
        transitionDuration={100}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        overlayBlur={4}
        withCloseButton={false}
      >
        <Box
          component="form"
          maw={400}
          mx="auto"
          onSubmit={form.onSubmit(() => {})}
        >
          <TextInput
            label="Email: "
            placeholder="test@email.com"
            withAsterisk
            mt="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password: "
            withAsterisk
            {...form.getInputProps("password")}
          />
          <Group position="right" mt="md">
            <Button onClick={() => setOpened(false)} color={"gray"}>
              No don't delete it
            </Button>
            <Button type="submit" color={"red"} onClick={() => handleConfirm()}>
              Confirm
            </Button>
          </Group>
        </Box>
      </Modal>
      <Group position="center">
        <Button onClick={() => setOpened(true)} color={"red"}>
          Delete Account
        </Button>
      </Group>
    </>
  );
}
