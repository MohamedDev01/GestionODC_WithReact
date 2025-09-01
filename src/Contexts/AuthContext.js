import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../Services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const isAuth = await authService.checkAuthStatus();
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials, rememberMe = false) => {
    try {
      setIsLoading(true);
      const result = await authService.login(credentials, rememberMe);
      
      if (result.token && result.user) {
        setIsAuthenticated(true);
        setCurrentUser(result.user);
        return { success: true, data: result };
      }
      
      return { success: false, error: 'Login failed - no token or user received' };
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      setCurrentUser(null);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    currentUser,
    isLoading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
