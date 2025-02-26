import React, { useState, useEffect } from "react";
import "../styles/WordBank.css";

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
  "casa", "perro", "gato", "árbol", "flor", "sol", "luna", "estrella", "cielo", "agua",
  "fuego", "tierra", "viento", "mar", "río", "montaña", "bosque", "campo", "ciudad", "pueblo",
  "calle", "escuela", "libro", "lápiz", "papel", "mesa", "silla", "puerta", "ventana", "pared",
  "techo", "suelo", "cama", "almohada", "manta", "ropa", "zapato", "sombrero", "reloj", "espejo",
  "plato", "vaso", "cuchara", "tenedor", "cuchillo", "comida", "bebida", "fruta", "verdura", "pan"
];

const WordBank = () => {
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
  const [countdown, setCountdown] = useState(0); // Contador de 10 segundos

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
    
    if (numberModeBlocks.includes(index - 1)) {
      return braillePatternToNumber[pattern] || "";
    }
    
    return braillePatternToLetter[pattern] || "";
  };

  useEffect(() => {
    if (blocks.every(block => block.some(cell => cell))) {
      setBlocks(prevBlocks => [...prevBlocks, [...initialBlock]]);
    }
  }, [blocks]);

  const checkWord = () => {
    const writtenWord = blocks.map((block, index) => getCharacterFromBlock(block, index)).join("");

    // Verifica cuántas letras son correctas
    let correctLetters = 0;
    const incorrectIndices = [];
    for (let i = 0; i < writtenWord.length; i++) {
      if (writtenWord[i] === currentWord[i]) {
        correctLetters++;
      } else {
        incorrectIndices.push(i); // Almacena los índices de los bloques incorrectos
      }
    }

    // Calcula la puntuación
    let points = correctLetters; // 1 punto por cada letra correcta
    if (writtenWord === currentWord) {
      points += 5; // 5 puntos adicionales si la palabra está completa y correcta
    }

    // Actualiza la puntuación
    setScore(prevScore => prevScore + points);

    // Muestra el mensaje correspondiente
    if (writtenWord === currentWord) {
      setMessage("¡Correcto! ¡Buen trabajo!");
      if (score + points >= basicWords.length * 6) { // Verifica si se completaron todas las palabras
        setMessage("¡Felicidades! Has completado todas las palabras.");
        setGameOver(true);
      }
    } else {
      setErrors(prevErrors => prevErrors + 1);
      if (errors + 1 >= 3) {
        setMessage("¡Has cometido 3 errores! Juego terminado.");
        setGameOver(true);
        startCountdown(); // Inicia el contador de 10 segundos
      } else {
        setMessage("Inténtalo de nuevo.");
      }
    }

    // Marca los bloques incorrectos
    setIncorrectBlocks(incorrectIndices);

    // Desactiva el recuadro verde
    setCurrentBlock(null); // Establece currentBlock en null para desactivar el marco verde
  };

  const startCountdown = () => {
    setCountdown(10); // Inicia el contador en 10 segundos
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          restartGame(); // Reinicia el juego cuando el contador llega a 0
        }
        return prev - 1;
      });
    }, 1000); // Actualiza el contador cada segundo
  };

  const restartGame = () => {
    setScore(0);
    setErrors(0);
    setGameOver(false);
    setMessage("");
    setIncorrectBlocks([]); // Limpia los bloques incorrectos
    setCurrentWord(basicWords[Math.floor(Math.random() * basicWords.length)]);
    setBlocks(Array.from({ length: 8 }, () => [...initialBlock]));
    setCountdown(0); // Reinicia el contador
  };

  const newAttempt = () => {
    setCurrentWord(basicWords[Math.floor(Math.random() * basicWords.length)]);
    setBlocks(Array.from({ length: 8 }, () => [...initialBlock]));
    setIncorrectBlocks([]); // Limpia los bloques incorrectos
    setCurrentBlock(0); // Reinicia al primer bloque
    setMessage(""); // Limpia el mensaje
  };

  const sameWordAttempt = () => {
    setBlocks(Array.from({ length: 8 }, () => [...initialBlock]));
    setIncorrectBlocks([]); // Limpia los bloques incorrectos
    setCurrentBlock(0); // Reinicia al primer bloque
    setMessage(""); // Limpia el mensaje
  };

  return (
    <div className="wordBank">
      <div className="word-to-write">Palabra a escribir: {currentWord}</div>
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
                />
              ))}
            </div>
            {character && <div className="recognized-character">{character}</div>}
          </div>
        );
      })}
      <button onClick={checkWord} disabled={gameOver || countdown > 0}>Verificar</button>
      <button onClick={newAttempt} disabled={gameOver || countdown > 0}>Nueva Palabra</button>
      <button onClick={sameWordAttempt} disabled={gameOver || countdown > 0}>Misma Palabra</button>
      {message && <div className="message">{message}</div>}
      {countdown > 0 && (
        <div className="countdown">
          Reiniciando en {countdown} segundos...
        </div>
      )}
      <div className="score">Puntuación: {score}</div>
      <div className="errors">Errores: {errors}</div>
    </div>
  );
};

export default WordBank;