import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MyToolBar from "../components/toolBar";
import Footer from "../components/footer";
import { useCart } from "../components/cartContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Productos = () => {
  const { addToCart } = useCart();
  const [favoritos, setFavoritos] = useState([]);

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

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
              <Card sx={{ height: "100%", position: "relative" }}>
                <IconButton
                  onClick={() => toggleFavorito(producto.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: favoritos.includes(producto.id)
                      ? "red"
                      : "rgba(255,255,255,0.6)",
                    zIndex: 1,
                  }}
                >
                  {favoritos.includes(producto.id) ? (
                    <Favorite />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>

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
