
import Logo from "../../../images/logo.png";
import styles from "./Index.module.css"
const Index:React.FC = ()=> {
  return (
    <div>
        {/* container for the logo */}
        <div>
            <img src={Logo} alt="Logo-image" className="rounded mx-auto d-block " />
        </div>
        <div className={`d-flex justify-content-center ${styles.quotes}`}>
            <h2 className="lead">We learn!</h2>
        </div>            
        <div className="d-flex justify-content-center" style={{margin: "7px"}}>
            <h2 className="blockquote"><em>
            Learn foreign languages with fun!
            </em></h2>
        </div>

    </div>
)
}

export default Index