// import InputFeild from "../../components/authcomponents/InputFeild";
// import AuthButton from "../../components/authcomponents/AuthButton";
// import { useState, useRef } from "react";
// import DOMPurify from "dompurify";
// import { Link } from "react-router-dom";
// import { login } from "../../services/AuthService";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const useremailRef = useRef();
//   const passwordRef = useRef();
//   const [error, setError] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const email = useremailRef.current.value.replace(/\s/g, "");
//     const password = passwordRef.current.value.replace(/\s/g, "");
    
//     let errors = {};
    
//     if (!email || email.length < 5 || email == "") {
//       errors.email = "Please enter a valid email";
//     }
    
//     if (!password || password.length < 6 || password.trim() === "" || password.length > 20) {
//       errors.password = "Please enter a valid password";
//     }
    
//     if (Object.keys(errors).length > 0) {
//       setError(errors);
//       return;
//     }
    
//     const sanitizedUsername = DOMPurify.sanitize(email);
//     const sanitizedPassword = DOMPurify.sanitize(password);
    
//     const data = { email: sanitizedUsername, password: sanitizedPassword };
//     handleLogin(data);
//   };

//   const handleLogin = async (data) => {
//     try {
//       const response = await login(data.email, data.password);
      
//       if (response == "200") {
//         navigate("/", { replace: true });
      
//       } else{
//         toast.error(response);
//       }
      
     
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//           <div className="p-8">
//             <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//               Welcome Back
//             </h1>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <InputFeild
//                 name="email"
//                 type="email"
//                 htmlFor="email"
//                 id="email"
//                 label="Email"
//                 refer={useremailRef}
//                 error={error.email ? error.email : ""}
//                 className="
//                   w-full 
//                   p-3 
//                   border-2 
//                   border-gray-300 
//                   rounded-lg 
//                   focus:outline-none 
//                   focus:ring-2 
//                   focus:ring-pink-500 
//                   focus:border-transparent 
//                   transition-all 
//                   duration-300
//                 "
//               />

//               <InputFeild
//                 name="password"
//                 type="password"
//                 htmlFor="password"
//                 id="password"
//                 label="Password"
//                 refer={passwordRef}
//                 error={error.password ? error.password : ""}
//                 className="
//                   w-full 
//                   p-3 
//                   border-2 
//                   border-gray-300 
//                   rounded-lg 
//                   focus:outline-none 
//                   focus:ring-2 
//                   focus:ring-pink-500 
//                   focus:border-transparent 
//                   transition-all 
//                   duration-300
//                 "
//               />

//               <AuthButton 
//                 buttonName="Login"
//                 className="
//                   w-full 
//                   py-3 
//                   bg-gradient-to-r 
//                   from-pink-500 
//                   to-orange-400 
//                   text-white 
//                   rounded-lg 
//                   hover:opacity-90 
//                   transition-opacity 
//                   duration-300 
//                   font-semibold 
//                   uppercase 
//                   tracking-wider
//                 "
//               />

//               <div className="text-center space-y-4">
//                 <p className="text-gray-600">
//                   New here?{" "}
//                   <Link 
//                     to="/signup" 
//                     className="
//                       text-pink-500 
//                       hover:text-orange-400 
//                       font-semibold 
//                       transition-colors 
//                       duration-300
//                     "
//                   >
//                     Sign up
//                   </Link>
//                 </p>

//                 <p className="text-gray-600">
//                   Forgot password?{" "}
//                   <Link
//                     to="/resetpassword"
//                     className="
//                       text-pink-500 
//                       hover:text-orange-400 
//                       font-semibold 
//                       transition-colors 
//                       duration-300
//                     "
//                   >
//                     Reset
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
              Welcome Back
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
