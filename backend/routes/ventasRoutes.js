const express = require("express");
const router = express.Router();
const Venta = require("../models/venta");

router.post("/venta", async (req, res) => {
  try {
    const nuevaVenta = new Venta(req.body);
    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (error) {
    console.error("❌ Error al crear venta:", error.message);
    res.status(500).json({ error: "Error al guardar la venta" });
  }
});

router.get("/ventas", async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate("cliente", "nombre correo") // Mostrar solo nombre y correo del cliente
      .populate("productos.producto", "nombre precio"); // Mostrar nombre y precio del producto

    res.status(200).json(ventas);
  } catch (error) {
    console.error("❌ Error al obtener ventas:", error.message);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
});

module.exports = router;
