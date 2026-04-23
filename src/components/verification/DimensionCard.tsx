'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DimensionDetail } from '@/lib/types';
import {
  ShieldCheck,
  Puzzle,
  Globe,
  AlertTriangle,
  CircleCheckBig,
  Brain,
} from 'lucide-react';

interface DimensionCardProps {
  dimensionKey: string;
  dimension: DimensionDetail;
}

const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  sourceCredibility: <ShieldCheck className="w-5 h-5" />,
  internalCoherence: <Puzzle className="w-5 h-5" />,
  externalCorroboration: <Globe className="w-5 h-5" />,
  sensationalism: <AlertTriangle className="w-5 h-5" />,
  factualAccuracy: <CircleCheckBig className="w-5 h-5" />,
  biasManipulation: <Brain className="w-5 h-5" />,
};

function getScoreColor(score: number, inverse = false): string {
  const effectiveScore = inverse ? 100 - score : score;
  if (effectiveScore >= 70) return 'bg-emerald-500';
  if (effectiveScore >= 40) return 'bg-amber-500';
  return 'bg-red-500';
}

function getScoreTextColor(score: number, inverse = false): string {
  const effectiveScore = inverse ? 100 - score : score;
  if (effectiveScore >= 70) return 'text-emerald-600 dark:text-emerald-400';
  if (effectiveScore >= 40) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

// For sensationalism and bias, higher score = worse (inverse)
const INVERSE_DIMENSIONS = ['sensationalism', 'biasManipulation'];

export function DimensionCard({ dimensionKey, dimension }: DimensionCardProps) {
  const isInverse = INVERSE_DIMENSIONS.includes(dimensionKey);
  const effectiveScore = isInverse ? 100 - dimension.score : dimension.score;

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {DIMENSION_ICONS[dimensionKey]}
            </span>
            <CardTitle className="text-sm font-semibold">{dimension.title}</CardTitle>
          </div>
          <span className={`text-2xl font-bold ${getScoreTextColor(dimension.score, isInverse)}`}>
            {dimension.score}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Progress bar */}
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${getScoreColor(dimension.score, isInverse)}`}
            style={{ width: `${dimension.score}%` }}
          />
        </div>

        {/* Level badge */}
        <Badge
          variant="outline"
          className={`text-xs ${
            effectiveScore >= 70
              ? 'border-emerald-500 text-emerald-600'
              : effectiveScore >= 40
              ? 'border-amber-500 text-amber-600'
              : 'border-red-500 text-red-600'
          }`}
        >
          {isInverse
            ? effectiveScore >= 70
              ? 'Bajo riesgo'
              : effectiveScore >= 40
              ? 'Riesgo moderado'
              : 'Riesgo alto'
            : effectiveScore >= 70
            ? 'Alto'
            : effectiveScore >= 40
            ? 'Medio'
            : 'Bajo'}
        </Badge>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          {dimension.description}
        </p>

        {/* Evidence */}
        {dimension.evidence.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-foreground/70">Evidencia:</p>
            <ul className="space-y-1">
              {dimension.evidence.map((ev, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex gap-1.5">
                  <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
