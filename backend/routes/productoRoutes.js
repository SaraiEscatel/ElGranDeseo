const express = require("express");
const router = express.Router();
const Producto = require("../models/producto");

// Crear producto
router.post("/producto", async (req, res) => {
  try {
    const { product_name, description, cost, price, stock, image } = req.body;

    const nuevoProducto = new Producto({
      product_name,
      description,
      cost,
      price,
      stock,
      image,
    });

    await nuevoProducto.save();

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("❌ Error al crear producto:", error.message, error.stack);
    res.status(500).json({ error: "Error interno al crear producto" });
  }
});

// Obtener todos los productos
router.get("/productos", async (req, res) => {
  console.log('Recibiendo solicitud GET para obtener productos...');
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error.message, error.stack);
    res.status(500).json({ error: "Error interno al obtener productos" });
  }
});

module.exports = router;
