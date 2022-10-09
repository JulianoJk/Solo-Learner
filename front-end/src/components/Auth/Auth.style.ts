import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  border_style: {
    borderWidth: "2px !important",
    borderRadius: 20,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    background: "linear-gradient(#2CF6B3, #C1AAC0, #DE6C83 )",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordIcon: {
    paddingLeft: "25px",
    background: 'url("../../images/password.png") no-repeat left',
    backgroundColor: "white",
    backgroundSize: "25px",
  },
  emailIcon: {
    paddingLeft: "25px",
    background: ' url("../../images/email.png") no-repeat left',
    backgroundColor: "white",
    backgroundSize: "25px",
  },
  userIcon: {
    paddingLeft: "25px",
    background: 'url("../../images/username-icon.png") no-repeat left',
    backgroundColor: "white",
    backgroundSize: "25px",
  },

  submitButton: {
    color: "red",
  },
}));
