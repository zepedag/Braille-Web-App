import React, { useState } from "react";
import "../styles/BrailleSlate.css";

const BrailleSlate = () => {
  // Cada bloque es un arreglo de 6 celdas, inicialmente todas sin marcar (false)
  const initialBlock = [false, false, false, false, false, false];
  
  // Creamos 8 bloques iniciales
  const [blocks, setBlocks] = useState(() =>
    Array.from({ length: 8 }, () => [...initialBlock])
  );

  // Función para manejar el clic en una celda
  const handleCellClick = (blockIndex, cellIndex) => {
    setBlocks(prevBlocks => {
      // Creamos una copia de los bloques (importante para evitar mutaciones directas)
      const newBlocks = prevBlocks.map(block => [...block]);
      
      // Cambiamos el estado de la celda: la marcamos (o la desmarcamos, si deseas toggle)
      newBlocks[blockIndex][cellIndex] = !newBlocks[blockIndex][cellIndex];

      // Verificamos si cada bloque tiene al menos una celda marcada
      const allBlocksHaveAtLeastOne = newBlocks.every(block =>
        block.some(cell => cell === true)
      );

      // Si se cumple la condición, agregamos un nuevo bloque al final
      if (allBlocksHaveAtLeastOne) {
        newBlocks.push([...initialBlock]);
      }

      return newBlocks;
    });
  };

  return (
    <div className="braille-slate">
      {blocks.map((block, blockIndex) => (
        <div key={blockIndex} className="braille-block">
          {block.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`braille-cell ${cell ? "active" : ""}`}
              onClick={() => handleCellClick(blockIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BrailleSlate;
