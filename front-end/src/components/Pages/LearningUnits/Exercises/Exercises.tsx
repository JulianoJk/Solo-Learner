import { Card, Text } from "@mantine/core";
import React from "react";

export default function Vocabulary() {
  return (
    <>
      <Card shadow="sm" p="xl" component="a" href="#">
        <Card.Section>{/* <Grammar /> */}</Card.Section>

        <Text weight={500} size="lg" mt="md">
          Exercises
        </Text>
      </Card>
    </>
  );
}
