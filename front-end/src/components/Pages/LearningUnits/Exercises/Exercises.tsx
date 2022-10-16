import { Card, Text } from "@mantine/core";
import React from "react";
import { useStyles } from "../LearningUnits.styles";

export default function Vocabulary() {
  const { classes } = useStyles();
  return (
    <>
      <Card shadow="sm" p="xl" component="a" href="#">
        <Card.Section>
          {/* <Grammar /> */}
        </Card.Section>

        <Text weight={500} size="lg" mt="md">
          Exercises
        </Text>
      </Card>
    </>
  );
}
