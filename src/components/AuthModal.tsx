'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n-context';
import { Button } from '@/components/ui/button';
import { X, Mail, Lock, User, Zap, Crown, Eye, EyeOff, Building2 } from '@/lib/icons';

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = mode === 'login'
        ? await login(email, password)
        : await register(email, password, name);

      if (result.success) {
        onClose();
        setEmail('');
        setPassword('');
        setName('');
      } else {
        setError(result.error || 'Error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-sm font-bold">{mode === 'login' ? t.authLogin : t.authRegister}</h2>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onClose}>
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {mode === 'register' && (
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.authName}
                className="w-full pl-8 pr-3 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-neon"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.authEmail}
              required
              className="w-full pl-8 pr-3 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-neon"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.authPassword}
              required
              minLength={6}
              className="w-full pl-8 pr-8 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-neon"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {error && (
            <p className="text-[10px] text-alert">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-neon text-deep hover:bg-neon/90 text-xs h-9 font-semibold"
          >
            {loading ? '...' : (mode === 'login' ? t.authLogin : t.authRegister)}
          </Button>

          <p className="text-center text-[10px] text-muted-foreground">
            {mode === 'login' ? t.authNoAccount : t.authHasAccount}{' '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-neon hover:underline"
            >
              {mode === 'login' ? t.authRegister : t.authLogin}
            </button>
          </p>
        </form>

        {/* 4-tier comparison */}
        <div className="border-t border-border p-3 space-y-2">
          <p className="text-[10px] font-semibold text-foreground/70 text-center">{t.authTierCompare}</p>
          <div className="grid grid-cols-4 gap-1">
            <div className="bg-muted/30 rounded-lg p-1.5 text-center">
              <Eye className="w-3 h-3 mx-auto text-muted-foreground mb-0.5" />
              <p className="text-[8px] font-semibold">{t.tierFree}</p>
              <p className="text-[8px] text-muted-foreground">3/{t.tierDay}</p>
              <p className="text-[7px] text-muted-foreground/60">{t.tierPriceFree}</p>
            </div>
            <div className="bg-neon/10 rounded-lg p-1.5 text-center border border-neon/20">
              <Zap className="w-3 h-3 mx-auto text-neon mb-0.5" />
              <p className="text-[8px] font-semibold text-neon">{t.tierRegistered}</p>
              <p className="text-[8px] text-muted-foreground">50/{t.tierWeek}</p>
              <p className="text-[7px] text-muted-foreground/60">{t.tierPriceFree}</p>
            </div>
            <div className="bg-trend/10 rounded-lg p-1.5 text-center border border-trend/20">
              <Crown className="w-3 h-3 mx-auto text-trend mb-0.5" />
              <p className="text-[8px] font-semibold text-trend">{t.tierPremium}</p>
              <p className="text-[8px] text-muted-foreground">500/{t.tierMonth}</p>
              <p className="text-[7px] text-trend/70">$4.99/{t.tierMonth}</p>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-1.5 text-center border border-purple-500/20">
              <Building2 className="w-3 h-3 mx-auto text-purple-400 mb-0.5" />
              <p className="text-[8px] font-semibold text-purple-400">{t.tierPro}</p>
              <p className="text-[8px] text-muted-foreground">{t.tierUnlimited}</p>
              <p className="text-[7px] text-purple-400/70">3 {t.tierSeats}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
