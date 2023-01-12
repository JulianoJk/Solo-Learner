import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  "*": {
    border: `1px solid ${theme.colors.red}`,
  },

  ssss: {
    fill: theme.fn.linearGradient(56, " #2cf6b3", "#c1aac0"),
    backgroundColor: theme.fn.linearGradient(56, " #2cf6b3", "#c1aac0"),
    
  },
  "h1, h2, h3, h4, h5, h6": {
    color:
      theme.colorScheme === "light" ? theme.colors.blue : theme.colors.yellow,
  },
  text: {
    color: theme.colors.black,
  },
}));
