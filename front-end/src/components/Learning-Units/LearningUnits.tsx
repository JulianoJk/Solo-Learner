import React from "react";
import Grammar from "./Grammar/Grammar";
import Theory from "./Theory/Theory";
import Vocabulary from "./Vocabulary/Vocabulary";
import { useStyles } from "./LearningUnits.styles";

const LearningUnits = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.sectionContainer}>
      <Theory></Theory>
      <Grammar></Grammar>
      <Vocabulary></Vocabulary>
    </div>
  );
};

export default LearningUnits;
