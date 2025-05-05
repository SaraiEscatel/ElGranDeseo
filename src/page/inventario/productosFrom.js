import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

const ProductoForm = ({ onUpdate, producto, editando }) => {
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    costo: "",
    tipo: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  useEffect(() => {
    if (editando && producto) {
      setFormData(producto);
    }
  }, [editando, producto]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editando) {
      // lógica de actualización local
      onUpdate(formData);
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/producto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          alert("Producto guardado con éxito: " + data.nombre);
        } else {
          alert("Error al guardar el producto.");
        }
      } catch (error) {
        console.error("Error al hacer POST:", error);
        alert("Ocurrió un error al conectar con el servidor.");
      }
    }

    // Limpiar formulario
    setFormData({
      id: null,
      nombre: "",
      costo: "",
      tipo: "",
      descripcion: "",
      precio: "",
      stock: "",
      imagen: "",
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        margin="dense"
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="dense"
        label="Tipo"
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="dense"
        label="Descripción"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="dense"
        label="Costo"
        name="costo"
        value={formData.costo}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="dense"
        label="Precio"
        name="precio"
        type="number"
        value={formData.precio}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="dense"
        label="Stock"
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="dense"
        label="Imagen"
        name="imagen"
        type="text"
        value={formData.imagen}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        {editando ? "Actualizar Producto" : "Guardar Producto"}
      </Button>
    </Box>
  );
};

export default ProductoForm;
