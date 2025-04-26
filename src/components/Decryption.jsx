import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Container,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
// import Navbar from './Navbar';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function Decryption() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleDecrypt = async () => {
    if (!file) {
      toast.error('Please select a file.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/decrypt', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const contentDisposition = response.headers.get('Content-Disposition');
        const contentType = response.headers.get('Content-Type');

        let downloadFileName = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : 'decrypted_file';

        if (contentType === 'application/json') {
          const data = await response.json();
          const blobType = data.file_type === 'txt' ? 'text/plain' : 'application/octet-stream';
          const textBlob = new Blob([data.plaintext], { type: blobType });

          const url = URL.createObjectURL(textBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = data.output_file;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else {
          if (contentType.includes('application/pdf')) {
            downloadFileName += '.pdf';
          } else if (contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            downloadFileName += '.xlsx';
          }

          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = downloadFileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }

        toast.success('File decrypted successfully!');
        setFile(null);
      } else {
        toast.error('Error decrypting file.');
      }
    } catch (error) {
      toast.error('Error decrypting file.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <Box sx={{ background: '#f5f5f5', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card elevation={6} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h4" textAlign="center" gutterBottom color="primary">
                SecureFlow Decryption
              </Typography>
              <Typography variant="subtitle1" textAlign="center" gutterBottom>
                Retrieve your original data securely
              </Typography>
              <Divider sx={{ my: 3 }} />
              {/* Row layout with flex */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                {/* Left part: File selection and Decrypt button */}
                <Box sx={{ flex: 7, textAlign: 'center' }}>
                  <Box {...getRootProps()} sx={{
                    border: '2px dashed #00bcd4',
                    borderRadius: 4,
                    width: '100%',
                    height: 180,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    bgcolor: '#f9f9f9',

                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    }, cursor: 'pointer', background: isDragActive ? '#e3f2fd' : '#fafafa'
                  }}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Typography variant="body1" color="primary">Drop the file here...</Typography>
                    ) : (
                      <>
                        <CloudUploadIcon sx={{ fontSize: 48, color: '#00bcd4', mb: 1 }} />
                        <Typography variant="body1" color="text.secondary" align="center">
                          Drag and drop your file here
                          <br />
                          or <strong style={{ color: '#00bcd4' }}>click to browse</strong>
                        </Typography>
                      </>
                    )}
                  </Box>
                  {file && (
                    <CardContent sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" color="text.primary">File Selected:</Typography>
                      <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                        <Chip label={file.name} color="primary" />
                        <Chip label={`${(file.size / 1024).toFixed(2)} KB`} color="secondary" />
                      </Stack>
                    </CardContent>
                  )}
                  {/* Decrypt button inside the left section */}
                  <Stack spacing={3} alignItems="center" mt={4}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<LockOpenIcon />}
                        onClick={handleDecrypt}
                        disabled={isLoading}
                        sx={{ textTransform: 'none', borderRadius: 2, px: 4 }}
                      >
                        {isLoading ? 'Decrypting...' : 'Decrypt'}
                      </Button>
                    </motion.div>
                    {isLoading && <CircularProgress />}
                  </Stack>
                </Box>

                {/* Right part: Instructions */}
                <Box
                  sx={{
                    flex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3, // Add padding for some spacing
                  }}
                >
                  <Typography variant="h5" gutterBottom sx={{ color: '#00bcd4', fontWeight: 'bold' }}>
                    🚀 How It Works
                  </Typography>
                  <Stack spacing={2}>
                    {[
                      {
                        step: 'Upload your encrypted image file (.png).',
                        icon: <CloudUploadIcon sx={{ color: '#00bcd4' }} />,
                      },
                      {
                        step: 'Click the “Decrypt” button.',
                        icon: <LockOpenIcon sx={{ color: '#00bcd4' }} />,
                      },
                      {
                        step: 'The decrypted file will download automatically.',
                        icon: <InsertDriveFileIcon sx={{ color: '#00bcd4' }} />,
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

              </Box>
            </Card>
          </motion.div>
        </Container>
        <ToastContainer />
      </Box>


    </>
  );
}

export default Decryption;
