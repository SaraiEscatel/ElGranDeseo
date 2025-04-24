const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
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
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    await nuevoUsuario.save();

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error.message, error.stack);
    res.status(500).json({ error: "Error interno al registrar usuario" });
  }
});

// Ruta para login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario._id,
        nombre: usuario.first_name,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error.message, error.stack);
    res.status(500).json({ error: "Error interno al iniciar sesión" });
  }
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error("🔴 Error no manejado:", err.message, err.stack);
  res.status(500).json({ error: "Algo salió mal en el servidor" });
});

// Iniciar servidor
app.listen(5000, () => console.log("🚀 Backend en http://localhost:5000"));
