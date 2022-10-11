import { createStyles } from "@mantine/core";
import { SECONDARY_CHART_COLORS } from "../../../Theme/Theme";
export const useStyles = createStyles(() => ({
  root: {
    backgroundColor: SECONDARY_CHART_COLORS[2],
  },
  sectionContainer: {
    width: 300,
    borderRadius: "50%",
    display: "inline-block",
  },
}));
