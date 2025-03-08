import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <Link to="/" className={`navbar-button ${theme === "dark" ? "dark-mode" : ""}`} aria-label="Ir al inicio">
          <div className="icon-text-container">
            <i className="fas fa-home"></i>
            <span>Inicio</span>
          </div>
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/convert" className={`navbar-button ${theme === "dark" ? "dark-mode" : ""}`} aria-label="Convertir texto a Braille">
          <div className="icon-text-container">
            <div className="convert-icons">
              <i className="fas fa-font"></i>
              <i className="fas fa-exchange-alt"></i>
              <i className="fas fa-braille"></i>
            </div>
            <span>Convertir a Braille</span>
          </div>
        </Link>
        <Link to="/slate" className={`navbar-button ${theme === "dark" ? "dark-mode" : ""}`} aria-label="Acceder a la regleta Braille">
          <div className="icon-text-container">
            <i className="fas fa-keyboard"></i>
            <span>Regleta Braille</span>
          </div>
        </Link>
        <Link to="/wordbank" className={`navbar-button ${theme === "dark" ? "dark-mode" : ""}`} aria-label="Consultar el banco de palabras">
          <div className="icon-text-container">
            <i className="fas fa-gamepad"></i>
            <span>Juego</span>
          </div>
        </Link>
      </div>
      <div className="navbar-right">
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