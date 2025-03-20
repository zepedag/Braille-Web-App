import React, { useState, useEffect } from "react";
import "../styles/BrailleSlate.css";
import imagenEsquina from "../assets/MaquinaPerkins.png";
import imagenEsquina2 from "../assets/MaquinaPerkinsNegro.png";
import logoClaro from "../assets/LOGO_STEM-07.png";
import logoOscuro from "../assets/LOGO_STEM-08.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

const braillePatternToLetter = {
  "100000": "a", "101000": "b", "110000": "c", "110100": "d", "100100": "e",
  "111000": "f", "111100": "g", "101100": "h", "011000": "i", "011100": "j",
  "100010": "k", "101010": "l", "110010": "m", "110110": "n", "100110": "o",
  "111010": "p", "111110": "q", "101110": "r", "011010": "s", "011110": "t",
  "100011": "u", "101011": "v", "011101": "w", "110011": "x", "110111": "y",
  "100111": "z", "111101": "ñ", "101101": "ü", "101111": "á", "011011": "é",
  "010010": "í", "010011": "ó", "011111": "ú"
};

const braillePatternToNumber = {
  "100000": "1", "101000": "2", "110000": "3", "110100": "4", "100100": "5",
  "111000": "6", "111100": "7", "101100": "8", "011000": "9", "011100": "0"
};

const NUMBER_INDICATOR = "010111";
const keyMap = { "f": 0, "d": 1, "s": 2, "j": 3, "k": 4, "l": 5 };

const BrailleSlate = ({ theme }) => {
  const initialBlock = [false, false, false, false, false, false];
  const [blocks, setBlocks] = useState(() => Array.from({ length: 8 }, () => [...initialBlock]));
  const [currentBlock, setCurrentBlock] = useState(0);
  const [numberModeBlocks, setNumberModeBlocks] = useState([]);
  const [lastRecognizedCharacters, setLastRecognizedCharacters] = useState({});
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (keyMap.hasOwnProperty(event.key)) {
        const cellIndex = keyMap[event.key];
        setBlocks((prevBlocks) => {
          const newBlocks = prevBlocks.map((block) => [...block]);
          newBlocks[currentBlock][cellIndex] = !newBlocks[currentBlock][cellIndex];
          return newBlocks;
        });
      } else if (event.key === "ArrowRight" || event.key === " ") {
        setCurrentBlock((prev) => (prev < blocks.length - 1 ? prev + 1 : prev));
      } else if (event.key === "ArrowLeft") {
        setCurrentBlock((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentBlock, blocks.length]);

  const handleCellClick = (blockIndex, cellIndex) => {
    setBlocks((prevBlocks) => {
      const newBlocks = prevBlocks.map((block) => [...block]);
      newBlocks[blockIndex][cellIndex] = !newBlocks[blockIndex][cellIndex];
      return newBlocks;
    });
    setCurrentBlock(blockIndex);
  };

  useEffect(() => {
    const newNumberModeBlocks = [];
    blocks.forEach((block, index) => {
      const pattern = block.map((cell) => (cell ? "1" : "0")).join("");
      if (pattern === NUMBER_INDICATOR) {
        newNumberModeBlocks.push(index);
      }
    });
    setNumberModeBlocks(newNumberModeBlocks);
  }, [blocks]);

  const getCharacterFromBlock = (block, index) => {
    const pattern = block.map((cell) => (cell ? "1" : "0")).join("");
    if (numberModeBlocks.includes(index - 1)) {
      return braillePatternToNumber[pattern] || null;
    }
    return braillePatternToLetter[pattern] || null;
  };

  const playAudio = (character) => {
    if (character && soundEnabled) {
      const audio = new Audio(`src/assets/Audio/${character}.mp3`);
      audio.play().catch((error) => console.error("Error al reproducir el audio:", error));
    }
  };

  useEffect(() => {
    blocks.forEach((block, blockIndex) => {
      const currentCharacter = getCharacterFromBlock(block, blockIndex);
      const lastCharacter = lastRecognizedCharacters[blockIndex];

      if (currentCharacter !== null && currentCharacter !== lastCharacter) {
        playAudio(currentCharacter);
        setLastRecognizedCharacters((prev) => ({
          ...prev,
          [blockIndex]: currentCharacter,
        }));
      }
    });
  }, [blocks]);

  useEffect(() => {
    if (blocks.every((block) => block.some((cell) => cell))) {
      setBlocks((prevBlocks) => [...prevBlocks, [...initialBlock]]);
    }
  }, [blocks]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleCloseModal = () => {
    setShowInstructions(false);
  };

  return (
    <div className="main-container">
      {showInstructions && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal} />
          <div className="instructions-modal">
            <h2>Instrucciones</h2>
            <p>
              Bienvenido a la pizarra Braille. Aquí puedes practicar la escritura en Braille:
            </p>
            <ul>
              <img src={theme === "dark" ? imagenEsquina2 : imagenEsquina} alt="Imagen en esquina" className="corner-image" />
              <li>Usa las teclas <strong>F, D, S, J, K, L</strong> para activar o desactivar los puntos.</li>
              <li>Presiona la <strong>barra espaciadora</strong> o las <strong>flechas</strong> para moverte entre los bloques.</li>
            </ul>
            <button onClick={handleCloseModal} className="close-modal-button">
              Cerrar
            </button>
          </div>
        </>
      )}

      <div className="braille-slate-container">
        <div className="braille-slate">
          {blocks.map((block, blockIndex) => (
            <div key={blockIndex} className={`braille-block-container ${blockIndex === currentBlock ? "active-block" : ""}`}>
              <div className="braille-block">
                {block.map((cell, cellIndex) => (
                  <div key={cellIndex} className={`braille-cell ${cell ? "active" : ""}`} onClick={() => handleCellClick(blockIndex, cellIndex)} />
                ))}
              </div>
              <div className="recognized-character">{getCharacterFromBlock(block, blockIndex)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="logo-container2">
        {theme === "dark" ? (
          <img src={logoOscuro} alt="Logo Oscuro" className="logo-design" />
        ) : (
          <img src={logoClaro} alt="Logo Claro" className="logo-design" />
        )}
      </div>
      {/*<div className="sound-toggle" onClick={toggleSound}>
        <FontAwesomeIcon
          icon={soundEnabled ? faVolumeUp : faVolumeMute}
          className="sound-icon"
          title={soundEnabled ? "Desactivar sonido" : "Activar sonido"}
        />
      </div>*/}
      <div className="help-toggle" onClick={() => setShowInstructions(true)}>
        ?
      </div>
    </div>
  );
};

export default BrailleSlate;