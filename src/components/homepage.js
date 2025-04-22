import React from "react";
import {
  createTheme,
  ThemeProvider,
  Box,
  Typography,
  CssBaseline,
  Grid,
  Button,
} from "@mui/material";
import "@fontsource/poppins";
import MyToolBar from "./toolBar";
import Footer from "./footer";
import ManualCarousel from "./carousel";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Rocket } from "@mui/icons-material";

const Navbar = () => (
  <nav>
    <Link to="/">Inicio</Link>
    <Link to="/">Inicio</Link>
  </nav>
);
const theme = createTheme({
  palette: {
    background: {
      default: "#010101",
    },
    text: {
      primary: "#9d9e9c",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const productos = [
  {
    id: 1,
    descripcion: "Cada pieza fue hecha para brillar contigo",
    video: "/video/producto1.mp4",
  },
  {
    id: 2,

    descripcion: "La joyería no es solo un accesorio, es una expresión de ti.",
    video: "/video/producto2.mp4",
  },

  {
    id: 3,
    descripcion: "Sorpréndela con un brillo que refleje tu amor.",
    video: "/video/producto3.mp4",
  },
];

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyToolBar />

      {/* Contenedor principal */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          padding: "20px",
        }}
      >
        <Box
          mb={6}
          sx={{ my: 6, textAlign: "center", backgroundColor: "#0A0A0A", mt: 4 }}
        >
          <ManualCarousel />
        </Box>

        <Box
          sx={{ my: 6, textAlign: "center", backgroundColor: "#000", mt: 6 }}
        >
          <Typography
            variant="h4"
            color="white"
            textAlign="center"
            gutterBottom
          >
            Porque cada joya cuenta una historia… haz que la tuya brille.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {productos.map((producto) => (
              <Grid key={producto} item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    backgroundColor: "#0A0A0A",
                    borderRadius: 2,
                    padding: 2,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ my: 6, textAlign: "center" }}>
                    <Typography variant="h4" color="white" gutterBottom>
                      {producto.nombre}
                    </Typography>
                    <video
                      width="80%"
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ borderRadius: "8px" }}
                    >
                      <source src={producto.video} type="video/mp4" />
                      Tu navegador no soporta el video.
                    </video>
                  </Box>

                  <Typography
                    variant="body2"
                    color="whilete"
                    mb={2}
                    fontSize={16}
                  >
                    {producto.descripcion}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      mt: 1,
                      color: "white",
                      borderColor: "white",
                      borderRadius: 5,
                    }}
                  >
                    Ver más
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="h5" color="white">
            ¿Tienes dudas? ¡Contáctanos!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            +52 33 16 72 87 06 | contacto@elgrandeseo.com
          </Typography>
        </Box>
      </Box>

      {/* === FOOTER === */}
      <Footer />

      {/* === BOTÓN FLOTANTE DE WHATSAPP === */}
    </ThemeProvider>
  );
};

export default HomePage;
