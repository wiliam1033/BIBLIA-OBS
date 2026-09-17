import React from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { ActiveProjectionState, DisplaySettings } from '../types';

interface BibleRendererProps {
  state: ActiveProjectionState;
  overrideSettings?: DisplaySettings;
  previewMode?: boolean; // if in small preview card
  containerClassName?: string;
  renderRef?: React.RefObject<HTMLDivElement | null>;
}

export const BibleRenderer: React.FC<BibleRendererProps> = ({
  state,
  overrideSettings,
  previewMode = false,
  containerClassName = '',
  renderRef
}) => {
  const settings = overrideSettings || state.settings;
  const { currentVerse, isLive, isBlank, isBlack, showLogo, referenceDisplay } = state;

  // Calculate text shadow string based on selected text shadow style
  const getTextShadowStyle = () => {
    switch (settings.textShadow) {
      case 'none':
        return 'none';
      case 'soft':
        return '0 2px 8px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.9)';
      case 'strong':
        return '0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.9)';
      case 'outline':
        return '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 3px 12px rgba(0,0,0,0.85)';
      case 'glow':
        return '0 0 15px rgba(234, 179, 8, 0.6), 0 2px 8px rgba(0,0,0,0.9)';
      default:
        return '0 2px 10px rgba(0, 0, 0, 0.8)';
    }
  };

  // Transition variants
  const getVariants = (): Variants => {
    const duration = settings.transitionDuration || 0.4;
    switch (settings.transitionEffect) {
      case 'cut':
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1, transition: { duration: 0.01 } },
          exit: { opacity: 0, transition: { duration: 0.01 } },
        };
      case 'slide-up':
        return {
          initial: { opacity: 0, y: 35, scale: 0.98 },
          animate: { opacity: 1, y: 0, scale: 1, transition: { duration, ease: 'easeOut' } },
          exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: duration * 0.7 } },
        };
      case 'slide-side':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0, transition: { duration, ease: 'easeOut' } },
          exit: { opacity: 0, x: 50, transition: { duration: duration * 0.7 } },
        };
      case 'zoom':
        return {
          initial: { opacity: 0, scale: 0.88 },
          animate: { opacity: 1, scale: 1, transition: { duration, ease: 'easeOut' } },
          exit: { opacity: 0, scale: 1.08, transition: { duration: duration * 0.7 } },
        };
      case 'flip':
        return {
          initial: { opacity: 0, rotateX: 60, y: 20 },
          animate: { opacity: 1, rotateX: 0, y: 0, transition: { duration, ease: 'easeOut' } },
          exit: { opacity: 0, rotateX: -60, y: -20, transition: { duration: duration * 0.7 } },
        };
      case 'blur':
        return {
          initial: { opacity: 0, filter: 'blur(12px)' },
          animate: { opacity: 1, filter: 'blur(0px)', transition: { duration } },
          exit: { opacity: 0, filter: 'blur(8px)', transition: { duration: duration * 0.7 } },
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration } },
          exit: { opacity: 0, transition: { duration: duration * 0.7 } },
        };
    }
  };

  // Scale factor for preview cards vs full screen
  const fontScale = previewMode ? 0.6 : 1;
  const responsiveFontSize = Math.max(14, Math.round(settings.fontSize * fontScale));
  const responsiveRefSize = Math.max(12, Math.round(settings.refFontSize * fontScale));
  const responsivePadding = Math.max(12, Math.round(settings.boxPadding * fontScale));

  // Determine Background CSS
  const getBackgroundStyle = (): React.CSSProperties => {
    if (isBlack) return { backgroundColor: '#000000' };
    if (settings.backgroundType === 'transparent') {
      return { backgroundColor: 'transparent' };
    }
    if (settings.backgroundType === 'gradient') {
      return { background: settings.gradientPreset || settings.backgroundColor };
    }
    if (settings.backgroundType === 'solid') {
      return { backgroundColor: settings.backgroundColor };
    }
    if (settings.backgroundType === 'image' || settings.backgroundType === 'curated') {
      return {
        backgroundImage: settings.bgImageUrl ? `url(${settings.bgImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return { backgroundColor: '#0a1128' };
  };

  // Position containers
  const getPositionClasses = () => {
    switch (settings.position) {
      case 'lower-third':
        return 'items-end justify-center pb-6 md:pb-12 px-4 md:px-12';
      case 'top':
        return 'items-start justify-center pt-6 md:pt-12 px-4 md:px-12';
      case 'fullscreen':
        return 'items-center justify-center p-6 md:p-14';
      case 'bottom-bar':
        return 'items-end justify-center pb-0 px-0';
      case 'floating-card':
        return 'items-center justify-center p-4 md:p-8';
      case 'center':
      default:
        return 'items-center justify-center p-6 md:p-12';
    }
  };

  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }[settings.textAlign || 'center'];

  const variants = getVariants();

  return (
    <div
      ref={renderRef}
      id="bible-projection-canvas"
      style={getBackgroundStyle()}
      className={`relative w-full h-full overflow-hidden flex flex-col select-none transition-colors duration-300 ${getPositionClasses()} ${containerClassName}`}
    >
      {/* Background Image Overlay with Opacity & Blur */}
      {(settings.backgroundType === 'image' || settings.backgroundType === 'curated') && settings.bgImageUrl && !isBlack && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{
            backgroundImage: `url(${settings.bgImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: settings.bgImageOpacity,
            filter: `blur(${settings.bgBlur}px)`,
            transform: 'scale(1.05)', // Prevent blur edge artifacts
          }}
        />
      )}

      {/* Dim overlay for non-transparent backgrounds to enhance contrast */}
      {settings.backgroundType !== 'transparent' && !isBlack && (
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      )}

      {/* Blackout State */}
      {isBlack && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
          {previewMode && <span className="text-zinc-600 text-xs tracking-widest uppercase font-mono">[BLACKOUT]</span>}
        </div>
      )}

      {/* Blank / Hidden State */}
      {isBlank && !isBlack && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          {previewMode && <span className="text-zinc-500/70 text-xs tracking-widest uppercase font-mono bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-700">[EN PAUSA - BLANK]</span>}
        </div>
      )}

      {/* Logo State */}
      {showLogo && !isBlack && !isBlank && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative z-30 flex flex-col items-center justify-center text-center p-8"
        >
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-2xl shadow-amber-500/20 mb-4 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0.5-0.05" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
                <path d="M6 14h6" />
                <path d="M12 2v20" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-amber-300 font-['Cinzel']">
            REINA VALERA 1960
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light tracking-widest uppercase mt-1">
            Transmisión en Vivo
          </p>
        </motion.div>
      )}

      {/* Active Verse Display Content */}
      <AnimatePresence mode="wait">
        {!isBlack && !isBlank && !showLogo && currentVerse && isLive && (
          <motion.div
            key={`${currentVerse.bookId}_${currentVerse.chapter}_${currentVerse.verse}_${referenceDisplay}`}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              maxWidth: `${settings.maxWidth}%`,
              width: settings.position === 'bottom-bar' ? '100%' : 'auto',
            }}
            className={`relative z-20 transition-all ${
              settings.showBoxBackground ? 'shadow-2xl backdrop-blur-md' : ''
            }`}
          >
            <div
              style={{
                backgroundColor: settings.showBoxBackground
                  ? `${settings.boxBgColor}${Math.round(settings.boxBgOpacity * 255).toString(16).padStart(2, '0')}`
                  : 'transparent',
                borderRadius: settings.position === 'bottom-bar' ? '0px' : `${Math.round(settings.boxBorderRadius * fontScale)}px`,
                padding: `${responsivePadding}px`,
                border: settings.showBoxBackground && settings.boxBorder ? `1.5px solid ${settings.boxBorderColor}` : 'none',
              }}
              className="flex flex-col gap-3 relative"
            >
              {/* Badge Top Reference */}
              {settings.showReference && settings.referencePosition === 'badge-top' && (
                <div className={`flex items-center gap-2 ${settings.textAlign === 'right' ? 'justify-end' : settings.textAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
                  <span
                    style={{
                      fontSize: `${responsiveRefSize}px`,
                      fontFamily: settings.fontFamily,
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold tracking-wide shadow-sm"
                  >
                    <span>{referenceDisplay || `${currentVerse.bookName} ${currentVerse.chapter}:${currentVerse.verse}`}</span>
                    {settings.showVersionBadge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black">
                        {settings.versionText || 'RVR1960'}
                      </span>
                    )}
                  </span>
                </div>
              )}

              {/* Main Verse Text */}
              <div
                style={{
                  fontFamily: settings.fontFamily,
                  fontSize: `${responsiveFontSize}px`,
                  color: settings.textColor,
                  opacity: settings.textOpacity,
                  lineHeight: settings.lineHeight,
                  letterSpacing: settings.letterSpacing === 'wider' ? '0.08em' : settings.letterSpacing === 'wide' ? '0.04em' : 'normal',
                  fontWeight: settings.isBold ? 700 : 400,
                  fontStyle: settings.isItalic ? 'italic' : 'normal',
                  textTransform: settings.isUppercase ? 'uppercase' : 'none',
                  textShadow: getTextShadowStyle(),
                }}
                className={`transition-all duration-150 leading-relaxed ${textAlignClass}`}
              >
                {settings.showQuotes && <span className="opacity-70 font-serif mr-1">“</span>}
                {currentVerse.text}
                {settings.showQuotes && <span className="opacity-70 font-serif ml-1">”</span>}
              </div>

              {/* Bottom Reference Placement */}
              {settings.showReference && settings.referencePosition !== 'badge-top' && (
                <div
                  style={{
                    fontSize: `${responsiveRefSize}px`,
                    fontFamily: settings.fontFamily,
                    color: settings.textColor,
                    textShadow: getTextShadowStyle(),
                  }}
                  className={`flex items-center gap-2.5 pt-1 ${
                    settings.referencePosition === 'bottom-right'
                      ? 'justify-end'
                      : settings.referencePosition === 'top'
                      ? 'justify-start'
                      : textAlignClass === 'text-center'
                      ? 'justify-center'
                      : textAlignClass === 'text-right'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div className="h-0.5 w-6 bg-amber-400/70 rounded-full inline-block" />
                  <span className="font-bold tracking-wide text-amber-300 drop-shadow-md">
                    {referenceDisplay || `${currentVerse.bookName} ${currentVerse.chapter}:${currentVerse.verse}`}
                  </span>
                  {settings.showVersionBadge && (
                    <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-slate-900/80 border border-amber-400/40 text-amber-200">
                      {settings.versionText || 'RVR1960'}
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
