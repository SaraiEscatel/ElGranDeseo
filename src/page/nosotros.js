import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <Link to="/">Inicio</Link>
    <Link to="/nosotros">Productos</Link>
  </nav>
);

const Nosotros = () => {
  return (
    <div>
      <h1>Nosotros</h1>
      <p>Esta es la página de nosotros.</p>
    </div>
  );
};

export default Nosotros;
