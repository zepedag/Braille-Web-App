import { useState } from "react";
import brailleDict from "../braille-resources/brailleDictionary";
import "../styles/BrailleConverter.css";
import logoClaro from "../assets/LOGO_STEM-07.png";
import logoOscuro from "../assets/LOGO_STEM-08.png";

const BrailleConverter = ({ theme }) => {
  const [inputText, setInputText] = useState("");
  const [brailleText, setBrailleText] = useState("");
  
  const convertToBraille = () => {
    const converted = inputText
      .toLowerCase()
      .split("")
      .map(char => brailleDict[char] || "?") 
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
      <div className="logo-container">
            {theme === 'dark' ? (
              <img src={logoOscuro} alt="Logo Oscuro" className="logo-design" />
            ) : (
              <img src={logoClaro} alt="Logo Claro" className="logo-design" />
            )}
      </div>
    </div>
  );
};

export default BrailleConverter;
