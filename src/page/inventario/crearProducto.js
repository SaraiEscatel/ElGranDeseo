// src/page/inventario/CrearProducto.js
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const CrearProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      precio: parseFloat(precio),
    };

    try {
      const response = await fetch("http://localhost:5000/api/producto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Producto agregado con éxito: " + data.nombre);
        setNombre("");
        setPrecio("");
      } else {
        alert("Error al agregar el producto.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Agregar Producto
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Precio"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Agregar
        </Button>
      </form>
    </Box>
  );
};

export default CrearProducto;
