import { createStyles } from "@mantine/core";
import { LIGHT_MENT, DARK_NAVY } from "../../Theme/Styles";
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
  inputLabels: {
    fontWeight: 700,
  },
  switchAuthLinks: {
    alignItems: "center",
    padding: 10,
  },
  switchAuthLinkAnchor: {
    marginLeft: 8,
    textDecoration: 'underline'
  },
  imageContainer: {
    borderRadius: "50%",
  },
}));
