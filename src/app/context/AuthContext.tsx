import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string, location: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database (in a real app, this would be in a backend)
const mockUsersDB: Array<{ email: string; password: string; user: User }> = [
  {
    email: 'demo@carunity.com',
    password: 'demo123',
    user: {
      id: 'user1',
      name: 'Demo User',
      email: 'demo@carunity.com',
      phone: '+41 79 123 45 67',
      location: 'Zurich, Switzerland',
    }
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = mockUsersDB.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser.user);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (name: string, email: string, password: string, phone: string, location: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = mockUsersDB.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: `user${mockUsersDB.length + 1}`,
      name,
      email,
      phone,
      location,
    };

    mockUsersDB.push({
      email,
      password,
      user: newUser
    });

    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}