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
} from '@/lib/icons';

interface DimensionCardProps {
  dimensionKey: string;
  dimension: DimensionDetail;
}

const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  sourceCredibility: <ShieldCheck className="w-3.5 h-3.5" />,
  internalCoherence: <Puzzle className="w-3.5 h-3.5" />,
  externalCorroboration: <Globe className="w-3.5 h-3.5" />,
  sensationalism: <AlertTriangle className="w-3.5 h-3.5" />,
  factualAccuracy: <CircleCheckBig className="w-3.5 h-3.5" />,
  biasManipulation: <Brain className="w-3.5 h-3.5" />,
};

function getScoreColor(score: number, inverse = false): string {
  const effectiveScore = inverse ? 100 - score : score;
  if (effectiveScore >= 70) return 'bg-neon';
  if (effectiveScore >= 40) return 'bg-trend';
  return 'bg-alert';
}

function getScoreTextColor(score: number, inverse = false): string {
  const effectiveScore = inverse ? 100 - score : score;
  if (effectiveScore >= 70) return 'text-neon';
  if (effectiveScore >= 40) return 'text-trend';
  return 'text-alert';
}

// For sensationalism and bias, higher score = worse (inverse)
const INVERSE_DIMENSIONS = ['sensationalism', 'biasManipulation'];

export function DimensionCard({ dimensionKey, dimension }: DimensionCardProps) {
  const isInverse = INVERSE_DIMENSIONS.includes(dimensionKey);
  const effectiveScore = isInverse ? 100 - dimension.score : dimension.score;

  return (
    <Card className="border-border/50 hover:border-neon/30 transition-colors">
      <CardHeader className="p-2 pb-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">
              {DIMENSION_ICONS[dimensionKey]}
            </span>
            <CardTitle className="text-[10px] font-semibold leading-tight">{dimension.title}</CardTitle>
          </div>
          <span className={`text-sm font-bold ${getScoreTextColor(dimension.score, isInverse)}`}>
            {dimension.score}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-2 pt-0 space-y-1">
        {/* Progress bar */}
        <div className="h-1 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${getScoreColor(dimension.score, isInverse)}`}
            style={{ width: `${dimension.score}%` }}
          />
        </div>

        {/* Level badge + description inline */}
        <div className="flex items-center gap-1">
          <Badge
            variant="outline"
            className={`text-[9px] h-4 px-1 ${
              effectiveScore >= 70
                ? 'border-neon text-neon'
                : effectiveScore >= 40
                ? 'border-trend text-trend'
                : 'border-alert text-alert'
            }`}
          >
            {isInverse
              ? effectiveScore >= 70
                ? 'Bajo riesgo'
                : effectiveScore >= 40
                ? 'Moderado'
                : 'Riesgo alto'
              : effectiveScore >= 70
              ? 'Alto'
              : effectiveScore >= 40
              ? 'Medio'
              : 'Bajo'}
          </Badge>
        </div>

        {/* Description — single line */}
        <p className="text-[9px] text-muted-foreground leading-snug line-clamp-2">
          {dimension.description}
        </p>

        {/* Evidence — compact */}
        {dimension.evidence.length > 0 && (
          <ul className="space-y-0">
            {dimension.evidence.slice(0, 2).map((ev, idx) => (
              <li key={idx} className="text-[9px] text-muted-foreground flex gap-1 leading-snug">
                <span className="text-neon shrink-0">•</span>
                <span className="line-clamp-1">{ev}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
