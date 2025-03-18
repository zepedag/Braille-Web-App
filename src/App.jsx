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

    <div className="activity-description">
      <h2>¿De qué trata esta actividad?</h2>
      <p>
        Esta aplicación está diseñada para ayudarte a aprender y practicar el sistema de escritura Braille. 
        A través de diferentes herramientas y ejercicios, podrás familiarizarte con el alfabeto Braille, 
        convertir texto a Braille y viceversa, y practicar la escritura en una pizarra Braille virtual.
      </p>
      <h2>¿Cómo usar la aplicación?</h2>
      <p>
        <strong>1. Convertidor de Braille:</strong> En esta sección, puedes convertir texto normal a Braille y viceversa. 
        Simplemente ingresa el texto en el campo correspondiente y presiona el botón para ver la conversión.
      </p>
      <p>
        <strong>2. Pizarra Braille:</strong> Aquí puedes practicar la escritura en Braille utilizando una pizarra virtual. 
        Selecciona los puntos que deseas activar y observa cómo se forma el carácter Braille.
      </p>
      <p>
        <strong>3. Banco de Palabras:</strong> En esta sección, encontrarás una lista de palabras comunes en Braille 
        para que puedas practicar y mejorar tu reconocimiento de caracteres.
      </p>
    </div>
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