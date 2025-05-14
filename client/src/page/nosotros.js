import React from "react";
import { Box, Typography, CssBaseline, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyToolBar from "../components/toolBar";
import Footer from "../components/footer";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0A0A0A",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#d9dad8",
      secondary: "#aaaaaa",
    },
    primary: {
      main: "#d9dad8",
    },
    error: {
      main: "#ff5555",
    },
  },
});

const Nosotros = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <MyToolBar />

        <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
          <Typography variant="h3" gutterBottom>
            Sobre Nosotros
          </Typography>
          <Typography variant="body1" paragraph>
            En nuestra joyería de plata, combinamos tradición artesanal con
            innovación digital para ofrecerte piezas únicas de alta calidad.
            Fundada con la pasión por el arte y el diseño, cada joya representa
            elegancia, historia y detalle.
          </Typography>
          <Typography variant="body1" paragraph>
            Nuestro objetivo es acercar la belleza de la plata mexicana a más
            personas, a través de una plataforma web que permite conocer,
            explorar y adquirir nuestras creaciones desde cualquier lugar.
            Creemos en el trato personalizado, la excelencia en el servicio y la
            autenticidad de nuestros productos.
          </Typography>
          <Typography variant="body1" paragraph>
            ¡Gracias por formar parte de nuestra historia!
          </Typography>
        </Container>

        <Box component="footer">
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Nosotros;
