import { useState } from "react";
import brailleDict from "./braille-resources/brailleDictionary";

function App() {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Convertidor a Braille</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Escribe aquí..."
        className="border rounded p-2 mb-2 w-64 text-center"
      />
      <button
        onClick={convertToBraille}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Convertir
      </button>
      <p className="mt-4 text-2xl">{brailleText}</p>
    </div>
  );
}

export default App;
