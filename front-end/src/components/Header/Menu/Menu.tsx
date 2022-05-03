import { Link } from 'react-router-dom';
import "./Menu.module.css"

 const Menu:React.FC = ()=> {
      return (
          // Create a responsive header menu bar
          <div className="d-flex flex-row-reverse bd-highlight space" >
              {/* create a responsive btn group */}
              <div className="btn-group flex-wrap" role="group">
                  
                  <Link to="/" className="btn btn-outline-primary text-light text-opacity-75">Index</Link>                 
  
  
                  <Link to='/login' className="btn btn-outline-primary text-info">Login </Link> 
  
                  <Link to='/register' className="btn btn-primary bg-info text-white">Register</Link>
              </div>
  
          </div>
      )
  
  }
export default Menu