import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import MyToolBar from "../components/toolBar";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const Navbar = () => (
  <nav>
    <Link to="/">Inicio</Link>
    <Link to="/login">Login</Link>
  </nav>
);

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0A0A0A" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  Link: {
    color: "#0A0A0A",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const Login = () => {
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
          backgroundColor: "rgba(0, 0, 0, 0.9)",
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
                fontSize: { xs: "30px", md: "40px" },
              }}
            >
              Iniciar sesión
            </Typography>

            <TextField
              label="Correo electrónico *"
              color="#0A0A0A"
              fullWidth
              margin="normal"
              autoComplete="email"
            />
            <TextField
              label="Contraseña *"
              color="#0A0A0A"
              fullWidth
              margin="normal"
              type="password"
              autoComplete="current-password"
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
      <Footer />
    </ThemeProvider>
  );
};

export default Login;
