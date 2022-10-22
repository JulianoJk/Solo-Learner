import { createStyles } from "@mantine/core";
export const useStyles = createStyles(() => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  profileImage: {
    margin: 30,
  },
  modalButtons: {
    margin: 10,
    right: 0,
    bottom: 0,
  },
  modalRoot: {
    ":root": {
      width: 500,
      height: 1300,
    },
  },
}));
