import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#C7B9FF",
        color: "#000",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      {/* Sección principal: 3 columnas */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1200px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Columna izquierda - Redes sociales */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography fontSize={20} mr={4} fontFamily="Alice">
              +52 33-16-72-87-06
            </Typography>
            <WhatsAppIcon sx={{ fontSize: 35 }} />
          </Box>

          <IconButton sx={{ color: "#000" }}>
            <InstagramIcon sx={{ fontSize: 35 }} />
          </IconButton>
          <IconButton sx={{ color: "#000" }}>
            <FacebookIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontSize: 18,
            fontFamily: "Alice",
            fontWeight: 150,
          }}
        >
          &copy; {new Date().getFullYear()} El Gran Deseo. Todos los derechos
          reservados.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CreditScoreIcon sx={{ fontSize: 40 }} />
            <Typography fontSize={14} fontFamily="Alice">
              Meses sin intereses
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <FmdGoodIcon sx={{ fontSize: 40 }} />
            <Typography fontSize={14} fontFamily="Alice">
              Entregas gratis
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <AutorenewIcon sx={{ fontSize: 40 }} />
            <Typography fontSize={14} fontFamily="Alice">
              Devoluciones
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
