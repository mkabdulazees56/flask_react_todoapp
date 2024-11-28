// import { TextField, Button, Container, Grid, Typography } from '@mui/material';
// import { useState, useRef } from "react";
// import DOMPurify from "dompurify";
// import { Link, useNavigate } from "react-router-dom";
// import { signup } from "../../services/AuthService";
// import { toast } from "react-toastify";

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

//     const email = emailRef.current.value;
//     const username = usernameRef.current.value;
//     const password = passwordRef.current.value;

//     let errors = {};

//     if (!email || email.length > 30 || email.trim() == "") {
//       errors.email = "Please enter a valid email";
//     }

//     if (!username || username.trim() === "" || username.length < 3 || username.length > 20) {
//       errors.username = "Please enter a valid username";
//     }

//     if (!password || password.length < 6 || password.trim() === "" || password.length > 20) {
//       errors.password =
//         "Please enter a strong password. Password should be at least 6 characters long";
//     }

//     if (Object.keys(errors).length > 0) {
//       setError(errors);
//       return;
//     }

//     const sanitizedUsername = DOMPurify.sanitize(username);
//     const sanitizedPassword = DOMPurify.sanitize(password);

//     const data = {
//       email,
//       username: sanitizedUsername,
//       password: sanitizedPassword,
//     };
//     handleSignUp(data);
//   };

//   const handleSignUp = async (data) => {
//     try {
//       const response = await signup(data.email, data.username, data.password);
//       if (response == "201") {
//         navigate("/login", { replace: true });
//       } else {
//         toast.error(response);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <Grid container spacing={2} justifyContent="center" sx={{ background: 'white', padding: 4, borderRadius: 2, boxShadow: 3 }}>
//         <Grid item xs={12}>
//           <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
//             Create an Account
//           </Typography>
//         </Grid>

//         <Grid item xs={12}>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               type="email"
//               inputRef={emailRef}
//               error={!!error.email}
//               helperText={error.email}
//               sx={{ marginBottom: 2 }}
//             />

//             <TextField
//               fullWidth
//               label="Username"
//               variant="outlined"
//               type="text"
//               inputRef={usernameRef}
//               error={!!error.username}
//               helperText={error.username}
//               sx={{ marginBottom: 2 }}
//             />

//             <TextField
//               fullWidth
//               label="Password"
//               variant="outlined"
//               type="password"
//               inputRef={passwordRef}
//               error={!!error.password}
//               helperText={error.password}
//               sx={{ marginBottom: 4 }}
//             />

//             <Button
//               fullWidth
//               variant="contained"
//               color="success" // Using Material-UI's 'success' color for green
//               type="submit"
//               sx={{
//                 marginBottom: 2,
//                 textTransform: 'none',
//                 padding: 1.5,
//                 fontWeight: 'bold',
//                 backgroundColor: '#4CAF50', // Custom green color
//                 '&:hover': {
//                   backgroundColor: '#45a049', // Darker shade for hover
//                 },
//               }}
//             >
//               Sign Up
//             </Button>

//             <Grid container spacing={2} justifyContent="center">
//               <Grid item xs={12} sm="auto">
//                 <Typography variant="body2" color="textSecondary">
//                   Already have an account?{' '}
//                   <Link to="/login" style={{ color: '#4CAF50', fontWeight: 'bold' }}>
//                     Log in
//                   </Link>
//                 </Typography>
//               </Grid>
//             </Grid>
//           </form>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

import { TextField, Button, Container, Grid, Typography, InputAdornment } from '@mui/material';
import { useState, useRef } from "react";
import DOMPurify from "dompurify";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/AuthService";
import { toast } from "react-toastify";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

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

    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    let errors = {};

    if (!email || email.length > 30 || email.trim() == "") {
      errors.email = "Please enter a valid email";
    }

    if (!username || username.trim() === "" || username.length < 3 || username.length > 20) {
      errors.username = "Please enter a valid username";
    }

    if (!password || password.length < 6 || password.trim() === "" || password.length > 20) {
      errors.password =
        "Please enter a strong password. Password should be at least 6 characters long";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPassword = DOMPurify.sanitize(password);

    const data = {
      email,
      username: sanitizedUsername,
      password: sanitizedPassword,
    };
    handleSignUp(data);
  };

  const handleSignUp = async (data) => {
    try {
      const response = await signup(data.email, data.username, data.password);
      if (response == "201") {
        navigate("/login", { replace: true });
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={2} justifyContent="center" sx={{ background: 'white', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
            Create an Account
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              inputRef={emailRef}
              error={!!error.email}
              helperText={error.email}
              sx={{ marginBottom: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              type="text"
              inputRef={usernameRef}
              error={!!error.username}
              helperText={error.username}
              sx={{ marginBottom: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              inputRef={passwordRef}
              error={!!error.password}
              helperText={error.password}
              sx={{ marginBottom: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
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
              Sign Up
            </Button>

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm="auto">
                <Typography variant="body2" color="textSecondary">
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                    Log in
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
