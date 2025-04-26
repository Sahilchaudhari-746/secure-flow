import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Card, CardContent, Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.name);

        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/my-dashboard');
        }, 2000);
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login Error:', err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {/* Full Page Background */}
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
            <Card elevation={10} sx={{
              borderRadius: 4, backdropFilter: 'blur(10px)', background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(25,25,25,0.6))',
              color: '#fff',
              boxShadow: '0 0 20px rgba(0,255,255,0.3), 0 0 40px rgba(0,255,255,0.2)',
              border: '1px solid rgba(0,255,255,0.4)' }}>
                <CardContent sx={{ p: 5 }}>
                  <Typography variant="h4" textAlign="center" gutterBottom color="primary">
                    Welcome Back
                  </Typography>
                  <Typography textAlign="center" mb={3} color="white">
                    Login to continue
                  </Typography>


                  <Box component="form" onSubmit={handleLogin}>
                    <TextField
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      margin="normal"
                      type="email"
                      InputLabelProps={{ style: { color: '#ccc' } }}
                      InputProps={{
                        style: { color: 'white' },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'white',
                          },
                          '&:hover fieldset': {
                            borderColor: 'white',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'white',
                          },
                        }
                      }}
                    />

                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      margin="normal"
                      InputLabelProps={{ style: { color: '#ccc' } }}
                      InputProps={{
                        style: { color: 'white' },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                              {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'white',
                          },
                          '&:hover fieldset': {
                            borderColor: 'white',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'white',
                          },
                        }
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
                      Login
                    </Button>
                  </Box>

                  <Typography mt={2} textAlign="center" color="white">
                    Don't have an account?{' '}
                    <Link href="/sign-up" underline="hover" color="info.light">
                      Sign Up
                    </Link>
                  </Typography>
                </CardContent>
            </Card>
        </motion.div>
      </Container>
    </Box >

      <ToastContainer />
    </>
  );
};

export default Login;
