import "./Footer.css";

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
            <li>Home</li>
            <li>Movies</li>
            <li>My List</li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
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