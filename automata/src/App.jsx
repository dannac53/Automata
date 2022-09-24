import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulario from "./formulario/Formulario";
import Home from "./home/Home"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="formulario" element={<Formulario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
