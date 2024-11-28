import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';

export default function NotfoundPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e8f5e9', // Light green background
      }}
    >
      {/* Title Section */}
      <Box mb={3}>
        <Typography variant="h1" color={green[500]} fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Oops! The page you're looking for doesn't exist.
        </Typography>
      </Box>

      {/* Redirect Button */}
      <Button
        variant="contained"
        color="success"
        size="large"
        component={Link}
        to="/" // Redirecting to home page
        sx={{
          fontWeight: 'bold',
          backgroundColor: green[500],
          "&:hover": {
            backgroundColor: green[700], // Darker green on hover
          },
        }}
      >
        Go to Home
      </Button>
    </Container>
  );
}
