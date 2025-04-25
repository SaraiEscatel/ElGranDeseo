import React, { createContext, useContext, useState, useEffect } from "react";

// Crear contexto para el carrito
export const CartContext = createContext();

// Hook para usar el contexto en cualquier parte de la app
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Establecer el carrito en el estado y tratar de cargarlo de localStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : []; // Si no hay carrito guardado, empieza con uno vacío
  });

  // Efecto para guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Función para agregar productos al carrito
  const addToCart = (producto) => {
    setCartItems((prevItems) => [...prevItems, producto]);
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
