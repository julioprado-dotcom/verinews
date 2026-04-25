'use client';

import { useState, useCallback, useEffect } from 'react';
import { InputForm } from '@/components/verification/InputForm';
import { ScoreGauge } from '@/components/verification/ScoreGauge';
import { DimensionCard } from '@/components/verification/DimensionCard';
import { SourceCard } from '@/components/verification/SourceCard';
import { SourceSummary } from '@/components/verification/SourceSummary';
import { SilencedVoices } from '@/components/verification/SilencedVoices';
import { LiveLog } from '@/components/verification/LiveLog';
import { ShareResult } from '@/components/verification/ShareResult';
import { HistoryList } from '@/components/verification/HistoryList';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ExpandedFooter } from '@/components/ExpandedFooter';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/lib/i18n-context';
import {
  History,
  ArrowLeft,
  BookOpen,
  Eye,
  Scale,
  FileText,
  Moon,
  Sun,
  Filter,
  X,
  User,
  LogOut,
  Zap,
  Crown,
  Building2,
} from '@/lib/icons';
import type {
  InputType,
  VerificationResult,
  AnalysisStage,
  LogEntry,
  SourceCategory,
  GeopoliticalPerspective,
  SourceOrientation,
} from '@/lib/types';
import {
  SOURCE_CATEGORY_LABELS,
  SOURCE_CATEGORY_ICONS,
  GEOPOLITICAL_LABELS,
  ORIENTATION_LABELS,
} from '@/lib/types';

export default function Home() {
  const { t } = useI18n();
  const { user, usage, login, register, logout, refreshUsage } = useAuth();
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [stage, setStage] = useState<AnalysisStage>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<Array<any>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeSourceFilter, setActiveSourceFilter] = useState<string>('all');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [activeGeopoliticalFilter, setActiveGeopoliticalFilter] = useState<string>('all');
  const [activeOrientationFilter, setActiveOrientationFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Initialize dark mode
  useEffect(() => {
    const saved = localStorage.getItem('verinews-theme');
    if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('verinews-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('verinews-theme', 'light');
    }
  };

  // Fetch history on mount
  useEffect(() => {
    fetchHistory();
    // Initialize DB tables (user system)
    fetch('/api/init-db').catch(() => {});
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history?limit=20');
      const data = await res.json();
      setHistory(data.verifications || []);
    } catch {
      // Ignore errors
    }
  };

  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (inputType: InputType, content: string) => {
      setIsLoading(true);
      setResult(null);
      setDebugInfo(null);
      setStage('extracting');

      const startTs = Date.now();
      const initialLogs: LogEntry[] = [
        {
          id: `start-${startTs}`,
          timestamp: startTs,
          stage: 'extracting',
          message: 'Iniciando verificación Crítico-Pluralista...',
          status: 'running',
        },
        {
          id: `input-${startTs}`,
          timestamp: startTs + 50,
          stage: 'extracting',
          message: inputType === 'url'
            ? `URL recibida: ${content.slice(0, 80)}${content.length > 80 ? '...' : ''}`
            : inputType === 'claim'
            ? `Afirmación recibida: ${content.split(' ').length} palabras`
            : `Texto recibido: ${content.split(' ').length} palabras`,
          detail: 'Conectando con el servidor de análisis...',
          status: 'running',
        },
      ];
      setLogs(initialLogs);

      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('verinews-token') : null;
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch('/api/verify', {
          method: 'POST',
          headers,
          body: JSON.stringify({ inputType, content }),
        });

        if (!res.ok) {
          const contentType = res.headers.get('content-type') || '';
          let errorMessage = `Error del servidor (${res.status})`;

          if (contentType.includes('application/json')) {
            try {
              const errData = await res.json();
              errorMessage = errData.error || errorMessage;
            } catch { /* use default */ }
          } else if (contentType.includes('text/plain')) {
            try {
              errorMessage = await res.text();
            } catch { /* use default */ }
          }

          throw new Error(errorMessage);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error('No se pudo leer la respuesta del servidor');

        const decoder = new TextDecoder();
        let buffer = '';
        let resultReceived = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const eventParts = buffer.split('\n\n');
          buffer = eventParts.pop() || '';

          for (const eventPart of eventParts) {
            const dataLines: string[] = [];
            for (const line of eventPart.split('\n')) {
              const trimmed = line.trim();
              if (trimmed.startsWith('data: ')) {
                dataLines.push(trimmed.slice(6));
              }
            }

            if (dataLines.length === 0) continue;

            const jsonStr = dataLines.join('\n');

            try {
              const event = JSON.parse(jsonStr);

              if (event.type === 'log') {
                const entry: LogEntry = event.entry;
                setLogs((prev) => [...prev, entry]);
                setStage(entry.stage);
              } else if (event.type === 'result') {
                const data: VerificationResult = event.data;
                setResult(data);
                setStage('complete');
                resultReceived = true;
              } else if (event.type === 'error') {
                throw new Error(event.message || 'Error en la verificación');
              }
            } catch (parseError) {
              if (parseError instanceof Error && !parseError.message.includes('Unexpected')) {
                throw parseError;
              }
              console.warn('SSE parse warning:', parseError, 'Data:', jsonStr.slice(0, 100));
            }
          }
        }

        if (!resultReceived) {
          throw new Error('El servidor completó la respuesta sin enviar resultados');
        }

        fetchHistory();
        refreshUsage();
      } catch (error) {
        console.error('Verification failed:', error);
        setStage('error');
        setLogs((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            timestamp: Date.now(),
            stage: 'error',
            message: error instanceof Error ? error.message : 'Error desconocido durante la verificación',
            detail: 'El servidor no pudo procesar la solicitud.',
            status: 'error',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleReset = () => {
    setResult(null);
    setStage('idle');
    setLogs([]);
    setDebugInfo(null);
    setShowFilters(false);
  };

  const runDiagnostics = async () => {
    setDebugInfo('Ejecutando diagnóstico...');
    try {
      const res = await fetch('/api/debug');
      const data = await res.json();
      setDebugInfo(JSON.stringify(data, null, 2));
    } catch (err) {
      setDebugInfo(`Error al ejecutar diagnóstico: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    }
  };

  const filteredSources = (() => {
    if (!result?.sourcesFound) return [];
    let sources = result.sourcesFound;

    if (activeSourceFilter !== 'all') {
      sources = sources.filter((s) => s.category === activeSourceFilter);
    }
    if (activeGeopoliticalFilter !== 'all') {
      sources = sources.filter((s) => s.geopoliticalPerspective === activeGeopoliticalFilter);
    }
    if (activeOrientationFilter !== 'all') {
      sources = sources.filter((s) => s.orientation === activeOrientationFilter);
    }

    return sources;
  })();

  const hasActiveFilters = activeSourceFilter !== 'all' || activeGeopoliticalFilter !== 'all' || activeOrientationFilter !== 'all';

  const clearFilters = () => {
    setActiveSourceFilter('all');
    setActiveGeopoliticalFilter('all');
    setActiveOrientationFilter('all');
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Top bar — tagline */}
      <div className="bg-neon/10 border-b border-neon/20 shrink-0">
        <div className="w-full px-4 py-0.5 text-center">
          <p className="text-[10px] text-neon font-medium tracking-wide">
            {t.footerMission}
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm shrink-0 z-50">
        <div className="w-full px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt="VeriNews"
              className="w-8 h-8 rounded-lg"
            />
            <div>
              <h1 className="text-base font-bold leading-tight">{t.appName}</h1>
              <p className="text-[10px] text-muted-foreground">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <LanguageSelector />

            {/* Usage counter */}
            {usage && (
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-muted/30">
                {usage.tier === 'pro' ? (
                  <Building2 className="w-3 h-3 text-purple-400" />
                ) : usage.tier === 'premium' ? (
                  <Crown className="w-3 h-3 text-trend" />
                ) : usage.tier === 'registered' ? (
                  <Zap className="w-3 h-3 text-neon" />
                ) : (
                  <Eye className="w-3 h-3 text-muted-foreground" />
                )}
                <span className="text-[9px] text-muted-foreground font-medium">
                  {usage.limit === -1
                    ? t.tierUnlimited
                    : (() => {
                        const cycleLabel = usage.cycle === 'weekly' ? t.tierWeek : usage.cycle === 'monthly' ? t.tierMonth : t.tierDay;
                        return `${usage.remaining}/${usage.limit}/${cycleLabel}`;
                      })()
                  }
                </span>
              </div>
            )}

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neon/50"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #1e1b4b, #312e81)'
                  : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              }}
              aria-label={isDark ? t.darkMode : t.lightMode}
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center"
                style={{
                  transform: isDark ? 'translateX(0)' : 'translateX(24px)',
                }}
              >
                {isDark ? (
                  <Moon className="w-3 h-3 text-indigo-700" />
                ) : (
                  <Sun className="w-3 h-3 text-amber-500" />
                )}
              </span>
            </button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground h-7"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs">{t.history}</span>
              {history.length > 0 && (
                <Badge variant="secondary" className="text-[10px] px-1 h-4">
                  {history.length}
                </Badge>
              )}
            </Button>

            {/* Auth button */}
            {user ? (
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-muted-foreground hidden sm:inline">{user.email.split('@')[0]}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-muted-foreground h-7 text-[10px]"
                  onClick={logout}
                  title={t.authLogout}
                >
                  <LogOut className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-neon h-7 text-[10px]"
                onClick={() => setAuthModalOpen(true)}
              >
                <User className="w-3 h-3" />
                <span className="hidden sm:inline">{t.authLogin}</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="w-full px-3 py-1.5 h-full">
          {/* Hero / Input Section */}
          {!result && stage === 'idle' && (
            <div className="space-y-3">
              {/* Hero text */}
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-xl md:text-3xl font-bold tracking-tight mb-2">
                  {t.heroTitle1}
                  <span className="text-neon"> {t.heroTitle2}</span>
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {t.heroDescription}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="outline" className="border-neon/50 text-neon text-[10px]">
                    {t.badgeApproach}
                  </Badge>
                </div>
              </div>

              {/* Input Form */}
              <InputForm onSubmit={handleSubmit} isLoading={isLoading} />

              {/* Features */}
              <div className="grid grid-cols-3 gap-2 max-w-3xl mx-auto">
                <div className="bg-card border border-border/50 rounded-lg p-2.5 text-center space-y-0.5">
                  <Eye className="w-6 h-6 mx-auto text-neon" />
                  <h3 className="font-semibold text-xs">{t.feature1Title}</h3>
                  <p className="text-[10px] text-muted-foreground">
                    {t.feature1Desc}
                  </p>
                </div>
                <div className="bg-card border border-border/50 rounded-lg p-2.5 text-center space-y-0.5">
                  <Scale className="w-6 h-6 mx-auto text-analysis" />
                  <h3 className="font-semibold text-xs">{t.feature2Title}</h3>
                  <p className="text-[10px] text-muted-foreground">
                    {t.feature2Desc}
                  </p>
                </div>
                <div className="bg-card border border-border/50 rounded-lg p-2.5 text-center space-y-0.5">
                  <FileText className="w-6 h-6 mx-auto text-trend" />
                  <h3 className="font-semibold text-xs">{t.feature3Title}</h3>
                  <p className="text-[10px] text-muted-foreground">
                    {t.feature3Desc}
                  </p>
                </div>
              </div>

              {/* History inline (when toggled) */}
              {showHistory && (
                <div className="max-w-3xl mx-auto">
                  <Separator className="my-3" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-neon" />
                      <h2 className="text-sm font-semibold">{t.history}</h2>
                    </div>
                    <HistoryList
                      items={history}
                      onSelect={() => {}}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Live Log */}
          {isLoading && <LiveLog logs={logs} currentStage={stage} />}

          {/* Error state */}
          {stage === 'error' && !isLoading && (
            <div className="max-w-3xl mx-auto space-y-3">
              <LiveLog logs={logs} currentStage={stage} />
              
              <div className="text-center space-y-3">
                <h2 className="text-lg font-bold">{t.errorTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  {t.errorDesc}
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Button onClick={handleReset} variant="outline" className="gap-2 border-alert text-alert hover:bg-alert/10">
                    <ArrowLeft className="w-4 h-4" />
                    {t.retry}
                  </Button>
                  <Button onClick={runDiagnostics} variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    {t.diagnostics}
                  </Button>
                </div>

                {debugInfo && (
                  <div className="mt-3 text-left">
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
                        <span className="text-xs font-mono text-muted-foreground">{t.diagnostics}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs text-muted-foreground"
                          onClick={() => navigator.clipboard.writeText(debugInfo)}
                        >
                          Copy
                        </Button>
                      </div>
                      <pre className="p-3 text-xs font-mono text-foreground/80 overflow-auto max-h-40 whitespace-pre-wrap">
                        {debugInfo}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Results — Dashboard layout */}
          {result && stage === 'complete' && (
            <div className="h-full flex flex-col gap-2">
              {/* Top row: Back + Share + Filter toggle */}
              <div className="flex items-center justify-between gap-2 shrink-0">
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground h-7 text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {t.newVerification}
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant={showFilters ? 'default' : 'outline'}
                    size="sm"
                    className={`gap-1.5 h-7 text-xs ${showFilters ? 'bg-neon text-deep hover:bg-neon/90' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-3 h-3" />
                    {t.filters}
                    {hasActiveFilters && (
                      <span className="w-1.5 h-1.5 rounded-full bg-alert" />
                    )}
                  </Button>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground gap-1"
                      onClick={clearFilters}
                    >
                      <X className="w-3 h-3" />
                      {t.clear}
                    </Button>
                  )}
                  <ShareResult result={result} />
                </div>
              </div>

              {/* Filter bar — inline, compact, shown when toggled */}
              {showFilters && (
                <div className="bg-card border border-border rounded-lg p-2 shrink-0 space-y-1.5">
                  {/* Categories */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-muted-foreground font-medium w-16 shrink-0">{t.category}</span>
                    <Button
                      variant={activeSourceFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveSourceFilter('all')}
                      className={`h-6 text-[10px] px-2 ${activeSourceFilter === 'all' ? 'bg-neon text-deep hover:bg-neon/90' : ''}`}
                    >
                      {t.all} ({result.sourcesFound.length})
                    </Button>
                    {(['colectivo_occidental', 'sur_global', 'independiente', 'academico', 'resistencia'] as SourceCategory[]).map(
                      (cat) => {
                        const count = result.sourcesFound.filter((s) => s.category === cat).length;
                        if (count === 0) return null;
                        return (
                          <Button
                            key={cat}
                            variant={activeSourceFilter === cat ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveSourceFilter(cat)}
                            className={`h-6 text-[10px] px-2 ${activeSourceFilter === cat ? 'bg-neon text-deep hover:bg-neon/90' : ''}`}
                          >
                            {SOURCE_CATEGORY_ICONS[cat]} {SOURCE_CATEGORY_LABELS[cat]} ({count})
                          </Button>
                        );
                      }
                    )}
                  </div>
                  {/* Geopolitical */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-muted-foreground font-medium w-16 shrink-0">{t.region}</span>
                    <Button
                      variant={activeGeopoliticalFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveGeopoliticalFilter('all')}
                      className={`h-6 text-[10px] px-2 ${activeGeopoliticalFilter === 'all' ? 'bg-analysis text-white hover:bg-analysis/90' : ''}`}
                    >
                      {t.all}
                    </Button>
                    {(['alineado_otan', 'alineado_usa', 'alineado_ue', 'no_alineado', 'critico_orden_global', 'multipolar'] as GeopoliticalPerspective[]).map(
                      (persp) => {
                        const count = result.sourcesFound.filter((s) => s.geopoliticalPerspective === persp).length;
                        if (count === 0) return null;
                        return (
                          <Button
                            key={persp}
                            variant={activeGeopoliticalFilter === persp ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveGeopoliticalFilter(persp)}
                            className={`h-6 text-[10px] px-2 ${activeGeopoliticalFilter === persp ? 'bg-analysis text-white hover:bg-analysis/90' : ''}`}
                          >
                            {GEOPOLITICAL_LABELS[persp]} ({count})
                          </Button>
                        );
                      }
                    )}
                  </div>
                  {/* Orientation */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-muted-foreground font-medium w-16 shrink-0">{t.orientation}</span>
                    <Button
                      variant={activeOrientationFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveOrientationFilter('all')}
                      className={`h-6 text-[10px] px-2 ${activeOrientationFilter === 'all' ? 'bg-trend text-white hover:bg-trend/90' : ''}`}
                    >
                      {t.all}
                    </Button>
                    {(['estatal', 'corporativo', 'comunitario', 'independiente', 'academico'] as SourceOrientation[]).map(
                      (orient) => {
                        const count = result.sourcesFound.filter((s) => s.orientation === orient).length;
                        if (count === 0) return null;
                        return (
                          <Button
                            key={orient}
                            variant={activeOrientationFilter === orient ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveOrientationFilter(orient)}
                            className={`h-6 text-[10px] px-2 ${activeOrientationFilter === orient ? 'bg-trend text-white hover:bg-trend/90' : ''}`}
                          >
                            {ORIENTATION_LABELS[orient]} ({count})
                          </Button>
                        );
                      }
                    )}
                  </div>
                  {hasActiveFilters && (
                    <div className="text-[10px] text-muted-foreground">
                      {t.showing} {filteredSources.length} {t.of} {result.sourcesFound.length} {t.sources}
                    </div>
                  )}
                </div>
              )}

              {/* Main dashboard area — full width, rows */}
              <div className="flex-1 flex flex-col gap-1.5 min-h-0 overflow-hidden">
                {/* Row 1: Score + 6 Dimensions (all in one row) */}
                <div className="flex gap-1.5 shrink-0">
                  {/* Score gauge — compact */}
                  <div className="bg-card border border-border rounded-lg p-2 flex items-center gap-3 shrink-0 w-[200px]">
                    <ScoreGauge
                      score={result.overallScore}
                      veracityLevel={result.veracityLevel}
                    />
                  </div>
                  {/* 6 Dimensions — 6 in a row */}
                  <div className="flex-1 grid grid-cols-6 gap-1">
                    <DimensionCard dimensionKey="sourceCredibility" dimension={result.sourceCredibility} compact />
                    <DimensionCard dimensionKey="internalCoherence" dimension={result.internalCoherence} compact />
                    <DimensionCard dimensionKey="externalCorroboration" dimension={result.externalCorroboration} compact />
                    <DimensionCard dimensionKey="sensationalism" dimension={result.sensationalism} compact />
                    <DimensionCard dimensionKey="factualAccuracy" dimension={result.factualAccuracy} compact />
                    <DimensionCard dimensionKey="biasManipulation" dimension={result.biasManipulation} compact />
                  </div>
                </div>

                {/* Row 2: Summary + Key Claims + Silenced Voices + Source Summary */}
                <div className="flex gap-1.5 shrink-0">
                  {/* Summary + Claims */}
                  <div className="bg-card border border-border rounded-lg p-2 flex-1 min-w-0">
                    <h2 className="text-xs font-bold mb-1">{t.analysisResult}</h2>
                    <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2 mb-1">
                      {result.summary}
                    </p>
                    {result.keyClaims.length > 0 && (
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                        {result.keyClaims.slice(0, 3).map((claim, idx) => (
                          <p key={idx} className="text-[9px] text-muted-foreground flex gap-1">
                            <span className="text-neon shrink-0">•</span>
                            <span className="line-clamp-1">{claim}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Silenced Voices — compact inline */}
                  <SilencedVoices voices={result.silencedVoices} compact />
                  {/* Source Summary */}
                  <SourceSummary sources={result.sourcesFound} compact />
                </div>

                {/* Row 3: Sources — scrollable */}
                <div className="flex-1 min-h-0 flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-0.5 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-analysis" />
                      <h2 className="text-xs font-semibold">{t.sources}</h2>
                      <span className="text-[10px] text-muted-foreground">({filteredSources.length})</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                    <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1">
                      {filteredSources.map((source, idx) => (
                        <SourceCard key={idx} source={source} />
                      ))}
                    </div>
                    {filteredSources.length === 0 && (
                      <p className="text-center text-xs text-muted-foreground py-4">
                        {t.noSources}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Expanded Footer */}
      <ExpandedFooter />

      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
