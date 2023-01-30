import { Button, Text, useMantineTheme } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ERROR_DARK_COLOR } from "../../../../Theme/Styles";
import { notificationAlert } from "../../../notifications/NotificationAlert";
import { useStyles } from "./DeleteAccount.styles";

export default function Demo() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate: NavigateFunction = useNavigate();

  // const { mutate: deleteAccount, isLoading } = useMutation(loginAPI, {
  //   onSuccess: (data) => {
  //     const hasToken = !isUndefinedOrNullString(data?.token);

  //     if (typeof data?.message === "string" || data instanceof String) {
  //       setErrorMessage(data?.message);
  //     } else if (!hasToken) {
  //       setErrorMessage("Something went wrong...");
  //     } else if (hasToken) {
  //       const user: IUserInfoContext = {
  //         id: data?.id,
  //         username: data?.username,
  //         token: data?.token,
  //       };
  //       props.refreshPageAfterLogin === true ? window.location.reload() : "";
  //       userDispatch({ type: "SET_USER", user: user });
  //       navigate(navigateTo);
  //       props.showNotification === false ? (
  //         <></>
  //       ) : (
  //         notificationAlert({
  //           title: "Login Successful!",
  //           message: "Great to see you! You're all set to go.",
  //           icon: <IconCheck size={18} />,
  //           iconColor: "teal",
  //         })
  //       );
  //     }
  //   },
  // });

  const handlConfirm = () => {
    notificationAlert({
      title: "Account Deleted.",
      message: "We're sorry to see you go:(. ",
      iconColor: "red",
      closeAfter: 3000,
    });
    navigate("/home");
  };
  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: {
        sx: {
          backgroundColor: theme.colors.red[7],
          "&: hover": {
            backgroundColor: ERROR_DARK_COLOR,
          },
        },
      },

      onCancel: () => console.log("Cancel"),
      onConfirm: () => handlConfirm(),
    });

  return (
    <Button onClick={openDeleteModal} className={classes.buttonContainer}>
      Delete account
    </Button>
  );
}
