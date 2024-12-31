/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Overlay,
  Container,
  Title,
  Button,
  Text,
  BackgroundImage,
} from '@mantine/core';

import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { indexPage } from '../../api/api';

import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { useStyles } from './Index.styles';
const IndexPage = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Retrieve the JWT token from local storage
        const jwtToken = localStorage.getItem('jwtToken');

        // If the token is present, pass it to the authentication function
        if (jwtToken) {
          const response: any = await indexPage(jwtToken);

          // If the user is logged in, navigate to the specified path
          if (response && response.navigateUser) {
            navigate(response.navigateUser);
          }
        } else {
          // Token is not present, continue with loading
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to check authentication:', error);
      } finally {
        // Set loading to false once authentication check is complete
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <Container className={classes.container}>
      {loading ? (
        // Render a loading indicator
        <div>Loading...</div>
      ) : (
        <>
          <Title className={classes.title} c="white">
            Welcome to Solo learner, your free English language learning
            platform
          </Title>
          <Text className={classes.description} size="xl" mt="xl" c="white">
            Master the English language faster than ever - Solo learner provides
            comprehensive theory lessons, interactive exercises, and tests to
            help you in every step of your learning journey.
          </Text>

          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
            onClick={() => navigate('/login')}
          >
            Start Learning
          </Button>
        </>
      )}
    </Container>
  );
};

export default IndexPage;
