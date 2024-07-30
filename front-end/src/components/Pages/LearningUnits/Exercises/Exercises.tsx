import { Card, Text } from '@mantine/core';
import React from 'react';

export default function Exercises() {
  return (
    <>
      <Card
        shadow="sm"
        p="xl"
        component="a"
        href="#"
        onClick={() => {
          console.log('hello');
        }}
      >
        <Card.Section>{/* <Grammar /> */}</Card.Section>

        <Text fw={500} size="lg" mt="md">
          Exercises
        </Text>
      </Card>
    </>
  );
}
