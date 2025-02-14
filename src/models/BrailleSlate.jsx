import React, { useState } from "react";
import "../styles/BrailleSlate.css";

// Diccionario de patrones de celdas a letras
const braillePatternToLetter = {
  "100000": "a",
  "110000": "b",
  "100100": "c",
  "100110": "d",
  "100010": "e",
  "110100": "f",
  "110110": "g",
  "110010": "h",
  "010100": "i",
  "010110": "j",
  "101000": "k",
  "111000": "l",
  "101100": "m",
  "101110": "n",
  "101010": "o",
  "111100": "p",
  "111110": "q",
  "111010": "r",
  "011100": "s",
  "011110": "t",
  "101001": "u",
  "111001": "v",
  "010111": "w",
  "101101": "x",
  "101111": "y",
  "101011": "z"
};

const BrailleSlate = () => {
  // Cada bloque es un arreglo de 6 celdas, inicialmente ninguna está marcada
  const initialBlock = [false, false, false, false, false, false];
  
  // Creamos 8 bloques iniciales
  const [blocks, setBlocks] = useState(() =>
    Array.from({ length: 8 }, () => [...initialBlock])
  );

  const handleCellClick = (blockIndex, cellIndex) => {
    setBlocks(prevBlocks => {
      // Creamos una copia de los bloques para evitar mutaciones directas
      const newBlocks = prevBlocks.map(block => [...block]);
      
      // Alternamos el estado de la celda (toggle)
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

  // Función para obtener la letra a partir del patrón de celdas
  const getLetterFromBlock = (block) => {
    // Convertimos el arreglo de booleanos a una cadena, por ejemplo: "100000"
    const pattern = block.map(cell => (cell ? "1" : "0")).join("");
    return braillePatternToLetter[pattern] || "";
  };

  return (
    <div className="braille-slate">
      {blocks.map((block, blockIndex) => {
        const letter = getLetterFromBlock(block);
        return (
          <div key={blockIndex} className="braille-block-container">
            <div className="braille-block">
              {block.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`braille-cell ${cell ? "active" : ""}`}
                  onClick={() => handleCellClick(blockIndex, cellIndex)}
                />
              ))}
            </div>
            {/* Si se reconoce una letra, la mostramos debajo del bloque */}
            {letter && <div className="recognized-letter">{letter}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default BrailleSlate;
