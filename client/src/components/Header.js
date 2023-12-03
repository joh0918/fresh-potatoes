import { NavLink } from 'react-router-dom';
import './CommonStyling.css';

function Header() {
  return (
    <header className="nav-container">
      <div className="nav-left">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/myreviews" className="nav-link">My Reviews</NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/signin" className="nav-link">Sign In</NavLink>
        <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
      </div>
    </header>
  );
}

export default Header;
