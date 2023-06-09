import {
  createStyles,
  Container,
  Title,
  Button,
  Text,
  List,
  ThemeIcon,
  rem,
  Box,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import IndexImage from '../../../images/IndexImage';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

const DemoIndex = () => {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Welcome to <span className={classes.highlight}>Solo learner</span>
              , your free English language learning platform
            </Title>
            <Text color="dimmed" mt="md">
              Master the English language faster than ever - Solo learner
              provides comprehensive theory lessons, interactive exercises, and
              tests to help you in every step of your learning journey.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={rem(12)} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Comprehensive and structured</b> – Our lessons are designed
                to provide a structured learning experience.
              </List.Item>
              <List.Item>
                <b>Free and open to all</b> – LearnEnglish is a free platform,
                open to anyone eager to learn the English language.
              </List.Item>
              <List.Item>
                <b>Interactive learning</b> – Our platform is designed to make
                learning English an interactive and engaging experience.
              </List.Item>
            </List>

            <Box mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Start Learning
              </Button>
            </Box>
          </div>
          <IndexImage className={classes.image} />
        </div>
      </Container>
    </div>
  );
};
export default DemoIndex;
