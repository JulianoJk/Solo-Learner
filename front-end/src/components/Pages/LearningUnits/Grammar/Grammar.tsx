import { Card, Text } from '@mantine/core';
import React from 'react';
import GrammarIcon from '../../../../images/GrammarIcon';
import classes  from '../LearningUnits.module.css';
// import { GrammarIcon } from "../../../../images/GrammarIcon/";

export default function Vocabulary() {
  // const { classes } = useStyles();
  return (
    <>
      <Card shadow="sm" p="xl" component="a" href="#" className={classes.root}>
        <Card.Section>
          <span>
            <GrammarIcon></GrammarIcon>
          </span>
        </Card.Section>

        <Text fw={500} size="lg" mt="md">
          Grammar
        </Text>
      </Card>
    </>
  );
}
