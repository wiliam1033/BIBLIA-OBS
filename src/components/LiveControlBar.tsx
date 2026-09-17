import React from 'react';
import { Radio, EyeOff, Moon, Image as ImageIcon, ExternalLink, Maximize2, Download, HelpCircle } from 'lucide-react';
import { ActiveProjectionState } from '../types';

interface LiveControlBarProps {
  state: ActiveProjectionState;
  onToggleLive: () => void;
  onToggleBlank: () => void;
  onToggleBlack: () => void;
  onToggleLogo: () => void;
  onOpenObsWindow: () => void;
  onOpenFullscreen: () => void;
  onOpenExportModal: () => void;
  onOpenObsGuide: () => void;
}

export const LiveControlBar: React.FC<LiveControlBarProps> = ({
  state,
  onToggleLive,
  onToggleBlank,
  onToggleBlack,
  onToggleLogo,
  onOpenObsWindow,
  onOpenFullscreen,
  onOpenExportModal,
  onOpenObsGuide,
}) => {
  const { isLive, isBlank, isBlack, showLogo } = state;

  return (
    <div id="master-live-control-bar" className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 shadow-xl">
      {/* Brand & Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
            <span className="font-serif font-black text-slate-950 text-sm">✝</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5 font-['Outfit']">
              Biblia RVR 1960 Pro
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                OBS LIVE
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Control Maestro de Proyección & Transmisión
            </p>
          </div>
        </div>

        {/* Live Indicator Pill */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isLive && !isBlank && !isBlack
                ? 'bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse'
                : 'bg-slate-600'
            }`}
          />
          <span className="text-xs font-bold font-mono tracking-wider text-slate-200">
            {isBlack ? 'BLACKOUT' : isBlank ? 'PAUSA (BLANK)' : isLive ? 'AL AIRE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Primary Broadcasting Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {/* Toggle Live */}
        <button
          id="btn-toggle-live"
          onClick={onToggleLive}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
            isLive && !isBlank && !isBlack
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/30 ring-2 ring-red-400'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
          }`}
          title="Activar / Desactivar transmisión del versículo"
        >
          <Radio className={`w-3.5 h-3.5 ${isLive ? 'animate-spin' : ''}`} />
          <span>{isLive ? 'EN VIVO' : 'TRANSMITIR'}</span>
        </button>

        {/* Blank Button (hide text, keep transparent canvas) */}
        <button
          id="btn-toggle-blank"
          onClick={onToggleBlank}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border active:scale-95 ${
            isBlank
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
              : 'bg-slate-800/90 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
          title="Ocultar texto temporalmente (manteniendo fondo transparente en OBS)"
        >
          <EyeOff className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">OCULTAR (BLANK)</span>
        </button>

        {/* Blackout Button */}
        <button
          id="btn-toggle-black"
          onClick={onToggleBlack}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border active:scale-95 ${
            isBlack
              ? 'bg-zinc-100 text-slate-950 border-white shadow-md font-black'
              : 'bg-slate-800/90 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
          title="Pantalla Negra Total"
        >
          <Moon className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">NEGRO</span>
        </button>

        {/* Logo Card Button */}
        <button
          id="btn-toggle-logo"
          onClick={onToggleLogo}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border active:scale-95 ${
            showLogo
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
              : 'bg-slate-800/90 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
          title="Mostrar Logo de Iglesia o Portada"
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">LOGO</span>
        </button>

        <div className="h-5 w-px bg-slate-800 mx-1 hidden sm:block" />

        {/* Export Slides */}
        <button
          id="btn-open-export"
          onClick={onOpenExportModal}
          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          title="Exportar diapositivas a PowerPoint (PPTX), PNG o JPEG"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden lg:inline">Exportar Diapositivas</span>
        </button>

        {/* OBS Overlay Window Link */}
        <button
          id="btn-open-obs-window"
          onClick={onOpenObsWindow}
          className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all active:scale-95"
          title="Abrir Ventana / Fuente de Navegador para OBS Studio"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Overlay OBS</span>
        </button>

        {/* Fullscreen Proyector Button */}
        <button
          id="btn-open-fullscreen"
          onClick={onOpenFullscreen}
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-all"
          title="Pantalla Completa en Segundo Monitor / Proyector (F)"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* OBS Guide Button */}
        <button
          id="btn-open-obs-guide"
          onClick={onOpenObsGuide}
          className="p-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1"
          title="Guía de Instalación en OBS Studio y Plugin"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden xl:inline text-[11px]">Guía OBS</span>
        </button>
      </div>
    </div>
  );
};
