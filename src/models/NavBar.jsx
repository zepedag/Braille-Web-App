import React from "react";
import "../styles/Navbar.css"; // Importa el archivo CSS para este componente
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Braille UDLAP</div>
      <div className="navbar-buttons">
      <Link to="/" className="navbar-button">Inicio</Link>
      <Link to="/convert" className="navbar-button">Convertir a Braille</Link>
      <Link to="/slate" className="navbar-button">Regleta Braille</Link>
      </div>
    </nav>
  );
};

export default Navbar;