import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="overlay">
        <div className="content">
          <h1>404</h1>
          <h2>Oops! Page not found</h2>
          <img
            className="meme"
            src="https://imgur.com/qIufhof.png"
            alt="404 meme"
          />
          <p>
            The page you are looking for does not exist or has been deleted.
          </p>

          <div className="actions">
            <button onClick={() => navigate("/")}>
              🏠 Back to Home
            </button>

            <button className="secondary" onClick={() => navigate(-1)}>
              ⬅ Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;