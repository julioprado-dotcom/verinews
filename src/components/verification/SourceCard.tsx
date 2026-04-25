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
import { ExternalLink } from '@/lib/icons';

interface SourceCardProps {
  source: SourceResult;
}

const RELATION_COLORS: Record<string, string> = {
  confirma: 'bg-neon/15 text-neon border-neon/30',
  contradice: 'bg-alert/15 text-alert border-alert/30',
  matiza: 'bg-trend/15 text-trend border-trend/30',
  sin_relacion: 'bg-muted text-muted-foreground border-border',
};

export function SourceCard({ source }: SourceCardProps) {
  return (
    <Card className="border-border/50 hover:border-neon/30 transition-colors overflow-hidden">
      <CardContent className="p-2 space-y-1.5">
        {/* Header */}
        <div className="flex items-start justify-between gap-1">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-sm">{SOURCE_CATEGORY_ICONS[source.category]}</span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold hover:text-neon transition-colors truncate flex items-center gap-0.5"
              >
                {source.name}
                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
              </a>
            </div>
            <p className="text-[9px] text-muted-foreground">{source.hostName}</p>
          </div>
          <Badge
            variant="outline"
            className={`text-[9px] shrink-0 h-4 px-1 ${RELATION_COLORS[source.relationToNews]}`}
          >
            {RELATION_LABELS[source.relationToNews]}
          </Badge>
        </div>

        {/* Snippet */}
        <p className="text-[9px] text-muted-foreground leading-snug line-clamp-2">
          {source.snippet}
        </p>

        {/* Metadata — compact badges */}
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-[9px] h-3.5 px-1">
            {SOURCE_CATEGORY_LABELS[source.category]}
          </Badge>
          <Badge variant="secondary" className="text-[9px] h-3.5 px-1">
            {ORIENTATION_LABELS[source.orientation]}
          </Badge>
          <Badge variant="secondary" className="text-[9px] h-3.5 px-1">
            {GEOPOLITICAL_LABELS[source.geopoliticalPerspective]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
