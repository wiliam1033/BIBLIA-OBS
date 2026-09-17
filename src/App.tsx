/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  BookOpen, 
  Palette, 
  Star, 
  Tv, 
  Layers, 
  Sparkles, 
  Search, 
  Maximize2,
  ExternalLink,
  ChevronRight,
  Sliders,
  Radio,
  Bookmark
} from 'lucide-react';
import { 
  ActiveProjectionState, 
  BibleVerse, 
  BibleBook, 
  DisplaySettings 
} from './types';
import { BIBLE_BOOKS, getVerseText } from './data/bibleData';
import { DEFAULT_DISPLAY_SETTINGS, LOWER_THIRD_PRESET } from './data/backgroundPresets';
import { broadcastService } from './services/broadcastService';
import { BibleRenderer } from './components/BibleRenderer';
import { ObsOverlayView } from './components/ObsOverlayView';
import { QuickSearchBar } from './components/QuickSearchBar';
import { ChapterVersesBar } from './components/ChapterVersesBar';
import { BibleBookNavigator } from './components/BibleBookNavigator';
import { LiveControlBar } from './components/LiveControlBar';
import { LivePreviewSplit } from './components/LivePreviewSplit';
import { DesignCustomizer } from './components/DesignCustomizer';
import { FavoritesAndPlaylists } from './components/FavoritesAndPlaylists';
import { ExportSlidesModal } from './components/ExportSlidesModal';
import { ObsGuideModal } from './components/ObsGuideModal';
import { FullscreenDisplayModal } from './components/FullscreenDisplayModal';

export default function App() {
  // Check if running in dedicated OBS overlay mode via query param or hash
  const [isObsOverlayMode, setIsObsOverlayMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('overlay') === 'true' || window.location.hash === '#overlay';
    }
    return false;
  });

  // Master Projection State
  const [state, setState] = useState<ActiveProjectionState>(() => broadcastService.getInitialState());

  // Preview Verse (operator preview before sending live)
  const [previewVerse, setPreviewVerse] = useState<BibleVerse | null>(() => state.currentVerse);

  // Navigation selection state
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(() => 
    BIBLE_BOOKS.find(b => b.id === (state.currentVerse?.bookId || 'JHN')) || BIBLE_BOOKS[42]
  );
  const [selectedChapter, setSelectedChapter] = useState<number>(() => state.currentVerse?.chapter || 3);
  const [selectedVerse, setSelectedVerse] = useState<number>(() => state.currentVerse?.verse || 16);

  // Modals state
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isObsGuideOpen, setIsObsGuideOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  // Right Column Tab
  const [rightPanelTab, setRightPanelTab] = useState<'design' | 'favorites' | 'books'>('design');

  const liveCanvasRef = useRef<HTMLDivElement | null>(null);

  // Sync state changes with broadcast channel
  const updateStateAndBroadcast = useCallback((updater: (prev: ActiveProjectionState) => ActiveProjectionState) => {
    setState((prev) => {
      const next = updater(prev);
      broadcastService.broadcastState(next);
      return next;
    });
  }, []);

  // Listen for broadcast updates if another operator or window changes state
  useEffect(() => {
    const unsubscribe = broadcastService.subscribe((incomingState) => {
      setState(incomingState);
    });
    return () => unsubscribe();
  }, []);

  // Handler to select and optionally project verse immediately
  const handleSelectVerse = (verse: BibleVerse, sendLiveImmediately: boolean = false) => {
    setPreviewVerse(verse);
    setSelectedChapter(verse.chapter);
    setSelectedVerse(verse.verse);

    const bookObj = BIBLE_BOOKS.find(b => b.id === verse.bookId) || selectedBook;
    if (bookObj) {
      setSelectedBook(bookObj);
    }

    if (sendLiveImmediately) {
      updateStateAndBroadcast((prev) => ({
        ...prev,
        currentVerse: verse,
        referenceDisplay: `${verse.bookName} ${verse.chapter}:${verse.verse}`,
        isLive: true,
        isBlank: false,
        isBlack: false,
        showLogo: false,
        timestamp: Date.now(),
      }));
    }
  };

  // Handler for previewing a verse without going live
  const handlePreviewVerse = (verse: BibleVerse) => {
    setPreviewVerse(verse);
    setSelectedChapter(verse.chapter);
    setSelectedVerse(verse.verse);
    const bookObj = BIBLE_BOOKS.find(b => b.id === verse.bookId);
    if (bookObj) setSelectedBook(bookObj);
  };

  // Handler to take current preview to LIVE Program
  const handleSendPreviewLive = () => {
    if (!previewVerse) return;
    updateStateAndBroadcast((prev) => ({
      ...prev,
      currentVerse: previewVerse,
      referenceDisplay: `${previewVerse.bookName} ${previewVerse.chapter}:${previewVerse.verse}`,
      isLive: true,
      isBlank: false,
      isBlack: false,
      showLogo: false,
      timestamp: Date.now(),
    }));
  };

  // Settings change handler
  const handleChangeSettings = (newSettings: DisplaySettings) => {
    updateStateAndBroadcast((prev) => ({
      ...prev,
      settings: newSettings,
      timestamp: Date.now(),
    }));
    broadcastService.saveSettings(newSettings);
  };

  // Toggle Live Panic Handlers
  const handleToggleLive = () => {
    updateStateAndBroadcast((prev) => ({
      ...prev,
      isLive: !prev.isLive,
      isBlank: false,
      isBlack: false,
      timestamp: Date.now(),
    }));
  };

  const handleToggleBlank = () => {
    updateStateAndBroadcast((prev) => ({
      ...prev,
      isBlank: !prev.isBlank,
      isBlack: false,
      timestamp: Date.now(),
    }));
  };

  const handleToggleBlack = () => {
    updateStateAndBroadcast((prev) => ({
      ...prev,
      isBlack: !prev.isBlack,
      timestamp: Date.now(),
    }));
  };

  const handleToggleLogo = () => {
    updateStateAndBroadcast((prev) => ({
      ...prev,
      showLogo: !prev.showLogo,
      isBlank: false,
      isBlack: false,
      timestamp: Date.now(),
    }));
  };

  // Open OBS Popout Window
  const handleOpenObsWindow = () => {
    const url = `${window.location.origin}/?overlay=true`;
    window.open(url, 'BibleObsOverlay', 'width=1280,height=720,toolbar=no,location=no,status=no,menubar=no,scrollbars=no');
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    if (isObsOverlayMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handleToggleBlank();
      } else if (e.key === 'b' || e.key === 'B') {
        handleToggleBlack();
      } else if (e.key === 'l' || e.key === 'L') {
        handleToggleLive();
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreenOpen(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        // Next verse
        if (state.currentVerse) {
          const nextV = state.currentVerse.verse + 1;
          const text = getVerseText(state.currentVerse.bookId, state.currentVerse.chapter, nextV);
          handleSelectVerse({
            bookId: state.currentVerse.bookId,
            bookName: state.currentVerse.bookName,
            chapter: state.currentVerse.chapter,
            verse: nextV,
            text,
          }, true);
        }
      } else if (e.key === 'ArrowLeft') {
        // Prev verse
        if (state.currentVerse && state.currentVerse.verse > 1) {
          const prevV = state.currentVerse.verse - 1;
          const text = getVerseText(state.currentVerse.bookId, state.currentVerse.chapter, prevV);
          handleSelectVerse({
            bookId: state.currentVerse.bookId,
            bookName: state.currentVerse.bookName,
            chapter: state.currentVerse.chapter,
            verse: prevV,
            text,
          }, true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.currentVerse, isObsOverlayMode]);

  // If in OBS Overlay Mode, render clean transparent overlay only
  if (isObsOverlayMode) {
    return <ObsOverlayView />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black font-['Plus_Jakarta_Sans']">
      {/* 1. MASTER LIVE CONTROL BAR */}
      <LiveControlBar
        state={state}
        onToggleLive={handleToggleLive}
        onToggleBlank={handleToggleBlank}
        onToggleBlack={handleToggleBlack}
        onToggleLogo={handleToggleLogo}
        onOpenObsWindow={handleOpenObsWindow}
        onOpenFullscreen={() => setIsFullscreenOpen(true)}
        onOpenExportModal={() => setIsExportOpen(true)}
        onOpenObsGuide={() => setIsObsGuideOpen(true)}
      />

      {/* 2. MAIN OPERATOR STUDIO CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 space-y-4">
        {/* Quick Search & Instant Jump Section */}
        <QuickSearchBar
          onSelectVerse={handleSelectVerse}
          onPreviewVerse={handlePreviewVerse}
          activeVerse={state.currentVerse}
        />

        {/* Dual-Monitor Studio Split View (Preview vs Live Program) */}
        <LivePreviewSplit
          state={state}
          previewVerse={previewVerse}
          onSendPreviewLive={handleSendPreviewLive}
          onOpenFullscreen={() => setIsFullscreenOpen(true)}
          onOpenObsWindow={handleOpenObsWindow}
          liveCanvasRef={liveCanvasRef}
        />

        {/* Live Chapter Verses Fast Switcher (1, 2, 3, 4, 5...) */}
        <ChapterVersesBar
          currentVerse={previewVerse || state.currentVerse}
          onSelectVerse={handleSelectVerse}
          autoLiveOnChange={state.isLive}
        />

        {/* Primary Control Columns: Left Navigator & Right Customizer/Favorites */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: Bible Books & Chapters Navigator (5 Cols) */}
          <div className="lg:col-span-5 h-[480px]">
            <BibleBookNavigator
              onSelectVerse={handleSelectVerse}
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              selectedVerse={selectedVerse}
              onBookChange={(b) => setSelectedBook(b)}
              onChapterChange={(ch) => setSelectedChapter(ch)}
            />
          </div>

          {/* Right Column: Multi-Tab Panel for Design Customizer & Favorites/Playlists (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col h-[480px]">
            {/* Tab Header */}
            <div className="flex items-center gap-2 mb-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setRightPanelTab('design')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  rightPanelTab === 'design'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Diseño, Fuentes & OBS</span>
              </button>

              <button
                onClick={() => setRightPanelTab('favorites')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  rightPanelTab === 'favorites'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Favoritos & Orden de Culto</span>
              </button>
            </div>

            {/* Tab Views */}
            <div className="flex-1 min-h-0">
              {rightPanelTab === 'design' ? (
                <DesignCustomizer
                  settings={state.settings}
                  onChangeSettings={handleChangeSettings}
                />
              ) : (
                <FavoritesAndPlaylists
                  currentVerse={previewVerse || state.currentVerse}
                  onSelectVerse={handleSelectVerse}
                  onPreviewVerse={handlePreviewVerse}
                />
              )}
            </div>
          </div>
        </div>

        {/* Quick Keyboard Hotkeys Helper Bar */}
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">Atajos de Teclado:</span>
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono text-[11px] text-amber-300">[Espacio] Pausa/Blank</span>
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono text-[11px] text-amber-300">[B] Blackout</span>
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono text-[11px] text-amber-300">[L] En Vivo</span>
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono text-[11px] text-amber-300">[← / →] Versículo Ant/Sig</span>
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono text-[11px] text-amber-300">[F] Pantalla Completa</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Biblia Reina Valera 1960 • Compatible con OBS Studio v28+ & Navegador
          </div>
        </div>
      </main>

      {/* Modals */}
      <ExportSlidesModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        state={state}
        renderTargetRef={liveCanvasRef}
      />

      <ObsGuideModal
        isOpen={isObsGuideOpen}
        onClose={() => setIsObsGuideOpen(false)}
      />

      <FullscreenDisplayModal
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        state={state}
      />
    </div>
  );
}
