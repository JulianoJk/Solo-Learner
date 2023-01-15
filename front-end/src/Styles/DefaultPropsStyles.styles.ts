import { ButtonProps } from "@mantine/core";

export const ButtonDefaultProps: Partial<ButtonProps> = {
  size: "xs",

  sx: (theme) => ({
    "&:hover": {
      color:
        theme.colorScheme === "light"
          ? theme.fn.darken(theme.colors.gray[0], 0.1)
          : "#F5F5F5",
      backgroundColor: theme.fn.darken(theme.colors.cyan[9], 0.05),
    },
    color: theme.colorScheme === "light" ? "#F5F5F5" : "#F5F5F5",
    backgroundColor: theme.colorScheme === "light" ? "#0CA678" : "#7e57c2", //"#3f51b5", "#5c6bc0", " #7e57c2"
  }),
};

export const AvatarDefaultProps: Partial<ButtonProps> = {
  size: "md",

  sx: (theme) => ({
    backgroundColor: theme.colorScheme === "light" ? "#004a44" : "#35004c",
    "&:hover": {
      color: theme.colorScheme === "light" ? "red" : "black",
    },
    gradient:
      theme.colorScheme === "light"
        ? { from: "#0CA678", to: "blue", deg: 60 }
        : { from: "#59A5D8", to: "#84D2F6", deg: 35 },
  }),
};
