import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {auth?.isLoggedIn && <Sidebar />}
      <AppBar
        sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Logo />
          {auth?.isLoggedIn ? (
            <Box display="flex" alignItems="center" gap={2}>
              <NavigationLink
                bg="#00fffc"
                to="/my-books"
                text="Go To My Books"
                textColor="black"
              />
              <Avatar
                alt={auth.user?.name}
                src={""}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#00fffc",
                  color: "#000",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: "#1e1e2f",
                    color: "#f1f1f1",
                    borderRadius: 2,
                    mt: 1,
                    px: 1,
                  },
                }}
              >
                <MenuItem disabled sx={{ opacity: 0.7 }}>
                  {auth.user?.email}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/profile");
                  }}
                  sx={{
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#00fffc",
                      color: "#000",
                    },
                  }}
                >
                  View Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    auth.logout();
                    navigate("/");
                  }}
                  sx={{
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#00fffc",
                      color: "#000",
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box display="flex" gap={2}>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
