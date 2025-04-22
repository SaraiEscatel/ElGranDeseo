import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyToolBar from "../components/toolBar";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "../components/footer";

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

const Register = () => {
  const [terms, setTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Navbar = () => (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/register">Productos</Link>
    </nav>
  );

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password1: "",
      password2: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Se requiere nombre"),
      last_name: Yup.string().required("Se requiere un apellido"),
      email: Yup.string()
        .email("Correo electrónico inválido")
        .required("Se requiere correo electrónico"),
      password1: Yup.string()
        .required("Se requiere contraseña")
        .min(8, "Mínimo 8 caracteres")
        .matches(/[A-Z]/, "Debe contener una mayúscula")
        .matches(/[0-9]/, "Debe contener un número")
        .matches(/[!@#$%^&*()_+.,?\":"]/, "Debe contener un carácter especial"),
      password2: Yup.string()
        .oneOf([Yup.ref("password1")], "Las contraseñas no coinciden")
        .required("Confirma tu contraseña"),
    }),
    onSubmit: async (values) => {
      if (!terms) {
        alert("Debes aceptar los términos y condiciones");
        return;
      }

      try {
        setIsSubmitting(true);
        console.log("Datos listos para enviar:", values);
        alert("¡Usuario registrado con éxito (modo prueba)!");
      } catch (error) {
        console.error("Error simulado", error);
        alert("Error simulado en el registro.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyToolBar />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          color: "text.primary",
          px: 4,
          py: 6,
          ml: { md: 25 },
        }}
      >
        <Typography variant="h3" gutterBottom>
          Regístrate y empieza a escribir tu historia con nuestras joyas
        </Typography>

        <Box
          component="img"
          src="img/imgeRegister.jpg"
          alt="Imagen de registro"
          sx={{
            width: { xs: "100%", md: "50%", lg: "45%" },
            maxHeight: 400,
            objectFit: "cover",
            borderRadius: 4,
            position: "relative",
            left: { xs: 0, md: "40%", lg: "45%" },
            top: 50,
          }}
        />

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{
            mt: -44,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: 640,
          }}
        >
          <TextField
            fullWidth
            name="first_name"
            label="Nombre"
            variant="outlined"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
          />

          <TextField
            fullWidth
            name="last_name"
            label="Apellido"
            variant="outlined"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />

          <TextField
            fullWidth
            name="email"
            label="Correo Electrónico"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoCapitalize="off"
          />

          <TextField
            fullWidth
            type="password"
            name="password1"
            label="Contraseña"
            variant="outlined"
            value={formik.values.password1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password1 && Boolean(formik.errors.password1)}
            helperText={formik.touched.password1 && formik.errors.password1}
            autoComplete="new-password"
          />

          <TextField
            fullWidth
            type="password"
            name="password2"
            label="Confirmar Contraseña"
            variant="outlined"
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                Acepto los{" "}
                <Link to="/terms" style={{ color: "#C7B9FF" }}>
                  términos y condiciones
                </Link>
              </Typography>
            }
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!formik.isValid || isSubmitting || !terms}
            sx={{
              height: 54,
              borderRadius: "50px",
              backgroundColor: "#C7B9FF",
              "&:disabled": {
                backgroundColor: "#ccc",
              },
            }}
          >
            {isSubmitting ? "Enviando..." : "¡Prueba Gratis!"}
          </Button>

          <Typography variant="body2" textAlign="center" mt={2}>
            No necesitas tarjeta de crédito para comenzar
          </Typography>
        </Box>
      </Box>

      <Footer />
    </ThemeProvider>
  );
};

export default Register;
