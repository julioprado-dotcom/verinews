'use client';

import type { VeracityLevel } from '@/lib/types';
import { VERACITY_CONFIG } from '@/lib/types';

interface ScoreGaugeProps {
  score: number;
  veracityLevel: VeracityLevel;
}

export function ScoreGauge({ score, veracityLevel }: ScoreGaugeProps) {
  const config = VERACITY_CONFIG[veracityLevel];
  
  // SVG gauge calculation
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;

  const getGaugeColor = () => {
    if (score >= 80) return '#10b981'; // emerald
    if (score >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const getGaugeGradient = () => {
    if (score >= 80) return 'from-emerald-400 to-emerald-600';
    if (score >= 50) return 'from-amber-400 to-amber-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-52 h-52">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted/30"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={getGaugeColor()}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getGaugeGradient().includes('emerald') ? 'text-emerald-600' : getGaugeGradient().includes('amber') ? 'text-amber-600' : 'text-red-600'}`}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground mt-1">de 100</span>
        </div>
      </div>

      <div className="text-center">
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
          veracityLevel === 'verified' 
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
            : veracityLevel === 'dubious'
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          <span className="w-2.5 h-2.5 rounded-full bg-current" />
          {config.label}
        </span>
        <p className="text-xs text-muted-foreground mt-2 max-w-xs">
          {config.description}
        </p>
      </div>
    </div>
  );
}
