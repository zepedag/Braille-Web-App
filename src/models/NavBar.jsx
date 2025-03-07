import React from "react";
import "../styles/Navbar.css"; 
import { Link } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-title">Braille UDLAP</div>
      <div className="navbar-buttons">
        <Link to="/" className="navbar-button" aria-label="Ir a Inicio">Inicio</Link>
        <Link to="/convert" className="navbar-button" aria-label="Ir al Convertidor a Braille">Convertidor a Braille</Link>
        <Link to="/slate" className="navbar-button" aria-label="Ir a la Regleta Braille">Regleta Virtual</Link>
        <Link to="/wordbank" className="navbar-button" aria-label="Ir al Banco de Palabras">Banco de Palabras</Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="navbar-button"
          aria-label={`Activar ${theme === "dark" ? "modo claro" : "modo oscuro"}`}
        >
          {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
