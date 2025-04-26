import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Container } from '@mui/material';
// import Navbar from './Navbar';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://localhost:5000/dashboard/stats/${userId}`)
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, [userId]);

  if (!stats) return <div>Loading...</div>;

  const summaryData = [
    {
      label: 'Total Files',
      value: stats.totalFiles,
      icon: '📁',
      gradient: 'linear-gradient(135deg, #2196f3, #21cbf3)',
    },
    {
      label: 'Encrypted Files',
      value: stats.totalEncrypted,
      icon: '🔐',
      gradient: 'linear-gradient(135deg, #9c27b0, #e040fb)',
    },
    {
      label: 'Shared Files',
      value: stats.totalShared,
      icon: '📤',
      gradient: 'linear-gradient(135deg, #ff9800, #ffc107)',
    },
    {
      label: 'Decrypted Files',
      value: stats.totalDecrypted,
      icon: '🔓',
      gradient: 'linear-gradient(135deg, #4caf50, #8bc34a)',
    },
  ];

  return (
    <>
      {/* <Navbar /> */}
      <Container maxWidth="md">
        <Box py={5} textAlign="center">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            📊 Dashboard Overview
          </Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={4}
            mt={4}
          >
            {summaryData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                <Box width="300px" height="180px">
                  <Card
                    sx={{
                      background: item.gradient,
                      color: '#fff',
                      height: '100%',
                      borderRadius: 4,
                      boxShadow: 6,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {item.icon} {item.label}
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        {item.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
