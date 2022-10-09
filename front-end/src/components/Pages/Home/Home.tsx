import React from "react";
import LearningUnits from "../../Learning-Units/LearningUnits";

import PageNotFound from "../pageNotFound/PageNotFound";

const Home: React.FC = () => {
  let userIsLoggedInLocal = localStorage.getItem("user");

  if (userIsLoggedInLocal) {
    return (
      <div>
        <LearningUnits></LearningUnits>
      </div>
    );
  } else {
    return (
      <div>
        <PageNotFound
          navText="No Account found. To proceed, you must be logged-in!"
          navigationPath="/login"
          btnText="Login"
        />
      </div>
    );
  }
};

export default Home;
