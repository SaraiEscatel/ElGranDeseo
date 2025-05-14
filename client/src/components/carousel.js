import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";

const carouselItems = [
  { image: "/img/1image.jpg" },
  { image: "/img/imge6.jpg" },
  { image: "/img/imgLogin2.jpg" },
  { image: "/img/imgLogin3.jpg" },
];

const ManualCarousel = () => {
  return (
    <Box sx={{ position: "relative", height: "100vh", width: "100%" }}>
      <Carousel
        autoPlay
        interval={3000}
        animation="fade"
        indicators={false}
        navButtonsAlwaysInvisible
        duration={1000}
        sx={{ height: "100%" }}
      >
        {carouselItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              height: "100vh",
              width: "100%",
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </Carousel>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "#fff",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box>
          <h1
            style={{ fontFamily: "ITC Benguiat", fontSize: "3rem", margin: 0 }}
          >
            JOYERÍA EL GRAN DESEO
          </h1>
          <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
            Porque cada joya cuenta una historia… haz que la tuya brille.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default ManualCarousel;
