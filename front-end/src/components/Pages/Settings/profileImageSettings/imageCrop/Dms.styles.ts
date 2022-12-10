import { createStyles } from "@mantine/core";
export const useStyles = createStyles(() => ({
  cropContainer: {
    maxWidth: "20rem",
    height: 250,
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
}));
