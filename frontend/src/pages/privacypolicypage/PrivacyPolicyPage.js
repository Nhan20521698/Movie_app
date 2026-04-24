import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./PrivacyPolicyPage.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <Navbar />

      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>

        <div className="privacy-section">
          <h3>📊 Data</h3>
          <p>We collect minimal data for improving experience.</p>
        </div>

        <div className="privacy-section">
          <h3>🔒 Security</h3>
          <p>Your data is safe and not shared.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;