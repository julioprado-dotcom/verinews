'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserTier } from '@/lib/auth';

export interface AuthUser {
  id: string;
  email: string;
  tier: UserTier;
  name?: string;
}

export interface UsageInfo {
  used: number;
  limit: number; // -1 = unlimited
  remaining: number; // -1 = unlimited
  tier: UserTier;
  cycle?: 'daily' | 'weekly' | 'monthly' | 'unlimited';
  cycleStart?: string;
  cycleEnd?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  usage: UsageInfo | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUsage: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from stored token on mount
  useEffect(() => {
    const token = localStorage.getItem('verinews-token');
    if (token) {
      fetchUser(token);
    } else {
      // Anonymous user — still check usage by IP
      refreshUsageWithToken(null);
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        await refreshUsageWithToken(token);
      } else {
        // Token invalid
        localStorage.removeItem('verinews-token');
        await refreshUsageWithToken(null);
      }
    } catch {
      localStorage.removeItem('verinews-token');
      await refreshUsageWithToken(null);
    }
    setIsLoading(false);
  };

  const refreshUsageWithToken = async (token: string | null) => {
    try {
      const headers: HeadersInit = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch('/api/auth/usage', { headers });
      const data = await res.json();
      if (data.tier) {
        setUsage({
          used: data.used,
          limit: data.limit,
          remaining: data.remaining,
          tier: data.tier,
          cycle: data.cycle,
          cycleStart: data.cycleStart,
          cycleEnd: data.cycleEnd,
        });
      }
    } catch {
      // Default: free tier, 0 used
      setUsage({ used: 0, limit: 3, remaining: 3, tier: 'free' });
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Error al iniciar sesión' };
      }

      localStorage.setItem('verinews-token', data.token);
      setUser(data.user);
      await refreshUsageWithToken(data.token);
      return { success: true };
    } catch {
      return { success: false, error: 'Error de conexión' };
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name?: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Error al crear la cuenta' };
      }

      localStorage.setItem('verinews-token', data.token);
      setUser(data.user);
      await refreshUsageWithToken(data.token);
      return { success: true };
    } catch {
      return { success: false, error: 'Error de conexión' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('verinews-token');
    setUser(null);
    refreshUsageWithToken(null);
  }, []);

  const refreshUsage = useCallback(async () => {
    const token = localStorage.getItem('verinews-token');
    await refreshUsageWithToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ user, usage, isLoading, login, register, logout, refreshUsage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
