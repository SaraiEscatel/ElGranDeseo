import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  TextField,
} from "@mui/material";
import ProductoForm from "../inventario/productosFrom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Menu from "../inventario/menu";

const Admin = () => {
  const [busqueda, setBusqueda] = useState("");

  const [productos, setProductos] = useState(() => {
    const productosGuardados = localStorage.getItem("inventario");
    return productosGuardados ? JSON.parse(productosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("inventario", JSON.stringify(productos));
  }, [productos]);

  const [editando, setEditando] = useState(false);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);

  const productosFiltrados = productos.filter((producto) =>
    Object.values(producto)
      .join(" ")
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const agregarProducto = (nuevoProducto) => {
    const id = Date.now();
    setProductos([...productos, { id, ...nuevoProducto }]);
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const exportarAExcel = () => {
    const datos = productos.map(
      ({ nombre, tipo, descripcion, precio, stock }) => ({
        nombre,

        tipo,
        descripcion,
        precio,
        stock,
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Inventario_Joyeria.xlsx");
  };

  const exportarAPDF = () => {
    const doc = new jsPDF();
    doc.text("Inventario Joyería de Plata", 14, 10);
    const columnas = ["Nombre", "Tipo", "Descripción", "Precio", "Stock"];
    const filas = productos.map((p) => [
      p.nombre,
      p.tipo,
      p.descripcion,
      p.costo,
      p.precio,
      p.cantidad,
    ]);
    doc.autoTable({
      head: [columnas],
      body: filas,
      startY: 20,
    });
    doc.save("Inventario_Joyeria.pdf");
  };

  return (
    <Container sx={{ py: 4 }}>
      <Menu />
      <Typography variant="h4" gutterBottom>
        Inventario de Productos
      </Typography>
      <ProductoForm
        onAdd={agregarProducto}
        editando={editando}
        producto={productoEnEdicion}
        onUpdate={(productoActualizado) => {
          setProductos(
            productos.map((p) =>
              p.id === productoActualizado.id ? productoActualizado : p
            )
          );
          setEditando(false);
          setProductoEnEdicion(null);
        }}
      />
      <TextField
        label="Buscar producto"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <Box display="flex" gap={2} mb={2}>
        <Button variant="outlined" color="success" onClick={exportarAExcel}>
          Exportar a Excel
        </Button>
        <Button variant="outlined" color="error" onClick={exportarAPDF}>
          Exportar a PDF
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>

              <TableCell>Tipo</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Costo ($)</TableCell>
              <TableCell>Precio ($)</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productosFiltrados.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.nombre}</TableCell>

                <TableCell>{producto.tipo}</TableCell>
                <TableCell>{producto.descripcion}</TableCell>
                <TableCell>{producto.costo}</TableCell>
                <TableCell>{producto.precio}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="info"
                    onClick={() => {
                      setEditando(true);
                      setProductoEnEdicion(producto);
                    }}
                  >
                    Editar
                  </Button>

                  <Button size="small" color="error">
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

export default Admin;
