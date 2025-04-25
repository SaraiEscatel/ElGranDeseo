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
import { useCart } from "../components/cartContext";
//

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
    id: 2,
    nombre: "Aretes de Copos de nieve",
    descripcion: "Descripción del producto 1.",
    imagen: "img/imgLogin3.jpg",
    precio: "$100",
  },
  {
    id: 3,
    nombre: "Aretes de perlas",
    descripcion: "Descripción del producto 1.",
    imagen: "img/imgLogin4.jpg",
    precio: "$100",
  },
  {
    id: 4,
    nombre: "Anillo Solitario",
    descripcion: "Descripción del producto 1.",
    imagen: "img/1image.jpg",
    precio: "$100",
  },
  {
    id: 5,
    nombre: "Aretes de Copos de nieve",
    descripcion: "Descripción del producto 1.",
    imagen: "img/2image.jpg",
    precio: "$100",
  },
  {
    id: 6,
    nombre: "Aretes de perlas",
    descripcion: "Descripción del producto 1.",
    imagen: "img/3image.jpg",
    precio: "$100",
  },
  {
    id: 7,
    nombre: "Anillo Solitario",
    descripcion: "Descripción del producto 1.",
    imagen: "img/4image.jpg",
    precio: "$100",
  },
  {
    id: 8,
    nombre: "Aretes de Copos de nieve",
    descripcion: "Descripción del producto 1.",
    imagen: "img/5image.jpg",
    precio: "$100",
  },
  {
    id: 9,
    nombre: "Aretes de perlas",
    descripcion: "Descripción del producto 1.",
    imagen: "img/imge 6.jpg",
    precio: "$100",
  },
  {
    id: 10,
    nombre: "Anillo Solitario",
    descripcion: "Descripción del producto 1.",
    imagen: "img/imgLogin.jpg",
    precio: "$100",
  },
  {
    id: 11,
    nombre: "Aretes de Copos de nieve",
    descripcion: "Descripción del producto 1.",
    imagen: "img/imgLogin3.jpg",
    precio: "$100",
  },
  {
    id: 12,
    nombre: "Aretes de perlas",
    descripcion: "Descripción del producto 1.",
    imagen: "img/imgLogin4.jpg",
    precio: "$100",
  },
];

const Productos = () => {
  const { addToCart } = useCart();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MyToolBar />
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          fontFamily={"ITC Benguiat"}
          fontSize={70}
          fontWeight={700}
          color="#d9dad8"
          gutterBottom
        >
          Productos
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          fontFamily={"ITC Benguiat"}
          fontSize={30}
          fontWeight={700}
          gutterBottom
        >
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
                  <Button
                    onClick={() => addToCart(producto)}
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 2,
                      borderRadius: 5,
                      color: "#0A0A0A",
                      backgroundColor: "#d9dad8",
                      display: "block",
                      mx: "auto",
                    }}
                  >
                    Añadir al carrito
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
