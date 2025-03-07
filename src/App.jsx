import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./models/NavBar";
import BrailleSlate from "./models/BrailleSlate";
import BrailleConverter from "./models/BrailleConverter";
import WordBank from "./models/WordBank";
import { useTheme } from "./hooks/useTheme";

const Home = () => (
  <div className="home-container">
    <h1 className="welcome-title">Bienvenido a la App de Braille</h1>
    <div className="content-section">
      <p className="description">
        Esta aplicación fue desarrollada como parte del servicio social para el iOS Lab de la Universidad de las Américas Puebla (UDLAP). El proyecto fue llevado a cabo por estudiantes, con el objetivo de facilitar la conversión de texto a Braille y proporcionar herramientas útiles para la comunidad de personas con discapacidad visual.
      </p>
      <div className="credits-section">
        <h2 className="section-title">Créditos</h2>
        <div className="credit-category">
          <h3 className="category-title">Desarrolladores</h3>
          <ul className="credit-list">
            <li>Ing. Humberto Alejandro Zepeda González</li>
            <li>Ing. Estrella Jissel Verdiguel Colin</li>
          </ul>
        </div>
        <div className="credit-category">
          <h3 className="category-title">Institución</h3>
          <ul className="credit-list">
            <li>Universidad de las Américas Puebla (UDLAP)</li>
          </ul>
        </div>
        <div className="credit-category">
          <h3 className="category-title">Agradecimientos</h3>
          <ul className="credit-list">
            <li>Dr. Zobeida Jezabel Guzmán Zavaleta</li>
            <li>iOS Lab UDLAP</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<BrailleConverter />} />
        <Route path="/slate" element={<BrailleSlate />} />
        <Route path="/wordbank" element={<WordBank />} />
      </Routes>
    </Router>
  );
}

export default App;