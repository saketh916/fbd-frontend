import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchHistory from './pages/HistoryPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  // Listen to storage changes (for multi-tab)
  useEffect(() => {
    const handleStorage = () => setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

        <main className="flex-grow">
          <Routes>
            {/* Direct access to Login Page if not logged in */}
            <Route 
              path="/" 
              element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} 
            />
            
            {/* Login Route (redirects to home if already logged in) */}
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} 
            />
            
            {/* 🔑 MODIFIED: Pass setIsLoggedIn to RegisterPage */}
            <Route 
              path="/register" 
              element={isLoggedIn ? <Navigate to="/home" /> : <RegisterPage setIsLoggedIn={setIsLoggedIn} />} 
            />
            
            {/* Protected Routes */}
            <Route path="/home" element={isLoggedIn ? <LandingPage /> : <Navigate to="/login" />} />
            <Route path="/history" element={isLoggedIn ? <SearchHistory /> : <Navigate to="/login" />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Feedback Analysis Project. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;