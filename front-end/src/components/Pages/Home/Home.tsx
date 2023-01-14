import React from "react";

import Grammar from "../LearningUnits/Grammar/Grammar";
import Theory from "../LearningUnits/Theory/Theory";
import Vocabulary from "../LearningUnits/Vocabulary/Vocabulary";
import { useStyles } from "./Home.styles";
import { Center, SimpleGrid } from "@mantine/core";

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
        <Theory />
        <Grammar />
        <Vocabulary />
      </SimpleGrid>
    </Center>
  );
};

export default Home;
