/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container, Title, Text, Button, SimpleGrid, rem } from '@mantine/core';
import NotFoundImage from '../../../../images/NotFount';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import classes from './NotFoundPage.module.css';
interface NotFoundProps {
  bodyText?: string;
  navText?: string;
  statusNumber?: number;
  btnText?: string;
  navigationPath: string;
}
const NotFound: React.FC<NotFoundProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      {/* <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}
      > */}
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2 }} // Adjust the responsive values for cols
        spacing={{ base: 10, sm: 'xl' }} // Adjust the responsive values for spacing
        verticalSpacing={{ base: 'md', sm: 'xl' }} // Adjust the responsive values for verticalSpacing
      >
        <NotFoundImage className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
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
        <NotFoundImage className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};
export default NotFound;
