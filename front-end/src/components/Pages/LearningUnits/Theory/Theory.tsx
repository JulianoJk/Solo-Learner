import { Button, Card, Text } from "@mantine/core";
import React from "react";
import DictionaryIcon from "../../../../images/DictionaryIcon";
import { useStyles } from "../LearningUnits.styles";

export default function Theory() {
  const { classes } = useStyles();

  return (
    <>
      <Card shadow="sm" p="xl" component="a" href="#" className={classes.root}>
        <Card.Section>
          <span>
            <Text weight={500} size="lg" mt="md">
              Theory
            </Text>
            <DictionaryIcon width={250} height={299} />
          </span>
        </Card.Section>
      </Card>
    </>
  );
}
