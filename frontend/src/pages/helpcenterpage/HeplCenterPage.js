import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./HelpCenterPage.css";

function HelpCenter() {
  return (
    <div className="help-page">
      <Navbar />

      <div className="help-container">
        <h1 className="help-title">Help Center</h1>

        <div className="help-item">
          <h3>🎬 How to watch?</h3>
          <p>Click on a movie and press Play.</p>
        </div>

        <div className="help-item">
          <h3>🔍 How to search?</h3>
          <p>Use the search bar above.</p>
        </div>

        <div className="help-item">
          <h3>❤️ How to like?</h3>
          <p>Press the like button in movie detail.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HelpCenter;