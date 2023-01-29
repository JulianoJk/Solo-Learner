import {
  Group,
  Button,
  Text,
  Box,
  Checkbox,
  TextInput,
  NumberInput,
} from "@mantine/core";
import { openConfirmModal, closeAllModals } from "@mantine/modals";

import { useForm } from "@mantine/form";

export default function Demo() {
  const form = useForm({
    initialValues: {
      password: "secret",
      confirmPassword: "sevret",
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleConfirm = () => {
    closeAllModals();
    console.log("Deleted!");
  };

  return (
    <Group position="center">
      <Button
        onClick={() =>
          openConfirmModal({
            title: "Are you sure?",
            closeOnConfirm: false,
            labels: { confirm: "Yes, proceed", cancel: "Cancel" },
            color: "red",

            children: (
              <Text size="md">
                Are you sure you want to delete your account? This action is
                invertible!
              </Text>
            ),
            onConfirm: () =>
              openConfirmModal({
                title: "Delete Account",
                labels: {
                  confirm: "Delete Account",
                  cancel: "No, don't delete it",
                },
                closeOnConfirm: true,
                confirmProps: { color: "red" },
                children: (
                  <>
                    <form onSubmit={form.onSubmit(console.log)}>
                      <TextInput
                        label="Name"
                        placeholder="Name"
                        {...form.getInputProps("name")}
                      />
                      <TextInput
                        mt="sm"
                        label="Email"
                        placeholder="Email"
                        {...form.getInputProps("emails")}
                      />
                      <NumberInput
                        mt="sm"
                        label="Age"
                        placeholder="Age"
                        min={0}
                        max={99}
                        {...form.getInputProps("age")}
                      />
                      <Button type="submit" mt="sm">
                        Submit
                      </Button>
                    </form>
                  </>
                ),
                onConfirm: handleConfirm,
                onCancel: closeAllModals,
              }),
          })
        }
        color={"red"}
      >
        Delete Account
      </Button>
    </Group>
  );
}
