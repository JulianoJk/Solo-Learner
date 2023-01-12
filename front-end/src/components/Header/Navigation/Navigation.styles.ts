import { createStyles } from "@mantine/core";
import {
  MAIN_CHART_COLORS,
  NAVY,
  LIME_GREEN,
  TRANSPARENT_CHART_COLORS,
} from "../../../Theme/Styles";

export const useStyles = createStyles((theme) => ({
  headerRoot: {
    backgroundImage:
      theme.colorScheme === "light"
        ? theme.fn.linearGradient(300, " #2cf6b3", "#c1aac0")
        : theme.fn.linearGradient(300, " #161b22", "#21262d"),

    borderBottom: `2px solid ${MAIN_CHART_COLORS[2]}`,
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
      color: NAVY,
    },
    paddingLeft: 10,
  },
  buttonsHeader: {
    userSelect: "none",
  },
}));
