import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h2>🎬 Lu Film</h2>
          <p>Watch movies anytime, anywhere.</p>
        </div>

        <div className="footer-links">
          <h4>Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li>Movies</li>
            <li>My List</li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Lu film. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;