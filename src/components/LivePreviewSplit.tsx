import React from 'react';
import { Radio, Eye, Send, MonitorPlay, Maximize2, ExternalLink } from 'lucide-react';
import { ActiveProjectionState, BibleVerse, DisplaySettings } from '../types';
import { BibleRenderer } from './BibleRenderer';

interface LivePreviewSplitProps {
  state: ActiveProjectionState;
  previewVerse: BibleVerse | null;
  onSendPreviewLive: () => void;
  onOpenFullscreen: () => void;
  onOpenObsWindow: () => void;
  liveCanvasRef: React.RefObject<HTMLDivElement | null>;
}

export const LivePreviewSplit: React.FC<LivePreviewSplitProps> = ({
  state,
  previewVerse,
  onSendPreviewLive,
  onOpenFullscreen,
  onOpenObsWindow,
  liveCanvasRef,
}) => {
  // Construct a preview state object
  const previewState: ActiveProjectionState = {
    ...state,
    currentVerse: previewVerse || state.currentVerse,
    referenceDisplay: previewVerse
      ? `${previewVerse.bookName} ${previewVerse.chapter}:${previewVerse.verse}`
      : state.referenceDisplay,
    isLive: true,
    isBlank: false,
    isBlack: false,
    showLogo: false,
  };

  const isPreviewSameAsLive =
    previewVerse &&
    state.currentVerse &&
    previewVerse.bookId === state.currentVerse.bookId &&
    previewVerse.chapter === state.currentVerse.chapter &&
    previewVerse.verse === state.currentVerse.verse;

  return (
    <div id="studio-mode-split" className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {/* 1. OPERATOR PREVIEW MONITOR */}
      <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="px-3.5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              Monitor Previo (Operador)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {previewVerse && (
              <span className="text-xs font-bold text-amber-300">
                {previewVerse.bookName} {previewVerse.chapter}:{previewVerse.verse}
              </span>
            )}
            <button
              onClick={onSendPreviewLive}
              disabled={!previewVerse || Boolean(isPreviewSameAsLive && state.isLive && !state.isBlank && !state.isBlack)}
              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-black text-xs flex items-center gap-1 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
              title="Lanzar este versículo al aire en OBS"
            >
              <Send className="w-3 h-3" />
              <span>LANZAR A VIVO</span>
            </button>
          </div>
        </div>

        {/* Preview Frame */}
        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
          <BibleRenderer state={previewState} previewMode={true} />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-900/80 border border-blue-500/50 text-[10px] text-blue-200 font-mono font-bold tracking-wider pointer-events-none">
            PREVIEW
          </div>
        </div>

        {/* Footer info */}
        <div className="p-2 bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Selecciona versículos abajo para previsualizar antes de emitir</span>
          <span className="font-mono text-slate-500">RVR1960</span>
        </div>
      </div>

      {/* 2. LIVE PROGRAM / OBS OUTPUT MONITOR */}
      <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="px-3.5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                state.isLive && !state.isBlank && !state.isBlack
                  ? 'bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse'
                  : 'bg-zinc-600'
              }`}
            />
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">
              Salida en Vivo (OBS / Proyección)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenObsWindow}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1"
              title="Abrir ventana OBS Browser Source"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">OBS Popout</span>
            </button>
            <button
              onClick={onOpenFullscreen}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs"
              title="Pantalla Completa (F)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Program Live Output Frame */}
        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
          <BibleRenderer
            renderRef={liveCanvasRef}
            state={state}
            previewMode={true}
          />
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-red-900/80 border border-red-500/50 text-[10px] text-red-200 font-mono font-bold tracking-wider pointer-events-none">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>AL AIRE</span>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="p-2 bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-300 font-bold">
              {state.referenceDisplay || 'Sin pasaje'}
            </span>
            {state.settings.backgroundType === 'transparent' && (
              <span className="text-[10px] text-blue-300 bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-500/30">
                Fondo Transparente OBS
              </span>
            )}
          </div>
          <span className="font-mono text-emerald-400 font-bold">
            60 FPS • Sincronizado
          </span>
        </div>
      </div>
    </div>
  );
};
