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
    if (score >= 80) return '#00E5A0'; // neon
    if (score >= 50) return '#F59E0B'; // trend/amber
    return '#FF406A'; // alert
  };

  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            className="text-muted/30"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={getGaugeColor()}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-xl font-bold"
            style={{ color: getGaugeColor() }}
          >
            {score}
          </span>
          <span className="text-[9px] text-muted-foreground">de 100</span>
        </div>
      </div>

      <div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
            veracityLevel === 'verified'
              ? 'bg-neon/15 text-neon'
              : veracityLevel === 'dubious'
              ? 'bg-trend/15 text-trend'
              : 'bg-alert/15 text-alert'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {config.label}
        </span>
      </div>
    </div>
  );
}
