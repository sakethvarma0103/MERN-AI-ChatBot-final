import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="robot.png"
            alt="robot"
            style={{ width: "200px", margin: "auto" }}
          />
          <img
            src="logo.png"
            alt="openai"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", mx: "auto" }}>
        <h4
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "2rem auto",
    width: isBelowMd ? "90%" : "60%",
    padding: "2rem",
    borderRadius: "1.5rem",
    background: "rgba(0, 255, 204, 0.05)",
    backdropFilter: "blur(4px)",
    boxShadow: "0 10px 40px rgba(100, 243, 213, 0.4)",
    color: "white",
    fontSize: isBelowMd ? "1rem" : "1.15rem",
    lineHeight: 1.7,
    fontWeight: 500,
    textAlign: "center",
    letterSpacing: "0.02rem",
  }}
>
  Welcome to Readify, your personal digital library built to simplify how you manage and enjoy your books. With Readify, you can upload PDFs, add custom posters, and track your reading progress all in one place.
  <br /><br />
  Whether you're a casual reader or a book lover, our platform is designed to keep your collection organized, accessible, and always with you.
  <br /><br />
  Built on the modern MERN stack (MongoDB, Express, React, and Node.js), Readify ensures a smooth, secure, and responsive experience. From user authentication to profile customization, everything is crafted to put you in control of your reading journey — anytime, anywhere.
</h4>

        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
