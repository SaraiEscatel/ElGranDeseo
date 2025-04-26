const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    cost: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: false 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producto", productoSchema);
