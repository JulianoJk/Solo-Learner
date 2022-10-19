import { Group, Button, Text } from "@mantine/core";
import { openConfirmModal, closeAllModals } from "@mantine/modals";
import { ERROR_DARK_COLOR, ERROR_LIGHT_COLOR } from "../../../../Theme/Theme";

export default function Demo() {
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
                    
                  <Text size="sm">
                    Are you sure you want to delete your profile? This action is
                    destructive!
                    All you data will be deleted for ever.
                  </Text>
                ),
                onConfirm: closeAllModals,
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
