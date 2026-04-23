'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SilencedVoice } from '@/lib/types';
import { VolumeX } from 'lucide-react';

interface SilencedVoicesProps {
  voices: SilencedVoice[];
}

export function SilencedVoices({ voices }: SilencedVoicesProps) {
  if (voices.length === 0) {
    return (
      <Card className="border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <VolumeX className="w-4 h-4" />
            <span className="text-sm">No se detectaron voces silenciadas significativas</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200 dark:border-amber-800/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <VolumeX className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <CardTitle className="text-sm font-semibold">
            Voces Silenciadas / Perspectivas Omitidas
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {voices.map((voice, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30"
          >
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold text-sm mt-0.5">
                {idx + 1}.
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                  {voice.perspective}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {voice.description}
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400/80 italic">
                  Contexto: {voice.context}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
