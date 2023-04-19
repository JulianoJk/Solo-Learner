/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import Grammar from '../LearningUnits/Grammar/Grammar';
import Theory from '../LearningUnits/Theory/Theory';
import Vocabulary from '../LearningUnits/Vocabulary/Vocabulary';
import { useStyles } from './Home.styles';
import LearningUnits from '../LearningUnits/LearningUnits';

const Home: React.FC = () => {
  const { classes } = useStyles();
  return <LearningUnits />;
};

export default Home;
