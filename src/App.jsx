import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./models/NavBar";
import BrailleSlate from "./models/BrailleSlate";
import BrailleConverter from "./models/BrailleConverter";
import WordBank from "./models/WordBank";
import { useTheme } from "./hooks/useTheme";
import logoClaro from "./assets/LOGO_STEM-07.png";
import logoOscuro from "./assets/LOGO_STEM-08.png";

const Home = ({ theme }) => (
  <div className="home-container">
    <h1 className="welcome-title">Aprende y Practica con la App de Braille</h1>
    <div className="info-container">
      <div className="logo-section">
      {theme === 'dark' ? (
        <img src={logoOscuro} alt="Logo Oscuro" className="logo-design" />
      ) : (
        <img src={logoClaro} alt="Logo Claro" className="logo-design" />
      )}
      </div>
      <div className="project-section">
        <p><strong>Proyecto de servicio social</strong></p>
        <p>iOS Development Lab UDLAP</p>
        <p>Digital Maker Space</p>
        <p><strong>Directora del proyecto:</strong></p>
        <p>Dra. Zobeida Jezabel Guzman Zavaleta</p>
      </div>
      <div className="developers-section">
        <p><strong>Desarrolladores:</strong></p>
        <p>Ing. Humberto Alejandro Zepeda González</p>
        <p>Ing. Estrella Jissel Verdiguel Colin</p>
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
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/convert" element={<BrailleConverter theme={theme}/>} />
        <Route path="/slate" element={<BrailleSlate theme={theme} />} />
        <Route path="/wordbank" element={<WordBank theme={theme}/>} />
      </Routes>
    </Router>
  );
}

export default App;