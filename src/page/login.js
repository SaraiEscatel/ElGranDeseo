import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MyToolBar from "../components/toolBar";
import Footer from "../components/footer";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0A0A0A" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      mostrarMensaje("Por favor completa ambos campos.", "error");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      mostrarMensaje(`¡Bienvenido/a ${res.data.usuario.nombre}!`, "success");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (error.response) {
        mostrarMensaje(error.response.data.error, "error");
      } else {
        mostrarMensaje("No se pudo conectar con el servidor.", "error");
      }
    }
  };

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyToolBar />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('/img/imgLogin2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", top: -150 }}>
          <Box
            sx={{
              p: 4,
              borderRadius: 1,
              backgroundColor: "rgba(18, 18, 18, 0.1)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              backdropFilter: "blur(6px)",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#fff",
                fontFamily: "ITC Benguiat",
              }}
            >
              Iniciar sesión
            </Typography>

            <TextField
              label="Correo electrónico *"
              fullWidth
              margin="normal"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Contraseña *"
              fullWidth
              margin="normal"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 5,
                py: 1.2,
                backgroundColor: "#C7B9FF",
                color: "black",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#bfa9ff",
                },
              }}
              onClick={handleLogin}
            >
              Iniciar sesión
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                style={{ color: "#C7B9FF", fontWeight: "bold" }}
              >
                Regístrate
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Snackbar de mensaje */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={tipoMensaje}
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          {mensaje}
        </Alert>
      </Snackbar>

      <Footer />
    </ThemeProvider>
  );
};

export default Login;
