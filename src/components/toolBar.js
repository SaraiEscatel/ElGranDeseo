import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Button,
  Badge, // <-- Aquí está bien
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "./cartContext"; // 👈 Esto está bien

const MyButton = ({ text, to }) => {
  return (
    <Button
      component={Link}
      to={to}
      variant="h6"
      sx={{
        flexGrow: 1,
        color: "black",
        fontSize: 23,
        fontWeight: 60,
        ml: 5,
      }}
    >
      {text}
    </Button>
  );
};

const MyToolBar = () => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const { cartItems } = useCart();

  const handleOpenCarrito = () => {
    window.open("/carrito", "_blank");
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#d9dad8", height: "15vh" }}
      >
        <Toolbar>
          <Box
            sx={{
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              position: "relative",
              top: "20px",
            }}
          >
            <img
              src="img/logo.png"
              alt="logo"
              style={{ maxWidth: "120%", height: "auto", borderRadius: "50%" }}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              ml: 2,
              mt: 4,
            }}
          >
            <MyButton text="Inicio" to="/" />
            <MyButton text="Productos" to="/productos" />
            <MyButton text="Nosotros" to="/nosotros" />
            <MyButton text="Pedidos" to="/pedidos" />
            <MyButton text="Iniciar Sesion" to="/login" />
            <MyButton text="Register" to="/register" />
          </Box>

          <IconButton
            edge="end"
            sx={{ color: "#101010", fontSize: 50, mt: 3 }}
            onClick={handleOpenCarrito}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon sx={{ color: "#101010", fontSize: 50 }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MyToolBar;
