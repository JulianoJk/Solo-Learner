import React, { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { indexPage } from '../../api/api';
import { useMediaQuery } from '@mantine/hooks';
import { useStyles } from './Index.styles';
import LangepageIllustration from './LangepageIllustration';

const IndexPage = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [loading, setLoading] = useState(true);
  const matches = useMediaQuery('(min-width: 56.25em)');

  // Lock scrolling when desktop view is active
  useEffect(() => {
    if (matches) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [matches]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
          const response: any = await indexPage(jwtToken);
          if (response && response.navigateUser) {
            navigate(response.navigateUser);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to check authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Welcome to <span className={classes.highlight}>Solo learner</span>
            , your free <br /> multilingual platform for language learning
          </Title>
          <Text c="dimmed" mt="md">
            Master foreign languages faster than ever – Solo learner provides
            comprehensive lessons, interactive exercises, and tests to guide you
            through every step, completely free for all users and teachers.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Comprehensive theory lessons</b> – Get in-depth understanding
              of key concepts across various languages.
            </List.Item>
            <List.Item>
              <b>Interactive exercises</b> – Practice and enhance your skills in
              a fun and engaging way.
            </List.Item>
            <List.Item>
              <b>Personalized tests</b> – Receive tailored feedback to help you
              improve.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              radius="xl"
              size="md"
              className={classes.control}
              onClick={() => navigate('/login')}
            >
              Start Learning
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Learn More
            </Button>
          </Group>
        </div>
        <LangepageIllustration className={classes.image} />
      </div>
    </Container>
  );
};

export default IndexPage;
