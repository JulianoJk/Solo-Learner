import { createStyles } from '@mantine/core';
import {
  MAIN_CHART_COLORS,
  NAVY,
  LIME_GREEN,
  TRANSPARENT_CHART_COLORS,
} from '../../../Theme/Theme';

export const useStyles = createStyles((props) => ({
  headerRoot: {
    backgroundColor: LIME_GREEN,
    borderBottom: `2px solid ${MAIN_CHART_COLORS[2]}`,
    marginBottom: 20,
  },
  logo: {
    position: 'absolute',
    top: -40,
    left: 0,
  },
  menuDropDown: {
    backgroundColor: TRANSPARENT_CHART_COLORS[6],
  },
  menuItems: {
    fontWeight: 600,
    ':hover': {
      color: NAVY,
    },
    paddingLeft: 10,
  },
  buttonsHeader: {
    userSelect: 'none',
  },
}));
