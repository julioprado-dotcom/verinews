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
      <div className="relative bg-card border border-border rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <h2 className="text-sm font-bold">{mode === 'login' ? t.authLogin : t.authRegister}</h2>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 cursor-pointer" onClick={onClose} title={t.authClose || 'Cerrar'}>
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 pt-4 pb-3 space-y-3">
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
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              title={showPassword ? t.tooltipHidePassword : t.tooltipShowPassword}
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
            className="w-full bg-neon text-deep hover:bg-neon/90 text-xs h-9 font-semibold cursor-pointer"
            title={mode === 'login' ? t.authLogin : t.authRegister}
          >
            {loading ? '...' : (mode === 'login' ? t.authLogin : t.authRegister)}
          </Button>

          <p className="text-center text-[10px] text-muted-foreground">
            {mode === 'login' ? t.authNoAccount : t.authHasAccount}{' '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-neon hover:underline cursor-pointer"
              title={mode === 'login' ? t.tooltipSwitchToRegister : t.tooltipSwitchToLogin}
            >
              {mode === 'login' ? t.authRegister : t.authLogin}
            </button>
          </p>
        </form>

        {/* 4-tier comparison — 2x2 grid for readability */}
        <div className="border-t border-border px-5 py-3 space-y-2">
          <p className="text-[10px] font-semibold text-foreground/70 text-center">{t.authTierCompare}</p>
          <div className="grid grid-cols-2 gap-2">
            {/* Row 1: Free + Registered */}
            <div
              className="bg-muted/30 rounded-lg px-3 py-2 flex items-center gap-2"
              title={`${t.tierFree}: 3/${t.tierDay} · ${t.tierPriceFree}`}
            >
              <Eye className="w-4 h-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold truncate">{t.tierFree}</p>
                <p className="text-[9px] text-muted-foreground">3/{t.tierDay} · {t.tierPriceFree}</p>
              </div>
            </div>
            <div
              className="bg-neon/10 rounded-lg px-3 py-2 flex items-center gap-2 border border-neon/20 cursor-pointer"
              title={`${t.tierRegistered}: 50/${t.tierWeek} · ${t.tierPriceFree}`}
            >
              <Zap className="w-4 h-4 shrink-0 text-neon" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-neon truncate">{t.tierRegistered}</p>
                <p className="text-[9px] text-muted-foreground">50/{t.tierWeek} · {t.tierPriceFree}</p>
              </div>
            </div>
            {/* Row 2: Premium + Pro */}
            <div
              className="bg-trend/10 rounded-lg px-3 py-2 flex items-center gap-2 border border-trend/20 cursor-pointer"
              title={`${t.tierPremium}: 500/${t.tierMonth} · $4.99`}
            >
              <Crown className="w-4 h-4 shrink-0 text-trend" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-trend truncate">{t.tierPremium}</p>
                <p className="text-[9px] text-muted-foreground">500/{t.tierMonth} · $4.99</p>
              </div>
            </div>
            <div
              className="bg-purple-500/10 rounded-lg px-3 py-2 flex items-center gap-2 border border-purple-500/20 cursor-pointer"
              title={`${t.tierPro}: ${t.tierUnlimited} · 3 ${t.tierSeats} · $14.99`}
            >
              <Building2 className="w-4 h-4 shrink-0 text-purple-400" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-purple-400 truncate">{t.tierPro}</p>
                <p className="text-[9px] text-muted-foreground">{t.tierUnlimited} · 3 {t.tierSeats}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
