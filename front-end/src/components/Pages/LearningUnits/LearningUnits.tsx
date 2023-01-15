import { Card, Center, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import DictionaryIcon from "../../../images/DictionaryIcon";
import GrammarIcon from "../../../images/GrammarIcon";
import VocabularyImage from "../../../images/Vocabulary";
import { useStyles } from "./LearningUnits.styles";

const LearningUnits = () => {
  const { classes } = useStyles();
  return (
    <Center>
      <SimpleGrid
        cols={2}
        spacing="xl"
        verticalSpacing="xl"
        className={classes.sectionContainer}
      >
        <Card
          shadow="sm"
          p="xl"
          component="a"
          href="/learning-units/Theory"
          className={classes.root}
        >
          <Card.Section>
            <span>
              <Text weight={500} size="lg" mt="md">
                Theory
              </Text>
              <DictionaryIcon width={250} height={299} />
            </span>
          </Card.Section>
        </Card>

        <Card
          shadow="sm"
          p="xl"
          component="a"
          href="#"
          className={classes.root}
        >
          <Card.Section>
            <span>
              <GrammarIcon></GrammarIcon>
            </span>
          </Card.Section>

          <Text weight={500} size="lg" mt="md">
            Grammar
          </Text>
        </Card>
      </SimpleGrid>
    </Center>
  );
};
export default LearningUnits;
