import { Center, Stack } from "@mantine/core";
import LogoImage from "../../../images/Logo";
import { useStyles } from "./Index.styles";
const Index: React.FC = () => {
  const { classes } = useStyles();
  return (
    <Center>
      <Stack>
        {/* container for the logo */}
        <div className={classes.logoContainer}>
          <LogoImage width="50%" height="100%" />
          <h2>
            <em>Learn foreign languages with fun!</em>
          </h2>
        </div>
      </Stack>
    </Center>
  );
};

export default Index;
