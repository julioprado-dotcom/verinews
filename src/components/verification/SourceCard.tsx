'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SourceResult } from '@/lib/types';
import {
  SOURCE_CATEGORY_LABELS,
  SOURCE_CATEGORY_ICONS,
  ORIENTATION_LABELS,
  GEOPOLITICAL_LABELS,
  RELATION_LABELS,
} from '@/lib/types';
import { ExternalLink } from 'lucide-react';

interface SourceCardProps {
  source: SourceResult;
}

const RELATION_COLORS: Record<string, string> = {
  confirma: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
  contradice: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
  matiza: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  sin_relacion: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800',
};

export function SourceCard({ source }: SourceCardProps) {
  return (
    <Card className="border-border/50 hover:border-border transition-colors overflow-hidden">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{SOURCE_CATEGORY_ICONS[source.category]}</span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:text-emerald-600 transition-colors truncate flex items-center gap-1"
              >
                {source.name}
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">{source.hostName}</p>
          </div>
          <Badge
            variant="outline"
            className={`text-xs shrink-0 ${RELATION_COLORS[source.relationToNews]}`}
          >
            {RELATION_LABELS[source.relationToNews]}
          </Badge>
        </div>

        {/* Snippet */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {source.snippet}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs">
            {SOURCE_CATEGORY_LABELS[source.category]}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {ORIENTATION_LABELS[source.orientation]}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {GEOPOLITICAL_LABELS[source.geopoliticalPerspective]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
