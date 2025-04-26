import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Paper, Container, Stack } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Navbar from './Navbar';
function Home() {
    return (
        <>
        <Navbar />
        <Box
            sx={{
                background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
                minHeight: '100vh',
                py: 8,
                px: 2,
            }}
        >
            <Container maxWidth="md">
                <Paper elevation={6} sx={{ p: 5, textAlign: 'center', borderRadius: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom color="primary">
                        SecureFlow
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                        Your data, encrypted and secure.
                    </Typography>

                    <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 4 }}>
                        <Link to="/encryption" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                startIcon={<LockIcon />}
                                size="large"
                                sx={{ px: 4, py: 1.5 }}
                            >
                                Encryption
                            </Button>
                        </Link>

                        <Link to="/decryption" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="outlined"
                                startIcon={<LockOpenIcon />}
                                size="large"
                                sx={{ px: 4, py: 1.5 }}
                            >
                                Decryption
                            </Button>
                        </Link>
                    </Stack>

                    <Typography variant="h5" sx={{ mt: 5 }}>
                        Welcome to SecureFlow
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                        SecureFlow is your go-to solution for data encryption and decryption.
                        Choose an option to either encrypt your sensitive data or decrypt previously
                        encrypted files.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Ensure to upload files in the correct format for smooth processing.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        For more details, visit our <a href="#" style={{ color: '#1976d2' }}>documentation</a> or contact support.
                    </Typography>
                </Paper>
            </Container>
        </Box>
        </>
    );
}

export default Home;
