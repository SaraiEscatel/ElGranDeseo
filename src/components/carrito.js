import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "./cartContext";
import MyToolBar from "../components/toolBar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

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

const Carrito = () => {
  const { cartItems, removeFromCart } = useCart();
  const theme = useTheme(); // para acceder al tema dentro del componente

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <MyToolBar />
        <Box sx={{ padding: 4 }}>
          <Typography
            variant="h4"
            fontFamily={"ITC Benguiat"}
            fontSize={60}
            fontWeight={700}
            gutterBottom
          >
            Carrito de Compras
          </Typography>

          {cartItems.length === 0 ? (
            <Typography variant="h6" color="text.secondary">
              Tu carrito está vacío.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {cartItems.map((producto, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={producto.imagen}
                      alt={producto.nombre}
                    />
                    <CardContent>
                      <Typography variant="h6">{producto.nombre}</Typography>
                      <Typography variant="body2">
                        {producto.descripcion}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        {producto.precio}
                      </Typography>
                      <IconButton
                        onClick={() => removeFromCart(index)}
                        sx={{ color: "error.main", mt: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {cartItems.length > 0 && (
            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 5,
                  padding: "10px 30px",
                }}
              >
                Proceder al pago
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ marginTop: "auto" }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Carrito;
