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
        <NavLink to="/login" className="nav-link">Sign Out</NavLink>
      </div>
    </header>
  );
}

export default Header;
