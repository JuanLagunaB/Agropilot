import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Contact from "./Contact";
import "./App.css";

const imagenesGaleria = [
  { id: 1, src: '/Agropilot-1.png', tag: 'Tienda', alt: 'Agropilot Screenshot 1' },
  { id: 2, src: '/Inventario.png', tag: 'Inventario ', alt: 'Agropilot Screenshot 2' },
  { id: 3, src: '/Misiones.png', tag: 'Misiones', alt: ' Agropilot Screenshot 3' }, 
  { id: 4, src: '/NPC.png', tag: 'NPC', alt: 'Agropilot Screenshot 4' },
  { id: 5, src: '/Panel educativo.png', tag: 'Panel educativo', alt: 'Agropilot Screenshot 5' },
];



function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: "",
      title: "Simulacion Realista",
      desc: "Experimenta la agricultura con mecanicas realistas de cultivo, riego y cosecha.",
    },
    {
      icon: "",
      title: "Mundo Abierto",
      desc: "Explora extensos campos, valles y granjas en un mundo completamente abierto.",
    },
    {
      icon: "",
      title: "Pesca",
      desc: "Si te cansas de cutivar puedes ir a lago y relajarte pescando y encontrando peces unicos.",
    },
   
    {
      icon: "",
      title: "Economia",
      desc: "Vende tus cultivos, compra herramientas semillas y aprende sobre mas cultivos"
    },
    {
      title: "NPC",
      desc: "Interactua con un Npc llamado fermin integrado con inteligencia artificial para saber mas de agricultura"
    }
  ];

  const stats = [
    { value: "100%", label: "Educativo" },
    { value: "4.8", label: "Rating" },
  ];

  const [imagenActiva, setImagenActiva] = useState(imagenesGaleria[0]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={
    <div className="App">
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <a href="#hero" className="nav-logo">
            <span className="logo-icon"></span> AGROPILOT
          </a>
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li>
              <a href="#hero" onClick={() => setMenuOpen(false)}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                Sobre
              </a>
            </li>
            <li>
              <a href="#features" onClick={() => setMenuOpen(false)}>
                Caracteristicas
              </a>
            </li>
            <li>
              <a href="#media" onClick={() => setMenuOpen(false)}>
                Media
              </a>
            </li>
            <li>
              <a href="#download" className="nav-cta" onClick={() => setMenuOpen(false)}>
                Jugar Ahora
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-bg-overlay"></div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}></div>
          ))}
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">AGROPILOT</span>
 
          </h1>
          <p className="hero-subtitle">Aprende jugando con Agropilot</p>
          <p className="hero-desc">
            Un simulador educativo que te permite aprender sobre agricultura,
            ganaderia y sostenibilidad de una manera inmersiva y divertida.
          </p>
          <div className="hero-actions">
            <a href="#download" className="btn btn-primary">
              <span className="btn-glow"></span>
              Jugar
            </a>
            <a href="#media" className="btn btn-secondary">
              Ver imagenes   &#9654;
            </a>
          </div>
          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-image">
          <img src="/Campo.png" alt="Agropilot Game" />
          <div className="hero-image-glow"></div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/Juego.png" alt="Agropilot Gameplay" />
              <div className="about-image-border"></div>
            </div>
            <div className="about-content">
              <span className="section-tag">SOBRE EL JUEGO</span>
              <h2 className="section-title">
                Aprende sobre el campo <span className="accent">jugando</span>
              </h2>
              <p className="about-text">
                Agropilot es un juego educativo que te permite aprender sobre el
                campo y la agricultura de una manera divertida e interactiva. A
                traves de diferentes misiones, los jugadores pueden explorar el
                mundo agricola, conocer las practicas sostenibles y descubrir como
                se cultivan los alimentos que consumimos diariamente.
              </p>
              <div className="about-checks">
                <div className="check-item">&#10003; Misiones educativas</div>
                <div className="check-item">&#10003; Practicas sostenibles</div>
                <div className="check-item">&#10003; Gratis para jugar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <div className="section-container">
          <span className="section-tag center">CARACTERISTICAS</span>
          <h2 className="section-title center">
            Todo lo que necesitas para <span className="accent">dominar</span> el campo
          </h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <div className="feature-card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA */}
  
      <section id="media" className="media">
      <div className="section-container">
        <span className="section-tag center">GALERIA</span>
        <h2 className="section-title center">
          Capturas del <span className="accent">juego</span>
        </h2>
        
        <div className="media-showcase">
          <div className="media-main">
            <img src={imagenActiva.src} alt={imagenActiva.alt} />
            <div className="media-overlay">
              <span className="media-badge">{imagenActiva.tag}</span>
            </div>
          </div>
          
          <div className="media-grid">
   
            {imagenesGaleria.map((imagen) => {
              const esActiva = imagen.id === imagenActiva.id;
              
              return (
                <div 
                  key={imagen.id}
                  className={`media-thumb ${esActiva ? 'active' : ''}`}
                  onClick={() => setImagenActiva(imagen)}
                >
                  <img src={imagen.src} alt={imagen.alt} />
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </section>

      {/* CTA / DOWNLOAD */}
      <section id="download" className="download">
        <div className="section-container">
          <div className="download-box">
            <div className="download-glow"></div>
            <h2 className="download-title">
              Comienza tu aventura <span className="accent">agrícola</span>
            </h2>
            <p className="download-desc">
              Descarga Agropilot gratis y empieza a aprender sobre agricultura
              mientras te diviertes.
            </p>
            <div className="download-platforms">
              
              <a href="#!" className="platform-btn">
                <span className="platform-icon">&#9881;</span>
                <div>
                  <small>Juega en</small>
                  <strong>Windows PC</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="nav-logo">
                <span className="logo-icon">&#9672;</span> AGROPILOT
              </span>
              <p className="footer-desc">
                Aprende sobre el campo jugando. Un proyecto educativo de
                simulacion agricola.
              </p>
            </div>
            <div className="footer-links">
              <h4>Navegacion</h4>
              <a href="#hero">Inicio</a>
              <a href="#about">Sobre</a>
              <a href="#features">Caracteristicas</a>
              <a href="#media">Galeria</a>
            </div>
            <div className="footer-links">
              <h4>Soporte</h4>
              
              <Link to="/contact">Contacto</Link>
              
            </div>
            <div className="footer-links">
             
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Agropilot. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
