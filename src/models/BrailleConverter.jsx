import { useState } from "react";
import brailleDict from "../braille-resources/brailleDictionary";
import "../styles/BrailleConverter.css";

const BrailleConverter = () => {
  const [inputText, setInputText] = useState("");
  const [brailleText, setBrailleText] = useState("");

  // Función de conversión
  const convertToBraille = () => {
    const converted = inputText
      .toLowerCase()
      .split("")
      .map(char => brailleDict[char] || "?") // Si no está en el diccionario, mostrar "?"
      .join("");
    setBrailleText(converted);
  };

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
        />
        <button onClick={convertToBraille} className="braille-button">
          Convertir
        </button>
        <p className="braille-output">{brailleText}</p>
      </div>
    </div>
  );
};

export default BrailleConverter;
