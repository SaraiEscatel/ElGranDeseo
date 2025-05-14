import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useCart } from "./cartContext";

const ProductoCard = ({ producto }) => {
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 300, m: 2, bgcolor: "background.paper" }}>
      <CardMedia
        component="img"
        height="160"
        image={producto.imagen}
        alt={producto.nombre}
      />
      <CardContent>
        <Typography variant="h6">{producto.nombre}</Typography>
        <Typography variant="body2" color="text.secondary">
          {producto.descripcion}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Precio: ${producto.precio}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToCart(producto)}
          sx={{ mt: 2 }}
        >
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductoCard;
