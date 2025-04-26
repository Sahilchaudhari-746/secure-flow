import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Container,
  Card,
  Stack,
  LinearProgress,
  Divider,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LockIcon from '@mui/icons-material/Lock';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import Navbar from './Navbar';

function Encryption() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({});
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const selected = e.dataTransfer.files[0];
    setFile(selected);
    setFileName(selected ? selected.name : '');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setFileName(selected ? selected.name : '');
  };

  const handleEncrypt = async () => {
    if (!file) {
      toast.error('Please drop a file or click to browse.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/encrypt', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        //const blob = await response.blob();
        //const url = URL.createObjectURL(blob);
        //const a = document.createElement('a');
        //a.href = url;
        // a.download = fileName.replace(/\.[^/.]+$/, '') + '_encrypted.png';
        // a.click();
        //URL.revokeObjectURL(url);

        const metricsResponse = await fetch('http://localhost:5000/performance-metrics');
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          setInfo({
            totalTime: metricsData.totalTime,
            memoryUsage: metricsData.memoryUsage,
          });
          setTimeout(() => setInfo({}), 30000);
        } else {
          toast.error('Error fetching performance metrics.');
        }

        toast.success('File encrypted successfully!');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Encryption failed.');
      }
    } catch (error) {
      toast.error('Error encrypting file.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <Box sx={{ background: '#fff', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="lg">
          <Card elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: '#fff', color: '#000' }}>
            <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: '#333' }}>
              🔐 Encrypt Your File
            </Typography>
            <Typography variant="subtitle1" textAlign="center" color="text.secondary">
              Secure your data in just a few clicks.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack direction="row" spacing={3} justifyContent="space-between">
              {/* Left side (File selection 70%) */}
              <Box sx={{ flex: 7 }}>
                <Stack spacing={3} alignItems="center">
                  <Box
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current.click()}
                    sx={{
                      border: '2px dashed #00bcd4',
                      borderRadius: 4,
                      width: '100%',
                      height: 180,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      bgcolor: '#f9f9f9',
                      cursor: 'pointer',
                      transition: '0.3s',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 40, color: '#00bcd4' }} />
                    <Typography variant="body1" color="text.secondary" align="center">
                      Drag and drop your file here
                      <br />
                      or <strong style={{ color: '#00bcd4' }}>click to browse</strong>
                    </Typography>
                    <input
                      type="file"
                      hidden
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".txt,.pdf,.doc,.docx"
                    />
                  </Box>

                  {file && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        bgcolor: '#f1f1f1',
                        px: 3,
                        py: 2,
                        borderRadius: 2,
                        border: '1px solid #ccc',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <InsertDriveFileIcon sx={{ color: '#00bcd4' }} />
                        <Typography>{fileName}</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {(file.size / 1024).toFixed(2)} KB
                      </Typography>
                    </Box>
                  )}

                  <Button
                    variant="contained"
                    startIcon={<LockIcon />}
                    onClick={handleEncrypt}
                    disabled={isLoading}
                    size="large"
                    sx={{
                      bgcolor: '#00bcd4',
                      color: '#fff',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: '#0097a7',
                      },
                    }}
                  >
                    Encrypt Now
                  </Button>

                  {isLoading && (
                    <Box textAlign="center" mt={2}>
                      <CircularProgress sx={{ color: '#00bcd4' }} />
                      <Typography variant="body2" mt={1} color="text.secondary">
                        Encrypting your file, please wait...
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>

              {/* Right side (How it Works 30%) */}
              <Box sx={{ flex: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#00bcd4', fontWeight: 'bold' }}>
                  🚀 How It Works
                </Typography>
                <Stack spacing={2}>
                  {[
                    {
                      step: 'Drag and drop a file (text, PDF, etc.)',
                      icon: <CloudUploadIcon sx={{ color: '#00bcd4' }} />,
                    },
                    {
                      step: 'Click Encrypt and let the magic happen.',
                      icon: <LockIcon sx={{ color: '#00bcd4' }} />,
                    },
                    {
                      step: 'Download the encrypted image.',
                      icon: <InsertDriveFileIcon sx={{ color: '#00bcd4' }} />,
                    },
                    {
                      step: 'Use this image later to decrypt your file.',
                      icon: <LockIcon sx={{ color: '#00bcd4' }} />,
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -50 }}  // Initial position (off-screen)
                      animate={{ opacity: 1, x: 0 }}    // Animate to full visibility
                      transition={{ delay: idx * 0.2, type: 'spring', stiffness: 100 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          borderRadius: 3,
                          bgcolor: '#f9f9f9',
                          boxShadow: '0px 2px 10px rgba(0, 188, 212, 0.1)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            bgcolor: '#e0f7fa',
                            transform: 'scale(1.05)', // Slightly scale up
                            cursor: 'pointer', // Change cursor on hover
                          },
                        }}
                      >
                        {item.icon}
                        <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                          {item.step}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            </Stack>

            {info.totalTime && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ color: '#00bcd4' }}>
                  📊 Encryption Stats
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⏱ Total Time: {info.totalTime.toFixed(2)} seconds
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🧠 Memory Usage: {(info.memoryUsage[1] / 1024).toFixed(2)} KB
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(info.totalTime * 10, 100)}
                  sx={{
                    mt: 2,
                    height: 8,
                    borderRadius: 5,
                    '& .MuiLinearProgress-bar': { bgcolor: '#00bcd4' },
                  }}
                />
              </Box>
            )}
          </Card>
        </Container>
        <ToastContainer />
      </Box>

    </>
  );
}

export default Encryption;
