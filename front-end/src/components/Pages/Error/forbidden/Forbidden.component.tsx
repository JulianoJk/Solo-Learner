import React from 'react';
import { Container, Title, Text, Button, SimpleGrid } from '@mantine/core';

import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Forbitten from '../../../../images/Forbitten.svg';
import { useStyles } from './Forbidden.styles';

interface NotFoundProps {
  bodyText?: string;
  navText?: string;
  statusNumber?: number;
  btnText?: string;
  navigationPath: string;
}
const ForbiddenPage: React.FC<NotFoundProps> = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}
      >
        <ReactSVG src={Forbitten} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Access Denied...</Title>
          <Text color="dimmed" size="lg">
            The page you are trying to access is restricted. You may not have
            the necessary permissions, or the content has been made private. If
            you believe this is an error or you need access, please contact
            support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => navigate(props.navigationPath ?? '/')}
          >
            Get back to home page
          </Button>
        </div>
        <ReactSVG src={Forbitten} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};
export default ForbiddenPage;
