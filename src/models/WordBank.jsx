import React, { useState, useEffect, useRef } from "react";
import "../styles/WordBank.css";
import imagenEsquina from "../assets/MaquinaPerkins.png";
import imagenEsquina2 from "../assets/MaquinaPerkinsNegro.png";
import catarina from "../assets/Catarina.gif";
import felicidades from "../assets/Felicidades.gif";
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

const basicWords = [
  "empresa", "mercado", "finanzas", "inversión", "estrategia", "marketing", "ventas", "producto", "servicio", "cliente",
  "competencia", "innovación", "gestión", "liderazgo", "economía", "beneficio", "presupuesto", "contrato", "negociación", "exportación",
 
  "sociedad", "cultura", "política", "economía", "historia", "geografía", "psicología", "sociología", "antropología", "derecho",
  "comunicación", "educación", "globalización", "democracia", "justicia", "ética", "investigación", "estadística", "comportamiento", "desarrollo",

  "ingeniería", "tecnología", "diseño", "construcción", "mecánica", "eléctrica", "software", "hardware", "robótica", "innovación",
  "energía", "sistema", "proyecto", "análisis", "matemáticas", "física", "química", "materiales", "automoción", "telecomunicaciones",

  "literatura", "filosofía", "arte", "lenguaje", "poesía", "teatro", "música", "cine", "historia", "religión",
  "crítica", "creatividad", "pensamiento", "ensayo", "narrativa", "mitología", "tradición", "identidad", "cultura", "humanismo",

  "biología", "química", "física", "matemáticas", "geología", "astronomía", "ecología", "genética", "evolución", "microscopio",
  "experimento", "investigación", "teoría", "hipótesis", "laboratorio", "átomo", "molécula", "energía", "universo", "planeta",

  "medicina", "salud", "enfermedad", "paciente", "hospital", "cirugía", "diagnóstico", "tratamiento", "farmacia", "vacuna",
  "virus", "bacteria", "síntoma", "prevención", "anatomía", "fisiología", "neurología", "cardiología", "pediatría", "epidemiología",

  /*"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "30", 
  "40", "50", "60", "70", "80", "90", "100", "200", "500", "1000", "1994", "2023", "123", "999", "178", "475", "379", "126", "489"*/
];

const WordBank = ({ theme }) => {
  const initialBlock = [false, false, false, false, false, false];
  const [blocks, setBlocks] = useState(() => Array.from({ length: 8 }, () => [...initialBlock]));
  const [currentBlock, setCurrentBlock] = useState(0);
  const [numberModeBlocks, setNumberModeBlocks] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [incorrectBlocks, setIncorrectBlocks] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [showLetters, setShowLetters] = useState(false);
  const blocksContainerRef = useRef(null);
  const [showCatarina, setShowCatarina] = useState(false);
  const [showFelicidades, setShowFelicidades] = useState(false);
  const [lastRecognizedCharacters, setLastRecognizedCharacters] = useState({});
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!gameOver) {
      setCurrentWord(basicWords[Math.floor(Math.random() * basicWords.length)]);
    }
  }, [gameOver]);

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
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentBlock, blocks.length]);

  const handleCellClick = (blockIndex, cellIndex) => {
    setBlocks(prevBlocks => {
      const newBlocks = prevBlocks.map(block => [...block]);
      newBlocks[blockIndex][cellIndex] = !newBlocks[blockIndex][cellIndex];
      return newBlocks;
    });
    setCurrentBlock(blockIndex);
  };

  useEffect(() => {
    const newNumberModeBlocks = [];
    blocks.forEach((block, index) => {
      const pattern = block.map(cell => (cell ? "1" : "0")).join("");
      if (pattern === NUMBER_INDICATOR) {
        newNumberModeBlocks.push(index);
      }
    });
    setNumberModeBlocks(newNumberModeBlocks);
  }, [blocks]);

  const getCharacterFromBlock = (block, index) => {
    const pattern = block.map(cell => (cell ? "1" : "0")).join("");

    if (index < currentWord.length) {
      if (numberModeBlocks.includes(index - 1)) {
        return braillePatternToNumber[pattern] || "?";
      }
      return braillePatternToLetter[pattern] || "?";
    }
    return "";
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
        setLastRecognizedCharacters(prev => ({
          ...prev,
          [blockIndex]: currentCharacter,
        }));
      }
    });
  }, [blocks]);

  useEffect(() => {
    if (blocks.every(block => block.some(cell => cell))) {
      setBlocks(prevBlocks => [...prevBlocks, [...initialBlock]]);
    }
  }, [blocks]);

  const checkWord = () => {
    setShowLetters(true);

    const writtenWord = blocks.map((block, index) => getCharacterFromBlock(block, index)).join("");
    let correctLetters = 0;
    for (let i = 0; i < writtenWord.length; i++) {
      if (writtenWord[i] === currentWord[i]) {
        correctLetters++;
      }
    }

    if (writtenWord === currentWord) {
      setScore(prevScore => prevScore + 10);
      setMessage("¡Correcto! ¡Buen trabajo!");
      setShowCatarina(true);
      setShowFelicidades(true);

      if (score + 10 >= basicWords.length * 10) {
        setMessage("¡Felicidades! Has completado todas las palabras.");
        setGameOver(true);
      }
    } else {
      setScore(prevScore => prevScore + correctLetters);
      setErrors(prevErrors => prevErrors + 1);
      if (errors + 1 >= 3) {
        setMessage("¡Has cometido 3 errores! Juego terminado.");
        setGameOver(true);
        startCountdown();
      } else {
        setMessage(`Tienes ${correctLetters} letras correctas. Inténtalo de nuevo.`);
      }
    }

    const incorrectIndices = [];
    for (let i = 0; i < writtenWord.length; i++) {
      if (writtenWord[i] !== currentWord[i]) {
        incorrectIndices.push(i);
      }
    }
    setIncorrectBlocks(incorrectIndices);

    setCurrentBlock(null);
  };

  const startCountdown = () => {
    setCountdown(10);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          restartGame();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const restartGame = () => {
    setScore(0);
    setErrors(0);
    setGameOver(false);
    setMessage("");
    setIncorrectBlocks([]);
    setCurrentWord(basicWords[Math.floor(Math.random() * basicWords.length)]);
    setBlocks(Array.from({ length: 8 }, () => [...initialBlock]));
    setCountdown(0);
    setShowLetters(false);
    setShowCatarina(false);
    setShowFelicidades(false);
  };

  const newAttempt = () => {
    setCurrentWord(basicWords[Math.floor(Math.random() * basicWords.length)]);
    setBlocks(Array.from({ length: 8 }, () => [...initialBlock]));
    setIncorrectBlocks([]);
    setCurrentBlock(0);
    setMessage("");
    setShowLetters(false);
    setShowCatarina(false);
    setShowFelicidades(false);
  };

  const sameWordAttempt = () => {
    setBlocks(Array.from({ length: 8 }, () => [...initialBlock]));
    setIncorrectBlocks([]);
    setCurrentBlock(0);
    setMessage("");
    setShowLetters(false);
    setShowCatarina(false);
    setShowFelicidades(false);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleCloseModal = () => {
    setShowInstructions(false);
  };

  return (
    <div className="wordBank">
      {showInstructions && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal} />
          <div className="instructions-modal">
            <h2>Instrucciones</h2>
            <p>
              Bienvenido al banco de palabras. Aquí puedes practicar la escritura en Braille:
            </p>
            <ul>
              <li>Usa las teclas <strong>F, D, S, J, K, L</strong> para activar o desactivar los puntos.</li>
              <li>Presiona la <strong>barra espaciadora</strong> o las <strong>flechas</strong> para moverte entre los bloques.</li>
              <li>Haz clic en <strong>Verificar</strong> para comprobar si la palabra es correcta.</li>
              <li>Gana puntos por cada palabra correcta y evita cometer 3 errores.</li>
            </ul>
            <button onClick={handleCloseModal} className="close-modal-button">
              Cerrar
            </button>
          </div>
        </>
      )}

      <div className="user-name-input">
        <label htmlFor="userName">Nombre:</label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Ingresa tu nombre"
          aria-label="Ingresa tu nombre"
        />
      </div>

      <div className="word-to-write">Palabra a escribir: {currentWord}</div>

      <div className="braille-blocks-container" ref={blocksContainerRef}>
        <div className="braille-slate">
          {blocks.map((block, blockIndex) => {
            const character = getCharacterFromBlock(block, blockIndex);
            return (
              <div
                key={blockIndex}
                className={`braille-block-container ${
                  currentBlock !== null && blockIndex === currentBlock ? "active-block" : ""
                } ${
                  incorrectBlocks.includes(blockIndex) ? "incorrect-block" : ""
                }`}
              >
                <div className="braille-block">
                  {block.map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className={`braille-cell ${cell ? "active" : ""}`}
                      onClick={() => handleCellClick(blockIndex, cellIndex)}
                      aria-label={`Celda ${cellIndex + 1} del bloque ${blockIndex + 1}, ${cell ? "activada" : "desactivada"}`}
                    />
                  ))}
                </div>
                {showLetters && (
                  <div className="braille-letter">
                    {character}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="controls-container">
        <button 
          onClick={checkWord} 
          disabled={gameOver || countdown > 0}
          aria-label="Verificar la palabra ingresada"
        >
          Verificar
        </button>
        <button 
          onClick={newAttempt} 
          disabled={gameOver || countdown > 0}
          aria-label="Generar una nueva palabra para escribir en Braille"
        >
          Nueva Palabra
        </button>
        <button 
          onClick={sameWordAttempt} 
          disabled={gameOver || countdown > 0}
          aria-label="Intentar escribir la misma palabra nuevamente"
        >
          Misma Palabra
        </button>
        {message && <div className="message" aria-live="polite">{message}</div>}
        {countdown > 0 && (
          <div className="countdown">
            Reiniciando en {countdown} segundos...
          </div>
        )}
        <div className="score">Puntuación de {userName || "Usuario"}: {score}</div>
        <div className="errors">Errores: {errors}</div>
      </div>
      <div className="image-container">
        <img 
          src={theme === 'dark' ? imagenEsquina2 : imagenEsquina} 
          alt="Imagen decorativa en la esquina" 
          className="corner-image" 
        />
      </div>  
      {showCatarina && (
        <div className="catarina-container">
          <img src={catarina} alt="Animación de Catarina" className="catarina-gif" />
        </div>
      )}
      {showFelicidades && (
        <div className="felicidades-container">
          <img src={felicidades} alt="Animación de Felicidades" className="felicidades-gif" />
        </div>
      )}
      <div className="logo-container2">
        {theme === 'dark' ? (
          <img src={logoOscuro} alt="Logo de la aplicación en modo oscuro" className="logo-design" />
        ) : (
          <img src={logoClaro} alt="Logo de la aplicación en modo claro" className="logo-design" />
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

export default WordBank;