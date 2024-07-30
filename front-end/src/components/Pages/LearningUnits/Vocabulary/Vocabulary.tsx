import { Card, Text } from '@mantine/core';
import React from 'react';
import VocabularyImage from '../../../../images/Vocabulary';

import { classes } from './Vocabulary.modules.css';
export default function Vocabulary() {
  return (
    <>
      <Card shadow="sm" p="xl" component="a" href="#" className={classes.root}>
        <Text fw={500} size="lg" mt="md">
          Vocabulary
        </Text>
        <Card.Section>
          <VocabularyImage width={250} height={299} />
        </Card.Section>
      </Card>
    </>
  );
}
