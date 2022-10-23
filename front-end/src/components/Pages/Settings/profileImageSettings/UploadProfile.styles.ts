import { createStyles } from "@mantine/core";
export const useStyles = createStyles(() => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  profileImage: {
    margin: 30,
  },
  modalButtons: {
    marginTop: 10,
  },
  imagePreview: {
    width: 240,
    marginLeft: "auto",
    marginRight: "auto",
  },
  imagePreviewContainer: {
    border: "1px solid red",
  },
}));
