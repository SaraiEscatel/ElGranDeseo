import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import MyToolBar from "../components/toolBar";
import Footer from "../components/footer";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const productos = [
  {
    id: 1,
    nombre: "Anillo Solitario",
    descripcion: "Descripción del producto 1.",
    imagen: "img/imgLogin.jpg",
    precio: "$100",
  },
  {
    id: 1,
    nombre: "Aretes de Copos de nieve",
    descripcion: "Descripción del producto 1.",
    imagen: "img/imgLogin3.jpg",
    precio: "$100",
  },
  {
    id: 1,
    nombre: "Aretes de perlas",
    descripcion: "Descripción del producto 1.",
    imagen: "img/imgLogin4.jpg",
    precio: "$100",
  },
];

const Productos = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MyToolBar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Productos
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Aquí puedes ver todos nuestros productos.
        </Typography>

        <Grid container spacing={3} mt={2}>
          {productos.map((producto) => (
            <Grid item xs={12} sm={6} md={4} key={producto.id}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={producto.imagen}
                  alt={producto.nombre}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {producto.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {producto.descripcion}
                  </Typography>
                  <Typography variant="subtitle1" color="text.primary" mt={1}>
                    {producto.precio}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Ver más
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default Productos;
