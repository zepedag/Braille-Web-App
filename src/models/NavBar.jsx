import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Braille UDLAP</div>
      <div className="navbar-buttons">
        <Link to="/" className="navbar-button">
          Inicio
        </Link>
        <Link to="/convert" className="navbar-button">
          Convertir a Braille
        </Link>
        <Link to="/slate" className="navbar-button">
          Regleta Braille
        </Link>
        <Link to="/wordbank" className="navbar-button">
          WordBank
        </Link>
        <div className="theme-switch">
          <input
            type="checkbox"
            id="theme-toggle"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
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