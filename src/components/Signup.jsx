import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Card, CardContent, Link, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate('/login');
      } else {
        alert(result.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://wallpapercave.com/wp/wp4923981.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            elevation={10}
            sx={{
              borderRadius: 4,
              backdropFilter: 'blur(12px)',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(25,25,25,0.6))',
              color: '#fff',
              boxShadow: '0 0 20px rgba(0,255,255,0.3), 0 0 40px rgba(0,255,255,0.2)',
              border: '1px solid rgba(0,255,255,0.4)',
            }}
          >

            <CardContent sx={{ p: 5 }}>
              <Typography variant="h4" textAlign="center" gutterBottom color="primary">
                Create Account
              </Typography>
              <Typography textAlign="center" mb={3} sx={{ color: '#ccc' }}>
                Join the community. It's fast and easy.
              </Typography>

              <Box component="form" onSubmit={handleSignup}>
                <TextField
                  label="Full Name"
                  variant="filled"
                  fullWidth
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{ style: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' } }}
                />
                <TextField
                  label="Email Address"
                  variant="filled"
                  fullWidth
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{ style: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' } }}
                />
                <TextField
                  label="Phone Number"
                  variant="filled"
                  fullWidth
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{ style: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' } }}
                />
                <TextField
                  label="Password"
                  variant="filled"
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{
                    style: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end" sx={{ color: '#ccc' }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Password"
                  variant="filled"
                  fullWidth
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{
                    style: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end" sx={{ color: '#ccc' }}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
                >
                  Sign Up
                </Button>
              </Box>

              <Typography mt={2} textAlign="center" sx={{ color: '#ccc' }}>
                Already have an account?{' '}
                <Link href="/" underline="hover" sx={{ color: '#90caf9' }}>
                  Login
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Signup;
