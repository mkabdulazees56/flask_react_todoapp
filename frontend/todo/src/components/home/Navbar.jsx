import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { logout } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Navbar({ theme }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: theme === true ? "success.main" : "success.dark" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo or App Name */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Ninja Todo
        </Typography>

        {/* Desktop View - Log out Button */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "#388e3c", // Green color for the logout button
              "&:hover": {
                backgroundColor: "#1b5e20", // Darker shade of green on hover
              },
            }}
          >
            Log out
          </Button>
        </Box>

        {/* Mobile View - Menu Icon */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            color="inherit"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="open sidebar"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
