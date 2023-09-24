import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Skeleton,
} from '@mantine/core';
import { useStyles } from './Home.styles';
import Theory from '../../../images/theory.jpeg';
import GrammarIcon from '../../../images/grammar.jpeg';
import TestImage from '../../../images/testsImage.jpg';
import Dictionary from '../../../images/vocabulary.jpeg';
import React from 'react';

const mockdata = [
  {
    title: 'Theory',
    image: Theory,
    details: 'Comprehensive lessons on English language fundamentals',
  },
  {
    title: 'Grammar',
    image: GrammarIcon,
    details: 'Interactive lessons focusing on English grammatical rules',
  },
  {
    title: 'Tests',
    image: TestImage,
    details: 'Quizzes and assessments to test English proficiency',
  },
  {
    title: 'Vocabulary',
    image: Dictionary,
    details: 'Lessons and exercises to expand English vocabulary.',
  },
];
interface DemoHomeProps {
  isLoading: boolean;
}
const Modules: React.FC<DemoHomeProps> = (props) => {
  const { classes } = useStyles();
  const { isLoading } = props;
  const cards = mockdata.map((article) => (
    <Card
      key={article.title}
      p="md"
      radius="md"
      component="a"
      className={classes.cardLoaded}
      draggable={false}
      sx={{ cursor: 'pointer' }}
      onClick={() => console.log(article.title)}
    >
      <Skeleton visible={isLoading}>
        <AspectRatio ratio={1920 / 1080}>
          <Image src={article.image} draggable={false} />
        </AspectRatio>
      </Skeleton>
      <Skeleton visible={isLoading} height={16} mt={6} radius="xl">
        <Text color="dimmed" size="xs" transform="initial" weight={700} mt="md">
          {article.details}
        </Text>
      </Skeleton>
      <Skeleton visible={isLoading} height={12} mt={6} width="70%" radius="xl">
        <Text className={classes.title} mt={5}>
          {article.title}
        </Text>
      </Skeleton>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
};
export default Modules;
