import { showNotification } from "@mantine/notifications";
import React from "react";
interface INotificationAlert {
  title: string;
  message: string;
  status?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  closeAfter?: number;
}
export const notificationAlert = (props: INotificationAlert) => {
  showNotification({
    title: props.title,
    message: props.message,
    autoClose: props.closeAfter ?? 2000,
    icon: props.icon,
    color: props.iconColor,
    style: {
      minHeight: "7vh",
    },
  });
};
