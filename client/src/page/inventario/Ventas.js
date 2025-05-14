import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
} from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Menu from "../inventario/menu";

const Ventas = () => {
  const [ventas, setVentas] = useState(() => {
    const guardadas = localStorage.getItem("ventasDia");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [formulario, setFormulario] = useState({
    usuario: "",
    producto: "",
    cantidad: "",
    total: "",
  });

  const [filtro, setFiltro] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    localStorage.setItem("ventasDia", JSON.stringify(ventas));
  }, [ventas]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const agregarVenta = () => {
    const ahora = new Date();
    const fechaHora = ahora.toLocaleString();
    const nuevaVenta = {
      id: Date.now(),
      ...formulario,
      cantidad: parseInt(formulario.cantidad),
      total: parseFloat(formulario.total),
      fechaHora,
    };
    setVentas([...ventas, nuevaVenta]);
    setFormulario({ usuario: "", producto: "", cantidad: "", total: "" });
  };

  const eliminarVenta = (id) => {
    const confirmacion = window.confirm("¿Eliminar esta venta?");
    if (confirmacion) {
      setVentas(ventas.filter((venta) => venta.id !== id));
    }
  };

  const limpiarVentas = () => {
    const confirmacion = window.confirm(
      "¿Deseas borrar todas las ventas del día?"
    );
    if (confirmacion) {
      setVentas([]);
    }
  };

  const exportarAExcel = () => {
    const hoja = XLSX.utils.json_to_sheet(ventas);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "VentasDelDia");
    const buffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    const data = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(data, "Ventas_Del_Dia.xlsx");
  };

  const ventasFiltradas = ventas.filter((venta) => {
    const coincideTexto =
      venta.usuario.toLowerCase().includes(filtro.toLowerCase()) ||
      venta.producto.toLowerCase().includes(filtro.toLowerCase());

    const fechaVenta = new Date(venta.fechaHora);
    const inicio = fechaInicio ? new Date(fechaInicio) : null;
    const fin = fechaFin ? new Date(fechaFin + "T23:59:59") : null;

    const enRango =
      (!inicio || fechaVenta >= inicio) && (!fin || fechaVenta <= fin);

    return coincideTexto && enRango;
  });

  const totalDia = ventasFiltradas.reduce((acc, venta) => acc + venta.total, 0);

  return (
    <Container sx={{ py: 4 }}>
      <Menu />
      <Typography variant="h4" gutterBottom>
        Ventas del Día
      </Typography>

      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <TextField
          label="Usuario"
          name="usuario"
          value={formulario.usuario}
          onChange={manejarCambio}
        />
        <TextField
          label="Producto"
          name="producto"
          value={formulario.producto}
          onChange={manejarCambio}
        />
        <TextField
          label="Cantidad"
          name="cantidad"
          type="number"
          value={formulario.cantidad}
          onChange={manejarCambio}
        />
        <TextField
          label="Total ($)"
          name="total"
          type="number"
          value={formulario.total}
          onChange={manejarCambio}
        />
        <Button variant="contained" color="primary" onClick={agregarVenta}>
          Agregar
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <TextField
          label="Buscar por producto o usuario"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <TextField
          label="Desde"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <TextField
          label="Hasta"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
        <Button variant="outlined" color="success" onClick={exportarAExcel}>
          Exportar Excel
        </Button>
        <Button variant="outlined" color="error" onClick={limpiarVentas}>
          Limpiar Ventas del Día
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Total del día: ${totalDia.toFixed(2)}
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Total ($)</TableCell>
              <TableCell>Fecha y Hora</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ventasFiltradas.map((venta) => (
              <TableRow key={venta.id}>
                <TableCell>{venta.id}</TableCell>
                <TableCell>{venta.usuario}</TableCell>
                <TableCell>{venta.producto}</TableCell>
                <TableCell>{venta.cantidad}</TableCell>
                <TableCell>${venta.total.toFixed(2)}</TableCell>
                <TableCell>{venta.fechaHora}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => eliminarVenta(venta.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Ventas;
