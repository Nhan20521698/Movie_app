import './Navbar.css';
import { FaUser } from "react-icons/fa";
import logo from '../../assets/images/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // 🔥 load user từ localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // 🔥 click ra ngoài → đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className='navbar' id='navbar'>
      <div className='container'>

        {/* LOGO */}
        <div className='header' onClick={() => navigate("/")}>
          <img src={logo} alt='logo' />
        </div>

        {/* MENU */}
        <ul className='nav-links'>
          <li onClick={() => navigate("/")}>Home</li>
          <li>Movies</li>
          <li>TV Shows</li>
          <li>My List</li>  
        </ul>

        {/* USER */}
        <div className='nav-user'>
          {!user ? (
            <>
              <div className='login' onClick={() => navigate('/login')}>
                <FaUser /> Login
              </div>
              <div className='signup' onClick={() => navigate('/signup')}>
                Sign Up
              </div>
            </>
          ) : (
            <div className='user-box' ref={dropdownRef}>
              <img
                src={user.avatar || "https://i.pravatar.cc/40"}
                alt="avatar"
                className='avatar'
                onClick={() => setOpen(!open)} // 👈 click mở
              />

              {open && (
                <div className='dropdown'>
                  <p>{user.username}</p>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Navbar;