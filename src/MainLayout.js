// MainLayout.js
import { Routes, Route, useLocation } from 'react-router-dom';
import Encryption from './components/Encryption';
import Decryption from './components/Decryption';
import Signup from './components/Signup';
import Login from './components/Login';
import DocumentPage from './components/DocumentPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({ darkMode, setDarkMode }) {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/sign-up'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
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

export default MainLayout;
