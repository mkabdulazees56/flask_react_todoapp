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

import { TextField, Button, InputAdornment, Container, Grid, Typography } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useState, useRef } from "react";
import DOMPurify from "dompurify";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import { toast } from "react-toastify";

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

    if (!email || email.length < 5 || email == "") {
      errors.email = "Please enter a valid email";
    }

    if (!password || password.length < 6 || password.trim() === "" || password.length > 20) {
      errors.password = "Please enter a valid password";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const sanitizedUsername = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    const data = { email: sanitizedUsername, password: sanitizedPassword };
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
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={2} justifyContent="center" sx={{ background: 'white', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
            ToDO Master
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              inputRef={useremailRef}
              error={!!error.email}
              helperText={error.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              inputRef={passwordRef}
              error={!!error.password}
              helperText={error.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 4 }}
            />

            <Button
              fullWidth
              variant="contained"
              color="success" // Using Material-UI's 'success' color for green
              type="submit"
              sx={{
                marginBottom: 2,
                textTransform: 'none',
                padding: 1.5,
                fontWeight: 'bold',
                backgroundColor: '#4CAF50', // Custom green color
                '&:hover': {
                  backgroundColor: '#45a049', // Darker shade for hover
                },
              }}
            >
              Login
            </Button>

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm="auto">
                <Typography variant="body2" color="textSecondary">
                  New here?{' '}
                  <Link to="/signup" style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                    Sign up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
