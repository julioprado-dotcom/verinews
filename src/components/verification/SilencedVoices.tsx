'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SilencedVoice } from '@/lib/types';
import { VolumeX } from '@/lib/icons';

interface SilencedVoicesProps {
  voices: SilencedVoice[];
  compact?: boolean;
}

export function SilencedVoices({ voices, compact }: SilencedVoicesProps) {
  if (voices.length === 0) {
    return (
      <Card className={`border-neon/20 bg-neon/5 ${compact ? 'w-[280px] shrink-0' : 'shrink-0'}`}>
        <CardContent className="p-2">
          <div className="flex items-center gap-1.5 text-neon">
            <VolumeX className="w-3.5 h-3.5" />
            <span className="text-[10px]">No se detectaron voces silenciadas significativas</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-trend/30 ${compact ? 'w-[280px] shrink-0' : 'shrink-0'}`}>
      <CardHeader className="p-2 pb-1">
        <div className="flex items-center gap-1.5">
          <VolumeX className="w-3.5 h-3.5 text-trend" />
          <CardTitle className="text-[11px] font-semibold">
            Voces Silenciadas
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-2 pt-0 space-y-1">
        {voices.map((voice, idx) => (
          <div
            key={idx}
            className="p-1.5 rounded-md bg-trend/5 border border-trend/20"
          >
            <div className="flex items-start gap-1.5">
              <span className="text-trend font-bold text-[10px] mt-0.5 shrink-0">
                {idx + 1}.
              </span>
              <div className="space-y-0.5 min-w-0">
                <p className="text-[10px] font-semibold text-trend leading-snug">
                  {voice.perspective}
                </p>
                <p className={`text-[9px] text-muted-foreground leading-snug ${compact ? 'line-clamp-1' : 'line-clamp-2'}`}>
                  {voice.description}
                </p>
                {!compact && (
                  <p className="text-[9px] text-trend/80 italic line-clamp-1">
                    {voice.context}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
