import React from "react";
import {
  AppBar,
  IconButton,
  Menu,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

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
          <Box>
            <MyButton text="Inicio" to="/" />
          </Box>
          <Box>
            <MyButton text="Productos" to="/productos" />
          </Box>
          <Box>
            <MyButton text="Nosotros" to="/nosotros" />
          </Box>
          <Box>
            <MyButton text="Pedidos" to="/pedidos" />
          </Box>
          <Box>
            <MyButton text="Iniciar Sesion" to="/login" />
          </Box>
          <Box>
            <MyButton text="Register" to="/register" />
          </Box>
        </Box>

        <IconButton sx={{ color: "#101010", fontSize: 50, mt: 3 }}>
          <ShoppingCartIcon sx={{ color: "#101010", fontSize: 50 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MyToolBar;
