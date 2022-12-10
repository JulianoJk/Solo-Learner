import { createStyles } from "@mantine/core";
export const useStyles = createStyles(() => ({
  cropContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    background: "#333",
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  sliderContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center",
  },
  slider: {
    padding: "22px 0px",
    marginLeft: 32,
  },
}));
