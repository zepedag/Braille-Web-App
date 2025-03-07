import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-title">Braille UDLAP</div>
      <div className="navbar-buttons">
        <Link to="/" className="navbar-button" aria-label="Ir a la página de inicio">
          Inicio
        </Link>
        <Link to="/convert" className="navbar-button" aria-label="Convertir texto a Braille">
          Convertir a Braille
        </Link>
        <Link to="/slate" className="navbar-button" aria-label="Acceder a la regleta Braille">
          Regleta Braille
        </Link>
        <Link to="/wordbank" className="navbar-button" aria-label="Consultar el banco de palabras">
          WordBank
        </Link>
        <div className="theme-switch">
          <input
            type="checkbox"
            id="theme-toggle"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Alternar entre modo claro y oscuro"
          />
          <label htmlFor="theme-toggle" className="theme-switch-label">
            <span className="theme-switch-slider"></span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
