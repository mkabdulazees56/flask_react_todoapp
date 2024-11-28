import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Corrected to useNavigate in React Router v6

export default function NotfoundPage() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleBackToHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" color="primary" sx={{ fontWeight: 'bold', fontSize: '6rem' }}>
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" sx={{ marginBottom: 3 }}>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleBackToHome}
          sx={{ padding: '10px 30px', fontSize: '1.2rem' }}
        >
          Go Back to Home
        </Button>
      </Box>
    </Container>
  );
}
