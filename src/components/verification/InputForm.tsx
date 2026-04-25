'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Link, ChevronRight } from '@/lib/icons';
import { useI18n } from '@/lib/i18n-context';
import type { InputType } from '@/lib/types';

interface InputFormProps {
  onSubmit: (inputType: InputType, content: string) => void;
  isLoading: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<string>('text');
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [claimContent, setClaimContent] = useState('');

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'text': return textContent;
      case 'url': return urlContent;
      case 'claim': return claimContent;
      default: return '';
    }
  };

  const isInputEmpty = !getCurrentContent().trim();

  const handleSubmit = () => {
    const content = getCurrentContent();
    if (!content.trim()) return;
    onSubmit(activeTab as InputType, content.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && activeTab !== 'text') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden relative">
        {/* Watermark logo — only visible when input is empty */}
        {isInputEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <img
              src="/favicon.png"
              alt=""
              className="w-32 h-32 opacity-[0.04] select-none"
              aria-hidden="true"
            />
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full rounded-none border-b bg-transparent h-auto p-0 relative z-10">
            <TabsTrigger
              value="text"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-neon data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-4 gap-1.5 text-xs cursor-pointer"
              title={t.tooltipTabText}
            >
              <FileText className="w-3.5 h-3.5" />
              {t.tabFullText}
            </TabsTrigger>
            <TabsTrigger
              value="url"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-neon data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-4 gap-1.5 text-xs cursor-pointer"
              title={t.tooltipTabUrl}
            >
              <Link className="w-3.5 h-3.5" />
              {t.tabUrl}
            </TabsTrigger>
            <TabsTrigger
              value="claim"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-neon data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-4 gap-1.5 text-xs cursor-pointer"
              title={t.tooltipTabClaim}
            >
              <Search className="w-3.5 h-3.5" />
              {t.tabClaim}
            </TabsTrigger>
          </TabsList>

          <div className="p-4 relative z-10">
            <TabsContent value="text" className="mt-0">
              <Textarea
                placeholder={t.textPlaceholder}
                className="min-h-[155px] resize-none text-sm"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
              />
            </TabsContent>

            <TabsContent value="url" className="mt-0">
              <Input
                type="url"
                placeholder={t.urlPlaceholder}
                className="h-[56px] text-sm"
                value={urlContent}
                onChange={(e) => setUrlContent(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <p className="text-[10px] text-muted-foreground mt-1">
                {t.urlHint}
              </p>
            </TabsContent>

            <TabsContent value="claim" className="mt-0">
              <Textarea
                placeholder={t.claimPlaceholder}
                className="min-h-[110px] resize-none text-sm"
                value={claimContent}
                onChange={(e) => setClaimContent(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </TabsContent>
          </div>
        </Tabs>

        <div className="px-4 pb-4 relative z-10">
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !getCurrentContent().trim()}
            className="w-full h-11 text-xs font-semibold gap-1.5 bg-neon hover:bg-neon/90 text-deep cursor-pointer"
            title={t.tooltipVerify}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t.verifying}
              </>
            ) : (
              <>
                {t.verifyButton}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="text-center mt-4 mb-4">
        <h2 className="text-lg md:text-xl font-bold">
          {t.verifyAnything}
        </h2>
        <div className="h-2" />
        <p className="text-muted-foreground text-xs md:text-sm">
          {t.inputSubtitle}
        </p>
      </div>
    </div>
  );
}
