import { Center, Stack } from "@mantine/core";
import LogoImage from "../../../images/Logo";
import { useStyles } from "./Index.styles";
// import { showNotification, hideNotification } from "@mantine/notifications";

const Index: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Center>
      <Stack>
        {/* container for the logo */}
        <div className={classes.logoContainer}>
          <LogoImage height="100%" width="100%" />
        </div>
        <div>
          <em>Learn foreign languages with fun!</em>
        </div>
      </Stack>
    </Center>
  );
};

export default Index;
