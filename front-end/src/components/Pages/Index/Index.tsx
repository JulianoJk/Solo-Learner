import {
  Overlay,
  Container,
  Title,
  Button,
  Text,
  BackgroundImage,
} from '@mantine/core';
import IndexBook from '../../../images/IndexBook.jpeg';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './Index.styles';

const Index = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <BackgroundImage src={IndexBook} radius="xs" className={classes.wrapper}>
      <Overlay
        className={classes.overlay}
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>
          Welcome to Solo learner, your free English language learning platform
        </Title>
        <Text className={classes.description} size="xl" mt="xl">
          Master the English language faster than ever - Solo learner provides
          comprehensive theory lessons, interactive exercises, and tests to help
          you in every step of your learning journey.
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
      </Container>
    </BackgroundImage>
  );
};
export default Index;
