import React from "react";
import { useUserState } from "../../../context/UserContext";
import Grammar from "../LearningUnits/Grammar/Grammar";
import Theory from "../LearningUnits/Theory/Theory";
import Vocabulary from "../LearningUnits/Vocabulary/Vocabulary";
import { useStyles } from "./Home.styles";
import { Center, Grid, Group, SimpleGrid } from "@mantine/core";

const Home: React.FC = () => {
  const { classes } = useStyles();
  return (
    <Center>
      <SimpleGrid
        cols={2}
        spacing="xl"
        verticalSpacing="xl"
        className={classes.sectionContainer}
      >
        <Grammar />
        <Grammar />
        <Grammar />
        <Vocabulary />
      </SimpleGrid>
    </Center>
  );
};

export default Home;
