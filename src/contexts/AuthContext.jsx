import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getUsersFromStorage = () => {
  try {
    const users = localStorage.getItem('plagiarism_users');
    if (users) {
      return JSON.parse(users);
    }
  } catch (error) {
    console.error("Failed to parse users from localStorage", error);
    return [];
  }
  return [];
};

const initializeUsers = () => {
    const existingUsers = getUsersFromStorage();
    if (existingUsers.length === 0) {
        const adminUser = {
            id: 'admin-001',
            email: 'admin@plagiarismguard.com',
            password: 'password123',
            fullName: 'Admin User',
            role: 'admin',
            createdAt: new Date().toISOString(),
            status: 'active',
            documentsUploaded: 0,
            reportsGenerated: 0,
            avatar: null
        };
        const demoUser = {
            id: 'user-001',
            email: 'user@plagiarismguard.com',
            password: 'password123',
            fullName: 'Demo User',
            role: 'user',
            createdAt: new Date().toISOString(),
            status: 'active',
            documentsUploaded: 3,
            reportsGenerated: 2,
            avatar: null
        };
        const users = [adminUser, demoUser];
        localStorage.setItem('plagiarism_users', JSON.stringify(users));
    }
};

initializeUsers();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('plagiarism_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email, password, fullName) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getUsersFromStorage();
      if (users.find(u => u.email === email)) {
        toast({
            title: "Sign up failed",
            description: "An account with this email already exists.",
            variant: "destructive"
        });
        return { success: false, error: 'Email already exists.' };
      }

      const newUser = {
          id: `user-${Date.now()}`,
          email,
          password,
          fullName,
          role: 'user',
          createdAt: new Date().toISOString(),
          status: 'active',
          documentsUploaded: 0,
          reportsGenerated: 0,
          avatar: null
      };

      const newUsers = [...users, newUser];
      localStorage.setItem('plagiarism_users', JSON.stringify(newUsers));
      
      setUser(newUser);
      localStorage.setItem('plagiarism_user', JSON.stringify(newUser));
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to PlagiarismGuard. You can now start uploading documents.",
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "Please try again later.",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const signIn = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getUsersFromStorage();
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
          if (foundUser.status === 'suspended') {
              toast({
                  title: "Sign in failed",
                  description: "Your account has been suspended.",
                  variant: "destructive"
              });
              return { success: false, error: 'Account suspended.' };
          }
          setUser(foundUser);
          localStorage.setItem('plagiarism_user', JSON.stringify(foundUser));
          
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          
          return { success: true };
      }
      
      toast({
        title: "Sign in failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('plagiarism_user');
    toast({
      title: "Signed out successfully",
      description: "See you next time!",
    });
  };

  const updateUser = (updatedData) => {
    setUser(prevUser => {
      const newUser = { ...prevUser, ...updatedData };
      localStorage.setItem('plagiarism_user', JSON.stringify(newUser));
      
      const users = getUsersFromStorage();
      const updatedUsers = users.map(u => u.id === newUser.id ? newUser : u);
      localStorage.setItem('plagiarism_users', JSON.stringify(updatedUsers));

      return newUser;
    });
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};