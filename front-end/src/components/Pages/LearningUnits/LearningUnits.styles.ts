import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  root: {
    border: "1px solid black",
    // borderRadius: 530,
    backgroundColor: theme.colorScheme === "light" ? "#E5D8D0" : "#21262d",
    textAlign: "center",
    // height: 300,
    height: "100%",
  },
  sectionContainer: {
    width: 500,
    height: 400,
  },
  imageContainer: {
    borderRadius: "70%",
    border: "10px solid red",
  },
}));
