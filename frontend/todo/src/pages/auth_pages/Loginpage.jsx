import { useState, useRef } from "react";
import { TextField, Button, Box, Typography, Container, Card, Grid } from "@mui/material";
import { Lock, Email } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import { login } from "../../services/AuthService";

export default function LoginPage() {
  const navigate = useNavigate();
  const useremailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = useremailRef.current.value.replace(/\s/g, "");
    const password = passwordRef.current.value.replace(/\s/g, "");

    let errors = {};

    if (!email || email.length < 5 || email === "") {
      errors.email = "Please enter a valid email";
    }

    if (!password || password.length < 6 || password.trim() === "" || password.length > 20) {
      errors.password = "Please enter a valid password";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    const data = { email: sanitizedEmail, password: sanitizedPassword };
    handleLogin(data);
  };

  const handleLogin = async (data) => {
    try {
      const response = await login(data.email, data.password);

      if (response === "200") {
        navigate("/", { replace: true });
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container
      maxWidth={false} // Full width container
      disableGutters // Remove padding
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #4caf50, #8bc34a)",
        padding: 0, // Ensure no padding
        margin: 0, // No margin to prevent white space
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 4,
          boxShadow: 3,
          overflow: "hidden",
          padding: { xs: 2, md: 4 },
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Left Side: Icon */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e8f5e9",
              padding: 4,
            }}
          >
            <LoginIcon sx={{ fontSize: { xs: 100, md: 150 }, color: "#4caf50" }} />
            <Typography
              variant="h4"
              sx={{
                mt: 2,
                textAlign: "center",
                color: "#4caf50",
                fontWeight: "bold",
              }}
            >
              Login to Your Account
            </Typography>
          </Grid>

          {/* Right Side: Login Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
              Welcome to Ninja Todo
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              {/* Email Input */}
              <Box display="flex" alignItems="center" mb={2}>
                <Email sx={{ mr: 1, color: "#4caf50" }} />
                <TextField
                  inputRef={useremailRef}
                  error={!!error.email}
                  helperText={error.email}
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
              </Box>

              {/* Password Input */}
              <Box display="flex" alignItems="center" mb={2}>
                <Lock sx={{ mr: 1, color: "#4caf50" }} />
                <TextField
                  inputRef={passwordRef}
                  error={!!error.password}
                  helperText={error.password}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
              </Box>

              {/* Login Button */}
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{
                  py: 1.5,
                  mt: 2,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  boxShadow: 3,
                }}
              >
                Login
              </Button>

              {/* Sign Up Link */}
              <Typography textAlign="center" mt={3}>
                New here?{" "}
                <Link to="/signup" style={{ color: "#4caf50", fontWeight: "bold" }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
