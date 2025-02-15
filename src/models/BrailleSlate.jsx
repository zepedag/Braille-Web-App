import React, { useState, useEffect } from "react";
import "../styles/BrailleSlate.css";

// Diccionario de patrones de celdas a letras
const braillePatternToLetter = {
  "100000": "a",
  "101000": "b",
  "110000": "c",
  "110100": "d",
  "100100": "e",
  "111000": "f",
  "111100": "g",
  "101100": "h",
  "011000": "i",
  "011100": "j",
  "100010": "k",
  "101010": "l",
  "110010": "m",
  "110110": "n",
  "100110": "o",
  "111010": "p",
  "111110": "q",
  "101110": "r",
  "011010": "s",
  "011110": "t",
  "100011": "u",
  "101011": "v",
  "011101": "w",
  "110011": "x",
  "110111": "y",
  "100111": "z",
  "111101": "ñ",
  "101101": "ü",
  "101111": "á",
  "011011": "é",
  "010010": "í",
  "010011": "ó",
  "011111": "ú"
};

const keyMap = {
  "f": 0,
  "d": 1,
  "s": 2,
  "j": 3,
  "k": 4,
  "l": 5
};

const BrailleSlate = () => {
  const initialBlock = [false, false, false, false, false, false];
  
  const [blocks, setBlocks] = useState(() =>
    Array.from({ length: 8 }, () => [...initialBlock])
  );
  const [currentBlock, setCurrentBlock] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (keyMap.hasOwnProperty(event.key)) {
        const cellIndex = keyMap[event.key];
        setBlocks(prevBlocks => {
          const newBlocks = prevBlocks.map(block => [...block]);
          newBlocks[currentBlock][cellIndex] = !newBlocks[currentBlock][cellIndex];
          return newBlocks;
        });
      } else if (event.key === "ArrowRight" || event.key === " ") {
        setCurrentBlock(prev => (prev < blocks.length - 1 ? prev + 1 : prev));
      } else if (event.key === "ArrowLeft") {
        setCurrentBlock(prev => (prev > 0 ? prev - 1 : prev));
      }
    };
    
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentBlock, blocks.length]);

  const handleCellClick = (blockIndex, cellIndex) => {
    setBlocks(prevBlocks => {
      const newBlocks = prevBlocks.map(block => [...block]);
      newBlocks[blockIndex][cellIndex] = !newBlocks[blockIndex][cellIndex];
      return newBlocks;
    });
  };

  const getLetterFromBlock = (block) => {
    const pattern = block.map(cell => (cell ? "1" : "0")).join("");
    return braillePatternToLetter[pattern] || "";
  };

  useEffect(() => {
    if (blocks.every(block => block.some(cell => cell))) {
      setBlocks(prevBlocks => [...prevBlocks, [...initialBlock]]);
    }
  }, [blocks]);

  return (
    <div className="braille-slate">
      {blocks.map((block, blockIndex) => {
        const letter = getLetterFromBlock(block);
        return (
          <div key={blockIndex} className={`braille-block-container ${blockIndex === currentBlock ? "active-block" : ""}`}>
            <div className="braille-block">
              {block.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`braille-cell ${cell ? "active" : ""}`}
                  onClick={() => handleCellClick(blockIndex, cellIndex)}
                />
              ))}
            </div>
            {letter && <div className="recognized-letter">{letter}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default BrailleSlate;  