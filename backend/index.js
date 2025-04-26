const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const productoRoutes = require("./routes/productoRoutes");


// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://admin:12345@cluster0.rillgir.mongodb.net/miBaseDeDatos?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// Rutas
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes); // <--- Montamos las rutas de usuario/login
app.use("/api", productoRoutes); // Ruta para productos

// Middleware global de errores
app.use((err, req, res, next) => {
  console.error("🔴 Error no manejado:", err.message, err.stack);
  res.status(500).json({ error: "Algo salió mal en el servidor" });
});

// Iniciar servidor
app.listen(5000, () => console.log("🚀 Backend en http://localhost:5000"));
