import { createStyles } from "@mantine/core";
import { LIGHT_MENT, NAVY } from "../../../../Theme/Theme";
export const useStyles = createStyles(() => ({
  modal: {
    ":root": {
      backgroundColor: "black",
    },
  },
  form: {
    padding: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: NAVY,
  },

  submitButton: {
    display: "inline-block",
    width: "100%",
    marginTop: 10,
    "&:hover": {
      backgroundColor: LIGHT_MENT,
    },
  },
  inputLabels: {
    fontWeight: 700,
  },
  dividerLabel: {
    color: NAVY,
  },
  switchAuthLinks: {
    alignItems: "center",
    padding: 10,
  },
  switchAuthLinkAnchor: {
    marginLeft: 8,
  },
  imageContainer: {
    borderRadius: "50%",
  },
}));
export const root = () => {
  return 'backgroundColor: "black"';
};
