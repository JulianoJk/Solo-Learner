import { createStyles } from "@mantine/core";
import { TRANSPARENT_CHART_COLORS } from "../../../Theme/Styles";

export const useStyles = createStyles((theme) => ({
  headerRoot: {
    backgroundImage:
      theme.colorScheme === "light"
        ? theme.fn.linearGradient(1, "#8CB6EA")
        : theme.fn.linearGradient(300, " #161b22", "#21262d"),

    borderBottom:
      theme.colorScheme === "light"
        ? `2px solid #7FAAE0`
        : `1px solid ${theme.colors.dark[5]}`,
    marginBottom: 20,
  },
  logo: {
    position: "absolute",
    top: -40,
    left: 0,
  },
  menuDropDown: {
    backgroundColor: TRANSPARENT_CHART_COLORS[6],
  },
  menuItems: {
    fontWeight: 600,
    ":hover": {
      color: "#495057",
    },
    paddingLeft: 10,
  },
  buttonsHeader: {
    userSelect: "none",
  },
  singInButton: {
    background:
      theme.colorScheme === "light"
        ? "#15AABF"
        : theme.fn.linearGradient(133, "#3f51b5", "#5c6bc0", " #7e57c2"),
    "&:hover": {
      root: {
        backgroundColor: "#00acee",
        border: 0,
        height: 72,
        paddingLeft: 20,
        paddingRight: 20,
      },
    },
  },
}));
