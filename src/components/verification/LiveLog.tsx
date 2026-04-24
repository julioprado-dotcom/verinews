'use client';

import { useEffect, useRef, useState } from 'react';
import type { LogEntry, AnalysisStage } from '@/lib/types';
import { STAGE_ICONS, STAGE_LABELS } from '@/lib/types';

interface LiveLogProps {
  logs: LogEntry[];
  currentStage: AnalysisStage;
}

/** Returns a color class based on the entry status and stage */
function getStatusColor(status: LogEntry['status'], stage: AnalysisStage): string {
  if (status === 'error') return 'text-red-400';
  if (status === 'done') return 'text-neon';
  switch (stage) {
    case 'extracting': return 'text-blue-400';
    case 'searching': return 'text-amber-400';
    case 'classifying': return 'text-purple-400';
    case 'analyzing': return 'text-cyan-400';
    case 'generating': return 'text-emerald-400';
    case 'saving': return 'text-teal-400';
    default: return 'text-foreground';
  }
}

function getStatusIcon(status: LogEntry['status']): string {
  switch (status) {
    case 'done': return '✓';
    case 'error': return '✗';
    case 'running': return '●';
    default: return '○';
  }
}

function formatTime(timestamp: number): string {
  const d = new Date(timestamp);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function formatElapsed(startTs: number, currentTs: number): string {
  const elapsed = Math.round((currentTs - startTs) / 1000);
  if (elapsed < 60) return `${elapsed}s`;
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return `${mins}m ${secs}s`;
}

const PROGRESS_STAGES: AnalysisStage[] = ['extracting', 'searching', 'classifying', 'analyzing', 'generating', 'saving'];

export function LiveLog({ logs, currentStage }: LiveLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);

  // Only run time-dependent logic on the client after hydration
  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
  }, []);

  // Tick every second while running
  useEffect(() => {
    if (!mounted) return;
    if (currentStage !== 'idle' && currentStage !== 'complete' && currentStage !== 'error') {
      const interval = setInterval(() => setNow(Date.now()), 1000);
      return () => clearInterval(interval);
    }
  }, [currentStage, mounted]);

  // Auto-scroll to bottom on new entries
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs.length]);

  const isRunning = currentStage !== 'idle' && currentStage !== 'complete' && currentStage !== 'error';
  const startTs = logs.length > 0 ? logs[0].timestamp : now;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2.5">
            {/* Terminal dots */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-2">
              VeriNews — Proceso de Verificación
            </span>
          </div>
          {mounted && isRunning && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="text-xs font-mono text-neon">
                {formatElapsed(startTs, now)}
              </span>
            </div>
          )}
          {mounted && currentStage === 'complete' && (
            <span className="text-xs font-mono text-neon">
              Completado
            </span>
          )}
        </div>

        {/* Log entries */}
        <div
          ref={scrollRef}
          className="p-4 font-mono text-sm max-h-[420px] overflow-y-auto space-y-1.5 scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--neon) transparent',
          }}
        >
          {logs.length === 0 && isRunning && (
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <span className="text-neon">●</span>
              <span>Iniciando verificación...</span>
            </div>
          )}

          {logs.map((entry) => {
            const colorClass = getStatusColor(entry.status, entry.stage);
            const statusIcon = getStatusIcon(entry.status);
            const stageIcon = STAGE_ICONS[entry.stage] || '○';

            return (
              <div key={entry.id} className="group">
                {/* Main log line */}
                <div className="flex items-start gap-2">
                  {/* Timestamp — only render on client to avoid hydration mismatch */}
                  <span className="text-muted-foreground/60 text-xs shrink-0 pt-0.5 select-none">
                    {mounted ? formatTime(entry.timestamp) : '--:--:--'}
                  </span>

                  {/* Status indicator */}
                  <span className={`shrink-0 text-xs font-bold pt-0.5 ${colorClass}`} style={{ minWidth: '12px' }}>
                    {statusIcon}
                  </span>

                  {/* Stage icon */}
                  <span className="shrink-0 text-sm">{stageIcon}</span>

                  {/* Message */}
                  <span className={`${entry.status === 'done' ? 'text-foreground/80' : colorClass} leading-snug`}>
                    {entry.message}
                  </span>
                </div>

                {/* Detail line */}
                {entry.detail && (
                  <div className="flex items-start gap-2 ml-[72px]">
                    <span className="text-muted-foreground/40 text-xs shrink-0">└</span>
                    <span className="text-xs text-muted-foreground/70 leading-snug whitespace-pre-line">
                      {entry.detail}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Animated cursor at the end when running */}
          {mounted && isRunning && (
            <div className="flex items-center gap-2 text-neon animate-pulse">
              <span className="text-xs">▌</span>
              <span className="text-xs text-neon/70">
                {STAGE_LABELS[currentStage]}
              </span>
            </div>
          )}
        </div>

        {/* Footer with stage progress bar */}
        <div className="px-5 py-3 border-t border-border bg-muted/20">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Progreso:</span>
            <div className="flex-1 flex items-center gap-1">
              {PROGRESS_STAGES.map((s, idx) => {
                const stageOrder = PROGRESS_STAGES.indexOf(currentStage);
                const isCompleted = idx < stageOrder || currentStage === 'complete';
                const isCurrent = idx === stageOrder && currentStage !== 'complete' && currentStage !== 'error' && currentStage !== 'idle';

                return (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div
                      className={`h-1.5 rounded-full flex-1 transition-all duration-700 ${
                        isCompleted
                          ? 'bg-neon'
                          : isCurrent
                          ? 'bg-neon/40 animate-pulse'
                          : 'bg-muted'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {currentStage === 'complete' ? '100%' : currentStage === 'error' ? 'Error' : `${Math.round((PROGRESS_STAGES.indexOf(currentStage) + 1) / 6 * 100)}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
