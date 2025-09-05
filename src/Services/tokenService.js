import authService from './authService';

class TokenService {
  constructor() {
    this.tokenKey = 'authToken';
    this.userKey = 'user';
  }

  // Get token from storage (checks both localStorage and sessionStorage)
  getToken() {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  // Set token based on remember me preference
  setToken(token, rememberMe = false) {
    this.clearToken(); // Clear existing token first
    
    if (rememberMe) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      sessionStorage.setItem(this.tokenKey, token);
    }
  }

  // Clear token from both storages
  clearToken() {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
  }

  // Check if token exists
  hasToken() {
    return !!this.getToken();
  }

  // Get user data
  getUser() {
    const user = localStorage.getItem(this.userKey) || sessionStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  // Set user data
  setUser(user, rememberMe = false) {
    this.clearUser(); // Clear existing user first
    
    if (rememberMe) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } else {
      sessionStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  // Clear user data
  clearUser() {
    localStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.userKey);
  }

  // Validate token format (basic JWT validation)
  isValidToken(token) {
    if (!token) return false;

    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload
      const payload = JSON.parse(atob(parts[1]));

      // Check expiration
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  // Get token expiration time
  getTokenExpiration(token) {
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? new Date(payload.exp * 1000) : null;
    } catch (error) {
      return null;
    }
  }

  // Auto-login check
  async checkAutoLogin() {
    const token = this.getToken();
    
    if (!token || !this.isValidToken(token)) {
      this.clearToken();
      this.clearUser();
      return false;
    }
    
    // Token is valid, user is authenticated
    return true;
  }
}

export const tokenService = new TokenService();
