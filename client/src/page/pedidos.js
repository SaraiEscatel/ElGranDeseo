import React from "react";
import { Link } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import MyToolBar from "../components/toolBar";

const Navbar = () => (
  <nav>
    <Link to="/">Inicio</Link>
    <Link to="/pedidos">Productos</Link>
  </nav>
);

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1f1f1f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
    primary: {
      main: "#C7B9FF",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: { style: { color: "#ffffff" } },
        InputProps: {
          style: {
            color: "#ffffff",
            backgroundColor: "#1f1f1f",
          },
        },
        FormHelperTextProps: {
          style: { color: "#ff6b6b" },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:disabled": {
            backgroundColor: "#444",
            color: "#aaa",
          },
        },
      },
    },
  },
});
const Pedidos = () => {
  return (
    <ThemeProvider theme={theme}>
      <MyToolBar />
      
    </ThemeProvider>
  );
};

export default Pedidos;
