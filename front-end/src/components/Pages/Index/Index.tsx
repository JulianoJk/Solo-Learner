import LogoImage from "../../../images/Logo";
import { useStyles } from "./Index.styles";
const Index: React.FC = () => {
  const { classes } = useStyles();
  return (
    <div>
      {/* container for the logo */}
      <div>
        <LogoImage
          width="50%"
          height="100%"
          radius={30}
          className={classes.logo}
        />
      </div>
      <div className={classes.quote}>
        <h2 className="lead">We learn!</h2>
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
