import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

// Mock user data - In production, this would come from your backend
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    points: 1250,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
  },
];

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Simulate API call
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    set({ user: userWithoutPassword, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  register: async (name: string, email: string, password: string) => {
    // Simulate API call
    if (mockUsers.some((u) => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      points: 0,
    };

    set({ user: newUser, isAuthenticated: true });
  },
}));