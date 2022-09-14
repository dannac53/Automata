import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulario from "./formulario/Formulario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="formulario" element={<Formulario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
