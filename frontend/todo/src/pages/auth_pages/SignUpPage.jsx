// import React, { useState, useRef } from "react";
// import { TextField, Button, Box, Typography, Container, Card, Grid } from "@mui/material";
// import { Email, Person, Lock } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import DOMPurify from "dompurify";
// import { signup } from "../../services/AuthService";

// export default function SignUpPage() {
//   const navigate = useNavigate();
//   const emailRef = useRef();
//   const usernameRef = useRef();
//   const passwordRef = useRef();

//   const [error, setError] = useState({
//     email: "",
//     username: "",
//     password: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const email = emailRef.current.value.trim();
//     const username = usernameRef.current.value.trim();
//     const password = passwordRef.current.value.trim();

//     let errors = {};

//     if (!email || email.length > 30) {
//       errors.email = "Please enter a valid email";
//     }

//     if (!username || username.length < 3 || username.length > 20) {
//       errors.username = "Please enter a valid username";
//     }

//     if (!password || password.length < 6 || password.length > 20) {
//       errors.password = "Password must be between 6 and 20 characters";
//     }

//     if (Object.keys(errors).length > 0) {
//       setError(errors);
//       return;
//     }

//     const sanitizedData = {
//       email: DOMPurify.sanitize(email),
//       username: DOMPurify.sanitize(username),
//       password: DOMPurify.sanitize(password),
//     };

//     handleSignUp(sanitizedData);
//   };


//   const handleSignUp = async (data) => {
//     try {
//       const response = await signup(data.email, data.username, data.password);
//       if (response === "201") {
//         toast.success("Account created successfully!", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//         navigate("/login", { replace: true });
//       } else {
//         toast.error(response);
//       }
//     } catch (error) {
//       console.error(error.message);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(to bottom right, #4caf50, #8bc34a)",
//         padding: 4,
//       }}
//     >
//       <Card
//         sx={{
//           width: "100%",
//           maxWidth: 600,
//           borderRadius: 4,
//           boxShadow: 3,
//           overflow: "hidden",
//         }}
//       >
//         <Grid container spacing={2} alignItems="center">
//           {/* Left Side: Icon */}
//           <Grid
//             item
//             xs={12}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "#e8f5e9", // Light green background
//               padding: 4,
//             }}
//           >
//             <Person sx={{ fontSize: { xs: 100, md: 150 }, color: "#4caf50" }} />
//             <Typography
//               variant="h4"
//               sx={{
//                 mt: 2,
//                 textAlign: "center",
//                 color: "#4caf50",
//                 fontWeight: "bold",
//               }}
//             >
//               Create Your Account
//             </Typography>
//           </Grid>

//           {/* Right Side: Signup Form */}
//           <Grid item xs={12}>
//             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, px: 4 }}>
//               {/* Email Input */}
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Email sx={{ mr: 1, color: "#4caf50" }} />
//                 <TextField
//                   inputRef={emailRef}
//                   error={!!error.email}
//                   helperText={error.email}
//                   label="Email"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Box>

//               {/* Username Input */}
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Person sx={{ mr: 1, color: "#4caf50" }} />
//                 <TextField
//                   inputRef={usernameRef}
//                   error={!!error.username}
//                   helperText={error.username}
//                   label="Username"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Box>

//               {/* Password Input */}
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Lock sx={{ mr: 1, color: "#4caf50" }} />
//                 <TextField
//                   inputRef={passwordRef}
//                   error={!!error.password}
//                   helperText={error.password}
//                   label="Password"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Box>

//               {/* Signup Button */}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   py: 1.5,
//                   mt: 2,
//                   background: "linear-gradient(to right, #4caf50, #8bc34a)",
//                   color: "white",
//                   fontWeight: "bold",
//                   textTransform: "uppercase",
//                   boxShadow: 3,
//                   "&:hover": {
//                     opacity: 0.9,
//                   },
//                 }}
//               >
//                 Sign Up
//               </Button>

//               {/* Already have an account link */}
//               <Typography textAlign="center" mt={3}>
//                 Already have an account?{" "}
//                 <Link to="/login" style={{ color: "#4caf50", fontWeight: "bold" }}>
//                   Log in
//                 </Link>
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Card>
//     </Container>
//   );
// }

import React, { useState, useRef } from "react";
import { TextField, Button, Box, Typography, Container, Card, Grid } from "@mui/material";
import { Email, Person, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import { signup } from "../../services/AuthService";

export default function SignUpPage() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const email = emailRef.current.value.trim();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
  
    let errors = {};
  
    // Improved Email Validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }
  
    if (!username || username.length < 3 || username.length > 20) {
      errors.username = "Please enter a valid username";
    }
  
    if (!password || password.length < 6 || password.length > 20) {
      errors.password = "Password must be between 6 and 20 characters";
    }
  
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
  
    const sanitizedData = {
      email: DOMPurify.sanitize(email),
      username: DOMPurify.sanitize(username),
      password: DOMPurify.sanitize(password),
    };
  
    handleSignUp(sanitizedData);
  };

  const handleSignUp = async (data) => {
    try {
      const response = await signup(data.email, data.username, data.password);
      if (response === "201") {
        toast.success("Account created successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/login", { replace: true });
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #4caf50, #8bc34a)",
        padding: 0,
        margin: 0,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 4,
          boxShadow: 3,
          overflow: "hidden",
          marginTop: 5, // Added margin-top to card
          marginBottom: 5, // Added margin-bottom to card
        }}
      >
        <Grid container spacing={0} alignItems="center">
          {/* Left Side: Icon */}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e8f5e9",
              paddingTop: 3, // Reduced top padding
              paddingBottom: 3, // Reduced bottom padding
            }}
          >
            <Person sx={{ fontSize: { xs: 60, md: 100 }, color: "#4caf50" }} />
            <Typography
              variant="h4"
              sx={{
                mt: 1,
                textAlign: "center",
                color: "#4caf50",
                fontWeight: "bold",
              }}
            >
              Create Your Account
            </Typography>
          </Grid>

          {/* Right Side: Signup Form */}
          <Grid item xs={12}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 4, px: 4, py: 3 }} // Added margin-top and padding to the form
            >
              {/* Email Input */}
              <Box display="flex" alignItems="center" mb={1.5}>
                <Email sx={{ mr: 1, color: "#4caf50" }} />
                <TextField
                  inputRef={emailRef}
                  error={!!error.email}
                  helperText={error.email}
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
              </Box>

              {/* Username Input */}
              <Box display="flex" alignItems="center" mb={1.5}>
                <Person sx={{ mr: 1, color: "#4caf50" }} />
                <TextField
                  inputRef={usernameRef}
                  error={!!error.username}
                  helperText={error.username}
                  label="Username"
                  variant="outlined"
                  fullWidth
                />
              </Box>

              {/* Password Input */}
              <Box display="flex" alignItems="center" mb={1.5}>
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

              {/* Signup Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  mt: 2,
                  background: "linear-gradient(to right, #4caf50, #8bc34a)",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  boxShadow: 3,
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
              >
                Sign Up
              </Button>

              {/* Already have an account link */}
              <Typography textAlign="center" mt={2}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#4caf50", fontWeight: "bold" }}>
                  Log in
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
