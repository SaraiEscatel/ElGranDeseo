import "./App.css";
import HomePage from "./components/homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Productos from "./page/productos";
import Nosotros from "./page/nosotros";
import Pedidos from "./page/pedidos";
import Login from "./page/login";
import Register from "./page/register";
import { CartProvider } from "./components/cartContext";
import Carrito from "./components/carrito";
import Admin from "./page/inventario/admin";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
