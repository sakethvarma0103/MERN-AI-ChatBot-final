import { TypeAnimation } from "react-type-animation";
import { useMediaQuery, useTheme } from "@mui/material";

const TypingAnim = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TypeAnimation
      sequence={[
        "Stack It, Store It, Read It.",
        1000,
        "All Your Books. One Space.",
        2000,
      ]}
      speed={50}
      style={{
        fontSize: isSmallScreen ? "30px" : "60px", // Adjust font size
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
        textAlign: "center",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
