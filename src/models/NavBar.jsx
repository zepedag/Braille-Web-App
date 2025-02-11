import React from "react";
import "../styles/Navbar.css"; // Importa el archivo CSS para este componente

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Braille UDLAP</div>
      <div className="navbar-buttons">
        <button className="navbar-button">Regleta Virtual</button>
        <button className="navbar-button">Máquina de Perkins</button>
      </div>
    </nav>
  );
};

export default Navbar;