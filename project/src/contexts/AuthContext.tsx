import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  userType: 'general' | 'admin';
  achievements: string[];
  classificationsCount: number;
  avatar?: string;
  googleId?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loginWithGoogle: (googleToken: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setUser(decoded.user);
            // Update last login
            await updateLastLogin(decoded.user.id);
          } else {
            localStorage.removeItem('token');
            toast.error('Session expired. Please login again.');
          }
        } catch (error) {
          localStorage.removeItem('token');
          console.error('Token validation error:', error);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const updateLastLogin = async (userId: string) => {
    try {
      // API call to update last login timestamp
      // await api.updateLastLogin(userId);
    } catch (error) {
      console.error('Failed to update last login:', error);
    }
  };

  const login = (token: string) => {
    try {
      localStorage.setItem('token', token);
      const decoded: any = jwtDecode(token);
      setUser(decoded.user);
      toast.success(`Welcome back, ${decoded.user.name}!`);
    } catch (error) {
      toast.error('Invalid authentication token');
      throw error;
    }
  };

  const loginWithGoogle = async (googleToken: string) => {
    try {
      setIsLoading(true);
      // API call to authenticate with Google
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }),
      });

      if (!response.ok) {
        throw new Error('Google authentication failed');
      }

      const data = await response.json();
      login(data.token);
    } catch (error) {
      toast.error('Google login failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Password reset failed');
      }

      toast.success('Password reset email sent successfully!');
    } catch (error) {
      toast.error('Failed to send password reset email');
      throw error;
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    logout,
    loginWithGoogle,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.userType === 'admin',
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};