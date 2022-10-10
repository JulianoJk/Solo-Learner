import { createStyles } from "@mantine/core";
import { LIGHT_MENT } from "../../Theme/Theme";
export const useStyles = createStyles(() => ({
  border_style: {
    borderWidth: "2px !important",
    borderRadius: 5,
    boxShadow: "none",
    border: "1px solid grey",
    padding: 10,
    width: "100%",
  },
  form: {
    padding: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  submitButton: {
    display: "inline-block",
    width: "100%",
    marginTop: 10,
    "&:hover": {
      backgroundColor: LIGHT_MENT,
    },
  },
}));
