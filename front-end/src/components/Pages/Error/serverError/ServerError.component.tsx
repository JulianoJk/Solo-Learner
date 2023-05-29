import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useStyles } from './ServerError.styles';
import React from 'react';
import { isUserLoggedIn } from '../../../../lib/dist';
import { useNavigate } from 'react-router-dom';
interface ServerErrorProps {
  errorCode?: number;
  errorTitle?: string;
  errorDescription?: string;
  errorButtonText?: string;
}
const ServerError: React.FC<ServerErrorProps> = (props) => {
  const { classes } = useStyles();
  const { errorCode, errorTitle, errorDescription, errorButtonText } = props;
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>{errorCode ?? 500}</div>
        <Title className={classes.title}>
          {errorTitle ?? 'Something bad just happened...'}
        </Title>
        <Text size="lg" align="center" className={classes.description}>
          {errorDescription ??
            `Our servers could not handle your request. Do not worry, our development team was already notified. Try again later.`}
        </Text>
        <Group position="center">
          <Button
            variant="white"
            size="md"
            onClick={() => {
              isUserLoggedIn() ? navigate('/home') : navigate('/');
            }}
          >
            {errorButtonText ?? 'Go back'}
          </Button>
        </Group>
      </Container>
    </div>
  );
};
export default ServerError;
