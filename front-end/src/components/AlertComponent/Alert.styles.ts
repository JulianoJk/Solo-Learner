import { createStyles } from "@mantine/core";
import {
  ERROR_VERY_LIGHT_COLOR,
  BLUE_GRAY,
  ERROR_DARK_COLOR,
} from "../../Theme/Theme";
export const useStyles = createStyles((props) => ({
  alertBox: {
    backgroundColor: ERROR_VERY_LIGHT_COLOR,
    color: BLUE_GRAY,
    margin: 10,
    border: `1px solid ${ERROR_DARK_COLOR}`,
  },
}));
