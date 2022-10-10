import React from "react";
import { Alert, Center, Text, Title } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { useStyles } from "./Alert.style";
import { isUndefinedOrNullString } from "../../lib/dist";

interface IProps {
  message: string | null | undefined;
}
export const AlertComponent: React.FC<IProps> = ({ message }) => {
  const hasError: boolean = isUndefinedOrNullString(message);

  const { classes } = useStyles();
  return (
    <Center>
      {!hasError ? (
        <Alert
          icon={<AlertCircle strokeWidth={3} />}
          title={<Title order={4}>Error!</Title>}
          color="dark"
          radius="lg"
          className={classes.alertBox}
        >
          <Text weight={700} size="lg">
            {message}
          </Text>
        </Alert>
      ) : (
        ""
      )}
    </Center>
  );
};
