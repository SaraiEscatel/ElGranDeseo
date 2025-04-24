import React from "react";
import { AppBar, IconButton, Toolbar, Box, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const MyButton = ({ text, to, onClick }) => {
  return (
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
};

const MyToolBar = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
    window.location.reload();
  };

  return (
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
        </Box>

        <IconButton sx={{ color: "#101010", fontSize: 50, mt: 3 }}>
          <ShoppingCartIcon sx={{ color: "#101010", fontSize: 50 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MyToolBar;
