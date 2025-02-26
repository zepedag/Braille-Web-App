import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./models/NavBar";
import BrailleSlate from "./models/BrailleSlate";
import BrailleConverter from "./models/BrailleConverter";
import WordBank from "./models/WordBank"; 

const Home = () => <h2 className="text-center mt-10">Bienvenido a la App de Braille</h2>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<BrailleConverter />} />
        <Route path="/slate" element={<BrailleSlate />} />
        <Route path="/wordbank" element={<WordBank />} />
      </Routes>
    </Router>
  );
}

export default App;
