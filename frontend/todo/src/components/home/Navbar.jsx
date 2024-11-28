import React, { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Typography } from "@mui/material";
import { ExitToApp as LogoutIcon } from "@mui/icons-material";
import { logout } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        {/* Logo/Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ToDo Master
        </Typography>

        {/* Logout Button with Green Theme */}
        <Button
          onClick={handleLogout}
          variant="contained"
          color="success" // Green color
          startIcon={<LogoutIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#388e3c", // Darker green on hover
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
