import { createStyles } from "@mantine/core";
import { ERROR_DARK_COLOR } from "../../../../Theme/Styles";

export const useStyles = createStyles((theme) => ({
  buttonContainer: {
    backgroundColor: `${theme.colors.red[8]}`,
    "&: hover": {
      backgroundColor: ERROR_DARK_COLOR,
    },
  },
  inputLabels: {
    fontWeight: 700,
  },
}));