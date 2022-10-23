import { createStyles } from "@mantine/core";
import {
  LIGHTER_GRAY,
  TRANSPARENT_LIGHT_COLORS,
} from "../../../../Theme/Theme";
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
  modalContainer: {
    maxWidth: 900,
    minWidth: 200,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  imagePreview: {
    width: 240,
    marginLeft: "auto",
    marginRight: "auto",
  },
  imageDiv: {
    borderRadius: "50%",
  },
  dropzoneContainer: {
    width: "inherit",
    height: 400,
    border: 0,
    backgroundColor: LIGHTER_GRAY,
    ":hover": {
      backgroundColor: TRANSPARENT_LIGHT_COLORS[0],
    },
  },
  dropzoneLabel: {
    margin: "auto",
  },
}));
