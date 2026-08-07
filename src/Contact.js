import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <nav className="contact-nav">
        <Link to="/" className="contact-logo">
          <span className="logo-icon"></span> AGROPILOT
        </Link>
        <Link to="/" className="back-btn">
          &#8592; Volver al Inicio
        </Link>
      </nav>

      <div className="contact-content">
        <div className="contact-bg-overlay"></div>
        <div className="contact-particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="contact-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="contact-info-grid">
        <div className="contact-form-container">
          <h2>DESARROLLADORES</h2>
          <p>Niray Yussifh Muñoz Amador</p>
          <p>Juan David Laguna Bayona</p>
        </div>
        <div className="contact-form-correo">
          <h2>CONTACTANOS</h2>
          <p>yussifh@hotmail.com</p>
          <p>jlaguna726@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
