import { createStyles } from "@mantine/core";
import { MAIN_CHART_COLORS, NAVY } from "../../../Theme/Theme";

export const useStyles = createStyles((props) => ({
  headerRoot: {
    backgroundColor: "transparent",
    borderBottom: `2px solid ${MAIN_CHART_COLORS[2]}`,
    marginBottom: 20,
  },
  logo: {
    position: "absolute",
    top: -40,
    left: 0,
  },
  menuDropDown: {
    backgroundColor: "#d3efd4",
  },
  menuItems: {
    fontWeight: 600,
    ":hover": {
      color: NAVY,
    },
  },
}));
