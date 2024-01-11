import { Card, Center, SimpleGrid, Text, Image } from '@mantine/core';
import React from 'react';
import TheoryIcon from '../../../images/TheoryIcon';
import GrammarIcon from '../../../images/grammar.jpg';
import { classes } from './LearningUnits.modules.css';

const LearningUnits = () => {
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
              <Text fw={500} size="lg" mt="md">
                Theory
              </Text>
              <TheoryIcon />
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
              <Image src={GrammarIcon} />
            </span>
          </Card.Section>

          <Text fw={500} size="lg" mt="md">
            Grammar
          </Text>
        </Card>
      </SimpleGrid>
    </Center>
  );
};
export default LearningUnits;
