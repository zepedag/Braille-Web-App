import React from "react";
import "./Navbar.css"; // Importa el archivo CSS para este componente

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Mi App</div>
      <div className="navbar-buttons">
        <button className="navbar-button">Botón 1</button>
        <button className="navbar-button">Botón 2</button>
      </div>
    </nav>
  );
};

export default Navbar;