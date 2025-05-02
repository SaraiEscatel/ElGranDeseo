import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Button, Link } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const images = ["img/3image.jpg", "img/2image.jpg"];

const ManualCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "60vw",
        maxWidth: "650px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {/* Imagen del carrusel */}
      <Box
        component="img"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        sx={{
          width: "99.6vw",
          maxHeight: "900px",
          objectFit: "cover",
          borderRadius: 2,
          position: "relative",
          right: "650px",
          top: -20,
          opacity: 0.9,
          transition: "opacity 0.5s ease-in-out",
        }}
      />

      {/* Texto centrado en el carrusel */}

      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: { xs: "50px", md: "100px" },
          fontFamily: "ITC Benguiat",
          color: "#ffff",
          fontWeight: "bold",

          padding: "10px",
          borderRadius: "10px",
          whiteSpace: "nowrap",
          width: "auto",
        }}
      >
        JOYERÍA EL GRAN DESEO
      </Typography>
      <Typography
        sx={{
          fontSize: 30,
          fontFamily: "Alice",
          fontWeight: 190,
          position: "relative",
          top: "-450px",
          right: "20px",
          textAlign: "center",
          color: "#ffff",
          fontWeight: "bold",
        }}
      >
        Regálate a ti mismo lo que realmente quieres.
      </Typography>
    </Box>
  );
};

export default ManualCarousel;
