import React from "react";
import "../styles/Navbar.css"; 
import { Link } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Braille UDLAP</div>
      <div className="navbar-buttons">
        <Link to="/" className="navbar-button">Inicio</Link>
        <Link to="/convert" className="navbar-button">Convertir a Braille</Link>
        <Link to="/slate" className="navbar-button">Regleta Braille</Link>
        <Link to="/wordbank" className="navbar-button">WordBank</Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="navbar-button"
        >
          {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;