import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import About from './pages/About';
import Classify from './pages/Classify';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import EcoTips from './pages/EcoTips';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import ChatBot from './components/ChatBot';
import ParticleBackground from './components/ParticleBackground';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate app initialization with security checks
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-eco-25 via-purple-25 to-teal-25 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
            <ParticleBackground />
            
            {/* Main Layout */}
            <div className="relative z-10">
              <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              
              <div className="flex">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                
                <main className="flex-1 transition-all duration-300">
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* Protected Routes - Require Authentication */}
                    <Route path="/eco-tips" element={
                      <ProtectedRoute>
                        <EcoTips />
                      </ProtectedRoute>
                    } />
                    <Route path="/classify" element={
                      <ProtectedRoute>
                        <Classify />
                      </ProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/reports" element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    
                    {/* Admin Only Routes */}
                    <Route path="/admin" element={
                      <ProtectedRoute adminOnly>
                        <AdminPanel />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>
              </div>
            </div>

            {/* Global Components */}
            <ChatBot />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: '12px',
                  color: '#1f2937',
                  fontWeight: '500',
                  padding: '16px 20px',
                  fontSize: '14px',
                  boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                },
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#ffffff',
                  },
                  style: {
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#ffffff',
                  },
                  style: {
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                  },
                },
                loading: {
                  iconTheme: {
                    primary: '#3b82f6',
                    secondary: '#ffffff',
                  },
                  style: {
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;