import { showNotification } from "@mantine/notifications";
import React from "react";
interface INotificationAlert {
  title: string;
  message: string;
  status?: string;
  icon?: React.ReactNode;
  iconColor?: string;
}
export const notificationAlert = (props: INotificationAlert) => {
  showNotification({
    title: props.title,
    message: props.message,
    autoClose: 3500,
    icon: props.icon,
    color: props.iconColor,
  });
};
