import React from "react";
import Grammar from "../LearningUnits/Grammar/Grammar";
import Theory from "../LearningUnits/Theory/Theory";
import Vocabulary from "../LearningUnits/Vocabulary/Vocabulary";
import { useStyles } from "./Home.styles";

const Home: React.FC = () => {
  const { classes } = useStyles();
  return (
    <div>
      <div className={classes.sectionContainer}>
        {/* <Theory></Theory> */}
        <Grammar></Grammar>
        {/* <Vocabulary></Vocabulary> */}
      </div>
    </div>
  );
};

export default Home;
