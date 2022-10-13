import { Card, Text } from "@mantine/core";
import React from "react";
import Grammar from "../../../../images/Grammar";
import { useStyles } from "../Categories.styles";

export default function Vocabulary() {
  const { classes } = useStyles();
  return (
    <>
      <Card shadow="sm" p="xl" component="a" href="#" className={classes.root}>
        <Card.Section>
          <Grammar width={250} height={299} />
        </Card.Section>

        <Text weight={500} size="lg" mt="md">
          Vocabulary
        </Text>
      </Card>
    </>
  );
}
