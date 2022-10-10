import LogoImage from "../../../images/Logo";
import { useStyles } from "./Index.styles";
const Index: React.FC = () => {
  const { classes } = useStyles();
  return (
    <div>
      {/* container for the logo */}
      <div className={classes.logoContainer}>
        <LogoImage width="50%" height="100%"  />
      </div>
      <div className={classes.quote}>
        <h2 className="lead">Solo Learner!</h2>
      </div>
      <div>
        <h2>
          <em>Learn foreign languages with fun!</em>
        </h2>
      </div>
    </div>
  );
};

export default Index;
