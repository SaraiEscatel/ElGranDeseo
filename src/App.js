import "./App.css";
import HomePage from "./components/homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Productos from "./page/productos";
import Nosotros from "./page/nosotros";
import Pedidos from "./page/pedidos";
import Login from "./page/login";
import Register from "./page/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
