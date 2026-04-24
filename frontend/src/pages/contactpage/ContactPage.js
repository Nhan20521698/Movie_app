import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./ContactPage.css";

function Contact() {
  return (
    <div className="contact-page">
      <Navbar />

      <div className="contact-container">
        <h1 className="contact-title">Contact</h1>

        <div className="contact-box">
          <p>📧 anh2kuco@gmail.com</p>
          <p>📞 +84 375 421 475</p>  
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;