import React, { useState, useEffect } from "react";
import { AppBar, IconButton, Toolbar, Box, Button, Badge } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./cartContext";

const MyButton = ({ text, to, onClick }) => (
  <Button
    component={to ? Link : "button"}
    to={to}
    onClick={onClick}
    variant="h6"
    sx={{
      flexGrow: 1,
      color: "black",
      fontSize: 23,
      fontWeight: 60,
      ml: 5,
      textTransform: "none",
    }}
  >
    {text}
  </Button>
);

const MyToolBar = () => {
  const [visible, setVisible] = useState(false);
  const { cartItems } = useCart();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenCarrito = () => {
    window.open("/carrito", "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
    window.location.reload();
  };

  // Mostrar barra al mover el mouse en la parte superior
  useEffect(() => {
    let timeout;

    const handleMouseMove = (e) => {
      if (e.clientY <= 100) {
        // Solo se muestra si el mouse está dentro de los primeros 100px
        setVisible(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setVisible(false), 3000); // Ocultar después de 3s
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#d9dad8",
        height: "13vh",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
        pointerEvents: visible ? "auto" : "none", // Desactiva los clics cuando está oculto
        width: "100%",
        top: 0,
        left: 0,
      }}
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
          <MyButton text="Diseñar" to="/pedidos" />
          {!usuario ? (
            <>
              <MyButton text="Iniciar Sesión" to="/login" />
              <MyButton text="Registrarse" to="/register" />
            </>
          ) : (
            <>
              <MyButton text={`Hola, ${usuario.nombre}`} />
              <MyButton text="Cerrar sesión" onClick={handleLogout} />
            </>
          )}
          {location.pathname !== "/register" && (
            <IconButton
              edge="end"
              sx={{ color: "#101010", fontSize: 50, mt: -2 }}
              onClick={handleOpenCarrito}
            >
              <Badge
                badgeContent={cartItems.length}
                sx={{
                  "& .MuiBadge-badge": {
                    right: 4,
                    top: 4,
                    backgroundColor: "#D4AF37",
                    color: "#000",
                  },
                }}
              >
                <ShoppingBagIcon sx={{ color: "#101010", fontSize: 50 }} />
              </Badge>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MyToolBar;
