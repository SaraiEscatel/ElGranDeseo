const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema(
  {
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario", 
    required: true
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      },
      subtotal: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Venta", ventaSchema);
