import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [abierto, setAbierto] = useState(false);
  const navegar = useNavigate();

  const toggleDrawer = (open) => () => {
    setAbierto(open);
  };

  const opciones = [
    { texto: "Inicio", ruta: "/" },
    { texto: "Inventario", ruta: "/admin" },
    { texto: "Ventas del Día", ruta: "/ventas" },
    { texto: "Salir", ruta: "/login" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar sx={{ paddingLeft: 0, minHeight: "48px" }}>
          <IconButton
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{
              marginLeft: 0,
              padding: "4px",
            }}
          >
            <MenuIcon sx={{ color: "#000" }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            color="#000"
            sx={{ fontSize: 15, marginLeft: 1 }}
          >
            Joyería de Plata - Panel Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={abierto} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {opciones.map((opcion) => (
              <ListItem key={opcion.texto} disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (opcion.texto === "Salir") {
                      localStorage.clear();
                      alert("Has cerrado sesión correctamente.");
                      setTimeout(() => {
                        navegar(opcion.ruta);
                      }, 1500);
                    } else {
                      navegar(opcion.ruta);
                    }
                  }}
                >
                  <ListItemText primary={opcion.texto} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Menu;
