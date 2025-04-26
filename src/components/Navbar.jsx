import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: '#0f0f0f',
        boxShadow: '0 4px 12px rgba(0, 255, 255, 0.2)',
        borderBottom: '2px solid #0ff',
        py: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', gap: 4 }}>
        <NavLink to="/my-dashboard">Dashboard</NavLink>
        <NavLink to="/encryption">Encryption</NavLink>
        <NavLink to="/decryption">Decryption</NavLink>
        <NavLink to="/my-doc">My Documents</NavLink>
        <Button
          onClick={handleLogout}
          sx={{
            color: '#f00',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: '20px',
            px: 3,
            py: 1,
            textTransform: 'none',
            border: '2px solid transparent',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              borderColor: '#f00',
              boxShadow: '0 0 10px #f00, 0 0 20px #f00',
              color: '#fff',
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function NavLink({ to, children }) {
  return (
    <Button
      component={RouterLink}
      to={to}
      sx={{
        color: '#0ff',
        fontWeight: 'bold',
        fontSize: '1rem',
        borderRadius: '20px',
        px: 3,
        py: 1,
        textTransform: 'none',
        border: '2px solid transparent',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(0, 255, 255, 0.1)',
          borderColor: '#0ff',
          boxShadow: '0 0 10px #0ff, 0 0 20px #0ff',
          color: '#fff',
        },
      }}
    >
      {children}
    </Button>
  );
}

export default Navbar;
