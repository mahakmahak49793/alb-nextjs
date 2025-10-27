'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// User type definition
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'CUSTOMER' | 'ASTROLOGER' | 'ADMIN';
  profileImage?: string;
}

// Login credentials interface
interface LoginCredentials {
  email: string;
  password: string;
  type: 'CUSTOMER' | 'ASTROLOGER';
}

// Hardcoded mock users for testing
const MOCK_USERS = {
  CUSTOMER: {
    id: 'customer-1',
    name: 'John Customer',
    email: 'customer@example.com',
    phone: '9876543210',
    role: 'CUSTOMER' as const,
    profileImage: undefined,
  },
  ASTROLOGER: {
    id: 'astrologer-1', 
    name: 'Astrologer Sharma',
    email: 'astrologer@example.com',
    phone: '9876543211',
    role: 'ASTROLOGER' as const,
    profileImage: undefined,
  }
};

// Simple useAuth hook - no context needed
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('auth_user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_user');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('auth_user');
      }
    }
  }, [user]);

  // Login function (will replace with real API call later)
  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (credentials.email === 'customer@example.com' && credentials.type === 'CUSTOMER') {
        setUser(MOCK_USERS.CUSTOMER);
      } else if (credentials.email === 'astrologer@example.com' && credentials.type === 'ASTROLOGER') {
        setUser(MOCK_USERS.ASTROLOGER);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Quick login functions for testing
  const loginAsCustomer = () => {
    setUser(MOCK_USERS.CUSTOMER);
  };

  const loginAsAstrologer = () => {
    setUser(MOCK_USERS.ASTROLOGER);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    router.push('/');
  };

  return {
    user,
    isLoading,
    login,
    logout,
    loginAsCustomer,
    loginAsAstrologer,
  };
};
