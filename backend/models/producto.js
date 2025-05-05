const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    tipo: {
      type : String,
      required: true
    },
    descripcion: {
      type: String,
    },
    costo: {
      type: Number,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    cantidad: {
      type: Number,
      default: 0,
    },
    imagen: {
      type: String,
      required: false 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producto", productoSchema);
