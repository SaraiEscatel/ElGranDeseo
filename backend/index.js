const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Usuario = require("./models/usuario");

const app = express();
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

// Ruta para registrar usuarios
app.post("/api/usuarios", async (req, res) => {
  try {
    console.log("📥 Datos recibidos:", req.body);

    const { first_name, last_name, email, password } = req.body;

    // Validación
    if (!first_name || !last_name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      first_name,
      last_name,
      email,
      password,
    });
    await nuevoUsuario.save();

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error.message, error.stack);
    res.status(500).json({ error: "Error interno al registrar usuario" });
  }
});

// Middleware global de manejo de errores (opcional pero útil)
app.use((err, req, res, next) => {
  console.error("🔴 Error no manejado:", err.message, err.stack);
  res.status(500).json({ error: "Algo salió mal en el servidor" });
});

// Iniciar servidor
app.listen(5000, () => console.log("🚀 Backend en http://localhost:5000"));
