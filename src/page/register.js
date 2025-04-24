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
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "../components/footer";
import axios from "axios";

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
  const [mensaje, setMensaje] = useState({
    text: "",
    type: "success",
    open: false,
  });

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
        setMensaje({
          text: "Debes aceptar los términos",
          type: "error",
          open: true,
        });
        return;
      }

      try {
        setIsSubmitting(true);
        const response = await axios.post(
          "http://localhost:5000/api/usuarios",
          {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password1,
          }
        );

        setMensaje({
          text: `Usuario ${response.data.nombre} registrado`,
          type: "success",
          open: true,
        });
        formik.resetForm();
        setTerms(false);
      } catch (error) {
        console.error(error);
        setMensaje({
          text: "Error al registrar usuario",
          type: "error",
          open: true,
        });
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
            {...formik.getFieldProps("first_name")}
            fullWidth
            label="Nombre"
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <TextField
            {...formik.getFieldProps("last_name")}
            fullWidth
            label="Apellido"
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
          <TextField
            {...formik.getFieldProps("email")}
            fullWidth
            label="Correo Electrónico"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            {...formik.getFieldProps("password1")}
            fullWidth
            type="password"
            label="Contraseña"
            error={formik.touched.password1 && Boolean(formik.errors.password1)}
            helperText={formik.touched.password1 && formik.errors.password1}
          />
          <TextField
            {...formik.getFieldProps("password2")}
            fullWidth
            type="password"
            label="Confirmar Contraseña"
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

      <Snackbar
        open={mensaje.open}
        autoHideDuration={6000}
        onClose={() => setMensaje({ ...mensaje, open: false })}
      >
        <Alert
          onClose={() => setMensaje({ ...mensaje, open: false })}
          severity={mensaje.type}
          sx={{ width: "100%" }}
        >
          {mensaje.text}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Register;
