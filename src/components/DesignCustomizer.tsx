import React, { useRef } from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  Layout, 
  Sliders, 
  Sparkles, 
  Upload, 
  Check, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Sun,
  Palette,
  Eye
} from 'lucide-react';
import { DisplaySettings, FontFamily, PositionType, TextAlign, TransitionEffect, TextShadowStyle } from '../types';
import { BACKGROUND_PRESETS, LOWER_THIRD_PRESET, DEFAULT_DISPLAY_SETTINGS } from '../data/backgroundPresets';

interface DesignCustomizerProps {
  settings: DisplaySettings;
  onChangeSettings: (newSettings: DisplaySettings) => void;
}

export const DesignCustomizer: React.FC<DesignCustomizerProps> = ({
  settings,
  onChangeSettings,
}) => {
  const [activeTab, setActiveTab] = React.useState<'layout' | 'typography' | 'background' | 'transitions'>('layout');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateSetting = <K extends keyof DisplaySettings>(key: K, value: DisplaySettings[K]) => {
    onChangeSettings({
      ...settings,
      [key]: value,
    });
  };

  const fonts: { id: FontFamily; name: string; styleName: string }[] = [
    { id: 'Cinzel', name: 'Cinzel (Solemne Clásica)', styleName: 'font-[\'Cinzel\']' },
    { id: 'Playfair Display', name: 'Playfair Display (Elegante Serif)', styleName: 'font-[\'Playfair_Display\']' },
    { id: 'Montserrat', name: 'Montserrat (Moderna Geométrica)', styleName: 'font-[\'Montserrat\']' },
    { id: 'Outfit', name: 'Outfit (Limpia & Minimalista)', styleName: 'font-[\'Outfit\']' },
    { id: 'Roboto Slab', name: 'Roboto Slab (Robusta para Video)', styleName: 'font-[\'Roboto_Slab\']' },
    { id: 'Merriweather', name: 'Merriweather (Lectura Cálida)', styleName: 'font-[\'Merriweather\']' },
    { id: 'Lora', name: 'Lora (Editorial Fina)', styleName: 'font-[\'Lora\']' },
    { id: 'EB Garamond', name: 'EB Garamond (Tradicional Litúrgica)', styleName: 'font-[\'EB_Garamond\']' },
    { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans (Ultra Nítida)', styleName: 'font-[\'Plus_Jakarta_Sans\']' },
  ];

  const positions: { id: PositionType; label: string; desc: string }[] = [
    { id: 'lower-third', label: 'Lower Third (Tercio Inferior)', desc: 'Ideal para colocar sobre cámara en OBS' },
    { id: 'center', label: 'Centro (Predicación)', desc: 'Centrado completo en pantalla' },
    { id: 'top', label: 'Barra Superior (Top)', desc: 'Encabezado superior sobre stream' },
    { id: 'bottom-bar', label: 'Cintillo Inferior Completo', desc: 'Barra horizontal de lado a lado' },
    { id: 'floating-card', label: 'Tarjeta Flotante', desc: 'Caja flotante con bordes suaves' },
    { id: 'fullscreen', label: 'Pantalla Completa', desc: 'Ocupa todo el monitor' },
  ];

  const transitions: { id: TransitionEffect; label: string }[] = [
    { id: 'slide-up', label: 'Deslizar Arriba (Slide Up)' },
    { id: 'fade', label: 'Desvanecer (Fade)' },
    { id: 'slide-side', label: 'Deslizar Lateral' },
    { id: 'zoom', label: 'Zoom / Escala' },
    { id: 'flip', label: 'Volteo 3D' },
    { id: 'blur', label: 'Enfoque Suave (Blur)' },
    { id: 'cut', label: 'Corte Directo (Instantáneo)' },
  ];

  const shadowStyles: { id: TextShadowStyle; label: string; desc: string }[] = [
    { id: 'outline', label: 'Borde Negro Contorno', desc: 'Máxima legibilidad sobre cualquier video' },
    { id: 'soft', label: 'Sombra Suave', desc: 'Discreta y natural' },
    { id: 'strong', label: 'Sombra Profunda', desc: 'Contraste elevado' },
    { id: 'glow', label: 'Resplandor Dorado', desc: 'Brillo ceremonial' },
    { id: 'none', label: 'Sin Sombra', desc: 'Texto plano' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChangeSettings({
            ...settings,
            backgroundType: 'image',
            bgImageUrl: event.target.result as string,
            bgImageOpacity: 0.85,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPreset = (presetName: 'obs-lower-third' | 'full-worship' | 'dark-minimal' | 'gold-cathedral') => {
    switch (presetName) {
      case 'obs-lower-third':
        onChangeSettings({
          ...LOWER_THIRD_PRESET,
        });
        break;
      case 'full-worship':
        onChangeSettings({
          ...DEFAULT_DISPLAY_SETTINGS,
          position: 'center',
          backgroundType: 'gradient',
          gradientPreset: 'linear-gradient(135deg, #0a1128 0%, #1c1f3b 50%, #080710 100%)',
          fontSize: 36,
        });
        break;
      case 'gold-cathedral':
        onChangeSettings({
          ...DEFAULT_DISPLAY_SETTINGS,
          position: 'center',
          fontFamily: 'Cinzel',
          textColor: '#fef08a',
          boxBorderColor: '#eab308',
          backgroundType: 'gradient',
          gradientPreset: 'radial-gradient(ellipse at top, #2b1f07 0%, #140d04 50%, #050301 100%)',
          fontSize: 34,
        });
        break;
      case 'dark-minimal':
        onChangeSettings({
          ...DEFAULT_DISPLAY_SETTINGS,
          position: 'center',
          fontFamily: 'Outfit',
          textColor: '#ffffff',
          boxBgColor: '#000000',
          boxBgOpacity: 0.8,
          backgroundType: 'solid',
          backgroundColor: '#090a0f',
          fontSize: 32,
        });
        break;
    }
  };

  return (
    <div id="design-customizer-panel" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col h-full shadow-lg">
      {/* Header & Quick Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5 font-['Outfit']">
            <Palette className="w-4 h-4 text-amber-400" />
            Personalización Visual & OBS
          </h2>
          <p className="text-[11px] text-slate-400">
            Ajusta fuentes, fondos, transparencias, opacidad y posición
          </p>
        </div>

        {/* Quick Style Presets */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => applyPreset('obs-lower-third')}
            className="px-2 py-1 rounded-md bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 text-[11px] font-bold whitespace-nowrap"
            title="Preconfiguración de Lower Third transparente para OBS"
          >
            ⚡ Lower Third OBS
          </button>
          <button
            onClick={() => applyPreset('full-worship')}
            className="px-2 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/30 text-[11px] font-bold whitespace-nowrap"
          >
            ⛪ Culto Pro
          </button>
          <button
            onClick={() => applyPreset('gold-cathedral')}
            className="px-2 py-1 rounded-md bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300 border border-yellow-500/30 text-[11px] font-bold whitespace-nowrap"
          >
            ✨ Dorado
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 mb-3 text-xs">
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'layout'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>Ubicación & Caja</span>
        </button>

        <button
          onClick={() => setActiveTab('typography')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'typography'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Fuente & Opacidad</span>
        </button>

        <button
          onClick={() => setActiveTab('background')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'background'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Fondos & OBS</span>
        </button>

        <button
          onClick={() => setActiveTab('transitions')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'transitions'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Transición</span>
        </button>
      </div>

      {/* Tab 1: Layout & Position */}
      {activeTab === 'layout' && (
        <div className="space-y-3.5 overflow-y-auto pr-1 flex-1 max-h-[300px]">
          {/* Position Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">
              Posición del Versículo en Pantalla
            </label>
            <div className="grid grid-cols-2 gap-2">
              {positions.map((pos) => {
                const isSelected = settings.position === pos.id;
                return (
                  <button
                    key={pos.id}
                    onClick={() => updateSetting('position', pos.id)}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm font-bold'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="text-xs">{pos.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                      {pos.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Alignment */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">
              Alineación del Texto
            </label>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => updateSetting('textAlign', 'left')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 text-xs font-semibold ${
                  settings.textAlign === 'left' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Izquierda</span>
              </button>
              <button
                onClick={() => updateSetting('textAlign', 'center')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 text-xs font-semibold ${
                  settings.textAlign === 'center' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
                <span>Centro</span>
              </button>
              <button
                onClick={() => updateSetting('textAlign', 'right')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 text-xs font-semibold ${
                  settings.textAlign === 'right' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <AlignRight className="w-3.5 h-3.5" />
                <span>Derecha</span>
              </button>
              <button
                onClick={() => updateSetting('textAlign', 'justify')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 text-xs font-semibold ${
                  settings.textAlign === 'justify' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <AlignJustify className="w-3.5 h-3.5" />
                <span>Justificado</span>
              </button>
            </div>
          </div>

          {/* Box Container Background Settings */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={settings.showBoxBackground}
                  onChange={(e) => updateSetting('showBoxBackground', e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span>Caja de Fondo con Desenfoque (Glassmorphism)</span>
              </label>
              <span className="text-[10px] text-amber-400 font-mono">
                {Math.round(settings.boxBgOpacity * 100)}%
              </span>
            </div>

            {settings.showBoxBackground && (
              <div className="space-y-2 pt-1 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-[11px] text-slate-400 mb-1 flex justify-between">
                      <span>Opacidad de la caja</span>
                      <span>{Math.round(settings.boxBgOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={settings.boxBgOpacity}
                      onChange={(e) => updateSetting('boxBgOpacity', parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="text-[11px] text-slate-400 mb-1 flex justify-between">
                      <span>Redondeo de esquinas</span>
                      <span>{settings.boxBorderRadius}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="32"
                      step="2"
                      value={settings.boxBorderRadius}
                      onChange={(e) => updateSetting('boxBorderRadius', parseInt(e.target.value, 10))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-[11px] text-slate-400 mb-1 flex justify-between">
                      <span>Ancho máximo</span>
                      <span>{settings.maxWidth}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      step="2"
                      value={settings.maxWidth}
                      onChange={(e) => updateSetting('maxWidth', parseInt(e.target.value, 10))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <label className="text-[11px] text-slate-400 flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.boxBorder}
                        onChange={(e) => updateSetting('boxBorder', e.target.checked)}
                        className="rounded bg-slate-900 border-slate-700 text-amber-500"
                      />
                      <span>Borde elegante</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Typography & Opacity */}
      {activeTab === 'typography' && (
        <div className="space-y-3.5 overflow-y-auto pr-1 flex-1 max-h-[300px]">
          {/* Font Family Selection */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">
              Tipo de Fuente Tipográfica
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {fonts.map((f) => {
                const isSelected = settings.fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => updateSetting('fontFamily', f.id)}
                    style={{ fontFamily: f.id }}
                    className={`p-2 rounded-xl text-left border transition-all text-xs flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <span>{f.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Size & Text Opacity Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold mb-1">
                <span>Tamaño del Versículo</span>
                <span className="text-amber-400 font-mono">{settings.fontSize}px</span>
              </div>
              <input
                type="range"
                min="18"
                max="64"
                step="1"
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', parseInt(e.target.value, 10))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold mb-1">
                <span>Opacidad del Texto</span>
                <span className="text-amber-400 font-mono">{Math.round(settings.textOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={settings.textOpacity}
                onChange={(e) => updateSetting('textOpacity', parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold mb-1">
                <span>Tamaño de Referencia</span>
                <span className="text-amber-400 font-mono">{settings.refFontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="32"
                step="1"
                value={settings.refFontSize}
                onChange={(e) => updateSetting('refFontSize', parseInt(e.target.value, 10))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold mb-1">
                <span>Interlineado (Altura)</span>
                <span className="text-amber-400 font-mono">{settings.lineHeight}x</span>
              </div>
              <input
                type="range"
                min="1.1"
                max="2.0"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* Text Shadow & Outline for live video readability */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">
              Contorno & Sombra de Texto (Recomendado para Transmisión)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {shadowStyles.map((s) => {
                const isSelected = settings.textShadow === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => updateSetting('textShadow', s.id)}
                    className={`p-2 rounded-xl text-left border text-xs transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div>{s.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Formatting Toggles */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => updateSetting('isBold', !settings.isBold)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                settings.isBold ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Negrita (B)
            </button>
            <button
              onClick={() => updateSetting('isItalic', !settings.isItalic)}
              className={`px-3 py-1.5 rounded-lg text-xs italic border transition-all ${
                settings.isItalic ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Cursiva (I)
            </button>
            <button
              onClick={() => updateSetting('isUppercase', !settings.isUppercase)}
              className={`px-3 py-1.5 rounded-lg text-xs uppercase border transition-all ${
                settings.isUppercase ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Mayúsculas (AA)
            </button>
            <button
              onClick={() => updateSetting('showQuotes', !settings.showQuotes)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                settings.showQuotes ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Comillas “ ”
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Backgrounds & OBS Transparency */}
      {activeTab === 'background' && (
        <div className="space-y-3.5 overflow-y-auto pr-1 flex-1 max-h-[300px]">
          {/* Transparent OBS Banner */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/40 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Modo Fondo Transparente (OBS Studio)
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Permite que la cámara del stream se vea detrás del versículo
              </p>
            </div>
            <button
              onClick={() => {
                onChangeSettings({
                  ...settings,
                  backgroundType: 'transparent',
                  backgroundColor: 'transparent',
                  gradientPreset: 'transparent',
                });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                settings.backgroundType === 'transparent'
                  ? 'bg-blue-500 text-white font-black ring-2 ring-blue-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {settings.backgroundType === 'transparent' ? '✓ ACTIVO' : 'ACTIVAR'}
            </button>
          </div>

          {/* Upload Custom Image */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Subir Imagen de Fondo Personalizada</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm"
              >
                <Upload className="w-3 h-3" />
                Examinar...
              </button>
            </div>

            {settings.backgroundType === 'image' && settings.bgImageUrl && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                    <img src={settings.bgImageUrl} alt="Background" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Opacidad de la Imagen</span>
                      <span className="font-mono text-amber-400">{Math.round(settings.bgImageOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={settings.bgImageOpacity}
                      onChange={(e) => updateSetting('bgImageOpacity', parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Desenfoque (Blur de fondo)</span>
                  <span className="font-mono text-amber-400">{settings.bgBlur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={settings.bgBlur}
                  onChange={(e) => updateSetting('bgBlur', parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500"
                />
              </div>
            )}
          </div>

          {/* Curated Background Gallery */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">
              Fondos & Gradientes de Adoración Preconfigurados
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BACKGROUND_PRESETS.map((bg) => {
                const isSelected =
                  settings.backgroundType === bg.type &&
                  (bg.type === 'image' ? settings.bgImageUrl === bg.value : settings.gradientPreset === bg.value);

                return (
                  <button
                    key={bg.id}
                    onClick={() => {
                      if (bg.value === 'transparent') {
                        onChangeSettings({
                          ...settings,
                          backgroundType: 'transparent',
                          backgroundColor: 'transparent',
                          gradientPreset: 'transparent',
                        });
                      } else if (bg.type === 'image') {
                        onChangeSettings({
                          ...settings,
                          backgroundType: 'image',
                          bgImageUrl: bg.value,
                          bgImageOpacity: 0.45,
                        });
                      } else {
                        onChangeSettings({
                          ...settings,
                          backgroundType: 'gradient',
                          gradientPreset: bg.value,
                        });
                      }
                    }}
                    className={`h-16 rounded-xl overflow-hidden relative border transition-all text-left p-2 flex flex-col justify-end ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-md scale-102'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                    style={{
                      background: bg.type === 'gradient' ? bg.value : undefined,
                      backgroundImage: bg.type === 'image' ? `url(${bg.thumbnail || bg.value})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    <span className="relative z-10 text-[11px] font-bold text-white drop-shadow truncate">
                      {bg.name}
                    </span>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-bold z-20">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Transitions */}
      {activeTab === 'transitions' && (
        <div className="space-y-3.5 overflow-y-auto pr-1 flex-1 max-h-[300px]">
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">
              Efecto de Transición entre Versículos
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {transitions.map((t) => {
                const isSelected = settings.transitionEffect === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => updateSetting('transitionEffect', t.id)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span>{t.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
              <span>Velocidad de la Animación</span>
              <span className="text-amber-400 font-mono">{settings.transitionDuration}s</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.05"
              value={settings.transitionDuration}
              onChange={(e) => updateSetting('transitionDuration', parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Rápido (0.1s)</span>
              <span>Recomendado (0.45s)</span>
              <span>Suave (1.5s)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
