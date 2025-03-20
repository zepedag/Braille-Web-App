import { useState } from "react";
import brailleDict from "../braille-resources/brailleDictionary";
import "../styles/BrailleConverter.css";
import logoClaro from "../assets/LOGO_STEM-07.png";
import logoOscuro from "../assets/LOGO_STEM-08.png";

const BrailleConverter = ({ theme }) => {
  const [inputText, setInputText] = useState("");
  const [brailleText, setBrailleText] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  
  const convertToBraille = () => {
    const converted = inputText
      .toLowerCase()
      .split("")
      .map((char) => brailleDict[char] || "?")
      .join("");
    setBrailleText(converted);
  };

  
  const handleCloseModal = () => {
    setShowInstructions(false);
  };

  
  const brailleAlphabet = [
    { letter: "a", braille: "⠁" },
    { letter: "b", braille: "⠃" },
    { letter: "c", braille: "⠉" },
    { letter: "d", braille: "⠙" },
    { letter: "e", braille: "⠑" },
    { letter: "f", braille: "⠋" },
    { letter: "g", braille: "⠛" },
    { letter: "h", braille: "⠓" },
    { letter: "i", braille: "⠊" },
    { letter: "j", braille: "⠚" },
    { letter: "k", braille: "⠅" },
    { letter: "l", braille: "⠇" },
    { letter: "m", braille: "⠍" },
    { letter: "n", braille: "⠝" },
    { letter: "o", braille: "⠕" },
    { letter: "p", braille: "⠏" },
    { letter: "q", braille: "⠟" },
    { letter: "r", braille: "⠗" },
    { letter: "s", braille: "⠎" },
    { letter: "t", braille: "⠞" },
    { letter: "u", braille: "⠥" },
    { letter: "v", braille: "⠧" },
    { letter: "w", braille: "⠺" },
    { letter: "x", braille: "⠭" },
    { letter: "y", braille: "⠽" },
    { letter: "z", braille: "⠵" },
    { letter: "á", braille: "⠷" },
    { letter: "é", braille: "⠮" },
    { letter: "í", braille: "⠌" },
    { letter: "ó", braille: "⠬" },
    { letter: "ü", braille: "⠳" },
    { letter: "ñ", braille: "⠻" }
  ];

  const brailleNumbers = [
    { number: "1", braille: "⠼⠁" }, 
    { number: "2", braille: "⠼⠃" },
    { number: "3", braille: "⠼⠉" },
    { number: "4", braille: "⠼⠙" },
    { number: "5", braille: "⠼⠑" },
    { number: "6", braille: "⠼⠋" },
    { number: "7", braille: "⠼⠛" },
    { number: "8", braille: "⠼⠓" },
    { number: "9", braille: "⠼⠊" },
    { number: "0", braille: "⠼⠚" },
  ];

  return (
    <div className="braille-container">
      <div className="braille-card">
        <h1 className="braille-title">Convertidor a Braille</h1>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe aquí..."
          className="braille-input"
          aria-label="Campo de texto para ingresar el texto a convertir en Braille"
        />
        <button
          onClick={convertToBraille}
          className="braille-button"
          aria-label="Botón para convertir el texto ingresado en Braille"
        >
          Convertir
        </button>
        <p className="braille-output" aria-live="polite">
          {brailleText}
        </p>
      </div>
      {showInstructions && (
        <>
        <div className="modal-overlay" onClick={handleCloseModal} />
          <div className="instructions-modal">
            <h2>Instrucciones</h2>
            <p>
              Ingresa texto en el campo de abajo para convertirlo a Braille. 
              Presiona el botón "Convertir" para ver el resultado en Braille.
            </p>
            <div className="braille-content">
              <div className="braille-alphabet">
                <h3>Abecedario Braille</h3>
                <div className="alphabet-grid">
                  {brailleAlphabet.map((item, index) => (
                    <div key={index} className="alphabet-item">
                      <span className="letter">{item.letter}</span>
                      <span className="braille">{item.braille}</span>
                      </div>
                    ))}
                  </div>
                </div>
                  <div className="braille-numbers">
                    <h3>Números en Braille</h3>
                    <div className="numbers-grid">
                      {brailleNumbers.map((item, index) => (
                        <div key={index} className="number-item">
                          <span className="number">{item.number}</span>
                          <span className="braille">{item.braille}</span>
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleCloseModal}
              className="close-modal-button"
            >
              Cerrar
            </button>
          </div>
        </>
      )}

      <div className="logo-container">
        {theme === "dark" ? (
          <img
            src={logoOscuro}
            alt="Logo de la aplicación en modo oscuro"
            className="logo-design"
          />
        ) : (
          <img
            src={logoClaro}
            alt="Logo de la aplicación en modo claro"
            className="logo-design"
          />
        )}
      </div>

      <div className="help-toggle" onClick={() => setShowInstructions(true)}>
        ?
      </div>
    </div>
  );
};

export default BrailleConverter;