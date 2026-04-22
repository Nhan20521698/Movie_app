import './Navbar.css';
import { FaUser } from "react-icons/fa";
import logo from '../../assets/images/logo.jpg';

function Navbar() {
  return (
    <div className='navbar' id='navbar'>
      <div className='container'>
        <div className='header'>
          <img src={logo} alt='logo' />
        </div>
        <ul className='nav-links'>
          <li>Home</li>
          <li>Movies</li>
          <li>TV Shows</li>
          <li>My List</li>  
        </ul>
        <div className='nav-user'>
          <div className='login'> <FaUser /> Login  </div>
          <div className='signup'>Sign Up</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;