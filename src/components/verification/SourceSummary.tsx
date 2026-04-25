'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SourceResult } from '@/lib/types';
import {
  SOURCE_CATEGORY_LABELS,
  SOURCE_CATEGORY_ICONS,
} from '@/lib/types';
import { BarChart3 } from '@/lib/icons';

interface SourceSummaryProps {
  sources: SourceResult[];
}

export function SourceSummary({ sources }: SourceSummaryProps) {
  // Count by category
  const categoryCounts: Record<string, number> = {};
  const relationCounts: Record<string, number> = {};

  sources.forEach((s) => {
    categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1;
    relationCounts[s.relationToNews] = (relationCounts[s.relationToNews] || 0) + 1;
  });

  const total = sources.length;

  return (
    <Card className="border-border/50">
      <CardHeader className="p-2 pb-1">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-neon" />
          <CardTitle className="text-[11px] font-semibold">
            Resumen ({total} fuentes)
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-2 pt-0 space-y-2">
        {/* Category breakdown — compact */}
        <div className="space-y-1">
          <p className="text-[9px] font-medium text-foreground/70">Diversidad de perspectivas:</p>
          {Object.entries(categoryCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => (
              <div key={category} className="flex items-center gap-1.5">
                <span className="text-xs">{SOURCE_CATEGORY_ICONS[category as keyof typeof SOURCE_CATEGORY_ICONS]}</span>
                <span className="text-[9px] font-medium w-24 truncate">
                  {SOURCE_CATEGORY_LABELS[category as keyof typeof SOURCE_CATEGORY_LABELS]}
                </span>
                <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-neon transition-all duration-500"
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground w-4 text-right">{count}</span>
              </div>
            ))}
        </div>

        {/* Relation breakdown — inline badges */}
        <div className="space-y-1">
          <p className="text-[9px] font-medium text-foreground/70">Relación con la noticia:</p>
          <div className="flex flex-wrap gap-1">
            {Object.entries(relationCounts).map(([relation, count]) => (
              <Badge
                key={relation}
                variant="outline"
                className={`text-[9px] h-4 px-1 ${
                  relation === 'confirma'
                    ? 'border-neon text-neon'
                    : relation === 'contradice'
                    ? 'border-alert text-alert'
                    : relation === 'matiza'
                    ? 'border-trend text-trend'
                    : 'border-muted-foreground text-muted-foreground'
                }`}
              >
                {relation === 'confirma'
                  ? '✅ Confirman'
                  : relation === 'contradice'
                  ? '❌ Contradicen'
                  : relation === 'matiza'
                  ? '⚠️ Matizan'
                  : '➖ Sin relación'}: {count}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
