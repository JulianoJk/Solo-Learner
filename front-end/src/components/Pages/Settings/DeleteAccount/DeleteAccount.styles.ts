import { createStyles } from "@mantine/core";
import { LIGHT_MENT, NAVY, LIGHT_NAVY } from "../../../../Theme/Styles";
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
  notification: {
    ":root": {
      backgroundColor: LIGHT_NAVY,
      border: "1px solid black",
    },
  },
}));
