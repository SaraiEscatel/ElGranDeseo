import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

const ProductoForm = ({ onAdd, onUpdate, producto, editando }) => {
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    codigo: "",
    tipo: "",
    descripcion: "",
    precio: "",
    stock: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      onUpdate(formData);
    } else {
      onAdd({ ...formData, id: Date.now() });
    }
    setFormData({
      id: null,
      nombre: "",
      codigo: "",
      tipo: "",
      descripcion: "",
      precio: "",
      stock: "",
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
      />
      <TextField
        fullWidth
        margin="dense"
        label="Código"
        name="codigo"
        value={formData.codigo}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Tipo"
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Descripción"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Precio"
        name="precio"
        type="number"
        value={formData.precio}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Stock"
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        {editando ? "Actualizar Producto" : "Guardar Producto"}
      </Button>
    </Box>
  );
};

export default ProductoForm;
