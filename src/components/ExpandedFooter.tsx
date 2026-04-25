'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/lib/i18n-context';
import { Shield, X, Users, Globe, VolumeX, Mail, MessageCircle, Lightbulb, Heart, Coffee } from '@/lib/icons';

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-card flex items-center justify-between px-4 py-3 border-b border-border z-10">
          <h2 className="text-sm font-bold">{title}</h2>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onClose}>
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
        <div className="p-4 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ExpandedFooter() {
  const { t } = useI18n();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-border bg-card/80 shrink-0">
        <div className="w-full px-4 py-3">
          {/* Main footer content — 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {/* Column 1: Mission */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img src="/favicon.png" alt="VeriNews" className="w-6 h-6 rounded" />
                <span className="text-xs font-bold">{t.appName}</span>
                <span className="text-[9px] text-muted-foreground">{t.appSubtitle}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                {t.footerMission}
              </p>
              <p className="text-[9px] text-muted-foreground/60 leading-relaxed">
                {t.footerDisclaimer}
              </p>
            </div>

            {/* Column 2: Links */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold text-foreground/70">{t.footerAbout}</p>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setAboutOpen(true)}
                  className="text-[10px] text-neon hover:underline block"
                >
                  {t.footerAbout}
                </button>
                <button
                  type="button"
                  onClick={() => setMethodologyOpen(true)}
                  className="text-[10px] text-neon hover:underline block"
                >
                  {t.footerMethodology}
                </button>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="text-[10px] text-neon hover:underline block"
                >
                  {t.footerContact}
                </button>
              </div>
            </div>

            {/* Column 3: Community + Ko-fi */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold text-foreground/70">{t.footerCommunity}</p>
              <div className="space-y-1">
                <a
                  href="https://ko-fi.com/verinews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] text-trend hover:underline"
                >
                  <Coffee className="w-3 h-3" />
                  {t.buyCoffee}
                </a>
                <a
                  href="https://ko-fi.com/verinews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] text-alert hover:underline"
                >
                  <Heart className="w-3 h-3" />
                  {t.footerDonate}
                </a>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="flex items-center gap-1.5 text-[10px] text-neon hover:underline"
                >
                  <Lightbulb className="w-3 h-3" />
                  {t.contactSuggest}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Ko-fi floating button */}
      <a
        href="https://ko-fi.com/verinews"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-[150] flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FF5E5B] text-white text-[10px] font-semibold shadow-lg hover:bg-[#e54e4b] transition-colors"
        title={t.supportProject}
      >
        <Coffee className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{t.buyCoffee}</span>
      </a>

      {/* About Modal */}
      <Modal open={aboutOpen} onClose={() => setAboutOpen(false)} title={t.aboutTitle}>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{t.aboutMission}</p>
        <Separator />
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-neon mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">{t.aboutApproach}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{t.aboutApproachDesc}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="w-4 h-4 text-analysis mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">{t.aboutDimensions}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{t.aboutDimensionsDesc}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-trend mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">{t.aboutSources}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{t.aboutSourcesDesc}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <VolumeX className="w-4 h-4 text-alert mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">{t.aboutSilenced}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{t.aboutSilencedDesc}</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Methodology Modal */}
      <Modal open={methodologyOpen} onClose={() => setMethodologyOpen(false)} title={t.footerMethodology}>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-neon mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">1. {t.dimCredibility}</p>
              <p className="text-[10px] text-muted-foreground">Evaluates source reliability, editorial standards, and track record for accuracy.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="w-4 h-4 text-analysis mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">2. {t.dimCoherence}</p>
              <p className="text-[10px] text-muted-foreground">Checks internal logical consistency and whether claims contradict each other.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-trend mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">3. {t.dimCorroboration}</p>
              <p className="text-[10px] text-muted-foreground">Cross-references claims with independent sources across the political spectrum.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <VolumeX className="w-4 h-4 text-alert mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">4. {t.dimSensationalism}</p>
              <p className="text-[10px] text-muted-foreground">Detects manipulative language, emotional appeals, and clickbait techniques.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-neon mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">5. {t.dimAccuracy}</p>
              <p className="text-[10px] text-muted-foreground">Verifies factual claims against established data and scientific consensus.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="w-4 h-4 text-analysis mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">6. {t.dimBias}</p>
              <p className="text-[10px] text-muted-foreground">Identifies framing bias, selection bias, and structural manipulation of narratives.</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title={t.contactTitle}>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{t.contactDesc}</p>
        <Separator />
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 text-neon mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">{t.contactEmail}</p>
              <a href="mailto:contact@verinews.app" className="text-[10px] text-neon hover:underline">contact@verinews.app</a>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MessageCircle className="w-4 h-4 text-analysis mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">{t.contactSocial}</p>
              <p className="text-[10px] text-muted-foreground">@verinews</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-trend mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold">{t.contactSuggest}</p>
              <a href="mailto:sources@verinews.app" className="text-[10px] text-neon hover:underline">sources@verinews.app</a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
