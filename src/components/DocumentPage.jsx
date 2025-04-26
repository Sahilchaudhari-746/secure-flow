import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Modal,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
   MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import Navbar from './Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#222',
  color: '#0ff',
  border: '2px solid #0ff',
  boxShadow: 24,
  p: 4,
  maxWidth: 600,
  width: '90%',
  textAlign: 'center',
  borderRadius: '12px',
};

const DocumentPage = () => {
  const userId = localStorage.getItem('userId');
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedFileType, setSelectedFileType] = useState('');
  

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/documents/${userId}`)
      .then(res => res.json())
      .then(data => {
        setDocuments(data.documents || []);
      })
      .catch(err => console.error('Error fetching documents:', err));
  }, [userId]);

  const handleView = (imageData, fileName) => {
    setSelectedImage(imageData);
    setSelectedFileName(fileName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
    setSelectedFileName('');
  };

  const handleShare = (imageData, fileName) => {
    setSelectedImage(imageData);
    setSelectedFileName(fileName);
    setEmailModalOpen(true);
  };
  const filteredDocuments = documents
    .filter((doc) =>
      doc.input_file.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFileType ? doc.file_type === selectedFileType : true)
    );
    const formatDateTime = (timestamp) => {
      const date = new Date(timestamp); // Keep it as is
    
      const day = date.getUTCDate();
      const daySuffix =
        day % 10 === 1 && day !== 11 ? 'st' :
        day % 10 === 2 && day !== 12 ? 'nd' :
        day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    
      const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }); // Keep in UTC
      const year = date.getUTCFullYear();
    
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHour = hours % 12 || 12;
    
      return `${day}${daySuffix} ${month} ${year}, ${displayHour}:${minutes} ${ampm}`;
    };
    

  const handleSendEmail = () => {
    setLoading(true);

    fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...emailData,
        image: selectedImage,
        filename: selectedFileName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message || 'Email sent successfully!');
        setEmailModalOpen(false);
        setEmailData({ to: '', subject: '', body: '' });
      })
      .catch((err) => {
        console.error('Email error:', err);
        toast.error('Failed to send email. Please try again.');
      })
      .finally(() => setLoading(false));
  };
  const handleDeleteClick = (fileName) => {
    setSelectedFile(fileName);
    setOpenDialog(true);
  };
  const confirmDelete = () => {
    fetch('http://localhost:5000/delete-document', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_file: selectedFile }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message || 'Document deleted!');
        setDocuments((prev) =>
          prev.filter((doc) => doc.input_file !== selectedFile)
        );
        setOpenDialog(false);
        setSelectedFile(null);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete document');
      });
  };
  // const handleDelete = (input_file) => {
  //   if (window.confirm('Are you sure you want to delete this document?')) {
  //     fetch('http://localhost:5000/delete-document', {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ input_file }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         toast.success(data.message || 'Document deleted!');
  //         setDocuments((prev) => prev.filter((doc) => doc.input_file !== input_file));
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         toast.error('Failed to delete document');
  //       });
  //   }
  // };



  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    body: '',
  });

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = `data:image/png;base64,${selectedImage}`;
    a.download = selectedFileName || 'image.png';
    a.click();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* <Navbar /> */}
      <Box p={4}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: '#000',
            fontWeight: 'bold',
            textShadow: '0 0 10px #0ff, 0 0 20px #0ff',
            animation: 'glow 2s ease-in-out infinite',
            mb: 4,
            fontFamily: "sans-serif",
          }}
        >
          Your Document's
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          {/* Search Input */}
          <TextField
            label="Search by filename"
            variant="outlined"
            sx={{
              width: '25%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#f9f9f9',
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                  borderWidth: '2px',
                },
              },
              '& input': {
                color: '#333',
              },
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            InputLabelProps={{
              sx: {
                color: '#666',
                '&.Mui-focused': {
                  color: '#1976d2',
                },
              },
            }}
          />

          {/* File Type Dropdown */}
          <FormControl sx={{ width: '120px' }} size="small">
            <InputLabel>File Type</InputLabel>
            <Select
              value={selectedFileType}
              label="File Type"
              onChange={(e) => {
                setSelectedFileType(e.target.value);
             
              }}
            >
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="txt">TXT</MenuItem>
            </Select>
          </FormControl>
        </Box>


        {filteredDocuments.map((doc, index) => (
          <Card key={index} sx={{ mb: 2, backgroundColor: '#111', color: '#0ff' }}>
            <CardContent>
              <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{doc.input_file}</Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#ccc' }}>
                  {formatDateTime(doc.encrypted_at)}
                </Typography>
              </Box>


              <Typography variant="body2">Type: {doc.file_type}</Typography>
              <Box mt={2} display="flex" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => handleView(doc.image_data, doc.encrypted_file)}
                  startIcon={<VisibilityIcon />}
                  sx={{
                    borderColor: '#0ff',
                    color: '#0ff',
                    fontWeight: 'bold',
                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: '#0ff',
                      color: '#000',
                    },
                    mr: 1,
                  }}
                >
                  View
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleShare(doc.image_data, doc.encrypted_file)}
                  startIcon={<ShareIcon />}
                  sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #ff4081, #f50057)',
                    transition: '0.3s',
                    '&:hover': {
                      background: 'linear-gradient(to right, #f50057, #ff4081)',
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgba(255, 64, 129, 0.4)',
                    },
                  }}
                >
                  Share
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteClick(doc.input_file)}
                  startIcon={<DeleteIcon />}
                  sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #f44336, #d32f2f)',
                    transition: '0.3s',
                    '&:hover': {
                      background: 'linear-gradient(to right, #d32f2f, #f44336)',
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgba(244, 67, 54, 0.4)',
                    },
                  }}
                >
                  Delete
                </Button>



              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Image Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Image Preview</Typography>
            <IconButton onClick={handleClose} sx={{ color: '#f00' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <img
            src={`data:image/png;base64,${selectedImage}`}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
          />
          <Box mt={2}>
            <Button variant="contained" onClick={handleDownload}>Download</Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={emailModalOpen} onClose={() => setEmailModalOpen(false)}>
        <>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#1e1e1e',
              color: '#fff',
              border: '2px solid #0ff',
              boxShadow: 24,
              borderRadius: '16px',
              p: 4,
              width: '90%',
              maxWidth: 500,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography
                variant="h6"
                sx={{
                  color: '#0ff',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  textShadow: '0 0 10px #0ff',
                }}
              >
                Send Image via Email
              </Typography>
              <IconButton onClick={() => setEmailModalOpen(false)} sx={{ color: '#f44336' }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box display="flex" flexDirection="column" gap={2}>
              {/* Receiver Email */}
              <input
                type="email"
                placeholder="Receiver Email"
                value={emailData.to}
                onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #555',
                  backgroundColor: '#2a2a2a',
                  color: '#0ff',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />

              {/* Subject */}
              <input
                type="text"
                placeholder="Subject"
                value={emailData.subject}
                onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #555',
                  backgroundColor: '#2a2a2a',
                  color: '#0ff',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />

              {/* Message */}
              <textarea
                placeholder="Message"
                rows="6"
                value={emailData.body}
                onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #555',
                  backgroundColor: '#2a2a2a',
                  color: '#0ff',
                  fontSize: '1rem',
                  resize: 'vertical',
                  minHeight: '150px', // ✨ Height control
                  outline: 'none',
                }}
              />

              {/* Send Button */}
              <Button
                variant="contained"
                color="success"
                onClick={handleSendEmail}
                disabled={loading}
                sx={{
                  mt: 1,
                  paddingY: '10px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(to right, #00f5c6, #0ff)',
                  color: '#000',
                  '&:hover': {
                    background: 'linear-gradient(to right, #0ff, #00f5c6)',
                    color: '#000',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Send Email'}
              </Button>

            </Box>
          </Box>
        </>
      </Modal>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedFile}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DocumentPage;
