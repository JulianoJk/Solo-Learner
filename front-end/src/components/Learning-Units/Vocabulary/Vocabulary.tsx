import { Card, Text } from "@mantine/core";
import React from "react";
import VocabularyImage from "../../../images/Vocabulary";
import { useStyles } from "./Vocabulary.styles";

export default function Vocabulary() {
  const { classes } = useStyles();
  return (
    <>
      <Card shadow="sm" p="xl" component="a" href="#" className={classes.root}>
        <Card.Section>
          <VocabularyImage width={250} height={299}></VocabularyImage>
        </Card.Section>

        <Text weight={500} size="lg" mt="md">
          Vocabulary
        </Text>
      </Card>
    </>
  );
}
