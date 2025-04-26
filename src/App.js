import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Encryption from './components/Encryption';
import Decryption from './components/Decryption';
import Signup from './components/Signup';
import Login from './components/Login';
import DocumentPage from './components/DocumentPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// Separate layout to handle conditional rendering of Navbar
function MainLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/sign-up']; // Hide Navbar on Login and Signup

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/encryption" element={<Encryption />} />
        <Route path="/decryption" element={<Decryption />} />
        <Route path="/my-doc" element={<DocumentPage />} />
        <Route path="/my-dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
