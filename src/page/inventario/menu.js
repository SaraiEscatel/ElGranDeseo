import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Menu = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleItemClick = (ruta) => {
    setOpen(false);
    onNavigate(ruta);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <IconButton color="#fff" onClick={toggleDrawer} edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#000" }}>
            Inventario
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={() => handleItemClick("inicio")}>
            <HomeIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button onClick={() => handleItemClick("inventario")}>
            <InventoryIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Inventario" />
          </ListItem>
          <ListItem button onClick={() => handleItemClick("ventas")}>
            <PointOfSaleIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Ventas del Día" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleItemClick("salir")}>
            <ExitToAppIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Salir" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Menu;
