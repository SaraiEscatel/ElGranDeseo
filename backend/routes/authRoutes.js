const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");

// Registrar usuario
router.post("/usuarios", async (req, res) => {
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

    // Si el correo termina en @grandeseo.com, es administrador automáticamente
    const esAdmin = email.toLowerCase().endsWith("@grandeseo.com");

    const nuevoUsuario = new Usuario({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      isAdmin: esAdmin,
    });

    await nuevoUsuario.save();

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error.message, error.stack);
    res.status(500).json({ error: "Error interno al registrar usuario" });
  }
});

// Login
router.post("/login", async (req, res) => {
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

    const rutaDestino = usuario.isAdmin ? "/admin" : "/";

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario._id,
        nombre: usuario.first_name,
        email: usuario.email,
        isAdmin: usuario.isAdmin,
      },
      redireccion: rutaDestino,
    });
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error.message, error.stack);
    res.status(500).json({ error: "Error interno al iniciar sesión" });
  }
});

module.exports = router;
