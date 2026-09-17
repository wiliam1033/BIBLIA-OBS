import React, { useState } from 'react';
import { Download, FileImage, Presentation, CheckCircle, X, Sparkles, Copy, Check } from 'lucide-react';
import { ActiveProjectionState, BibleVerse } from '../types';
import pptxgen from 'pptxgenjs';
import * as htmlToImage from 'html-to-image';
import confetti from 'canvas-confetti';

interface ExportSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ActiveProjectionState;
  renderTargetRef?: React.RefObject<HTMLDivElement | null>;
}

export const ExportSlidesModal: React.FC<ExportSlidesModalProps> = ({
  isOpen,
  onClose,
  state,
  renderTargetRef,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const currentVerse = state.currentVerse;
  const settings = state.settings;

  const handleExportPng = async () => {
    try {
      setIsExporting(true);
      const node = renderTargetRef?.current || document.getElementById('bible-projection-canvas');
      if (!node) {
        throw new Error('Elemento de lienzo no encontrado');
      }

      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `Biblia_RVR1960_${currentVerse?.bookName || 'Pasaje'}_${currentVerse?.chapter || 1}_${currentVerse?.verse || 1}.png`;
      link.href = dataUrl;
      link.click();

      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      setSuccessMessage('¡Diapositiva PNG HD exportada exitosamente!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Error al exportar imagen', err);
      alert('Error al generar la imagen. Intente nuevamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJpeg = async () => {
    try {
      setIsExporting(true);
      const node = renderTargetRef?.current || document.getElementById('bible-projection-canvas');
      if (!node) throw new Error('Elemento de lienzo no encontrado');

      const dataUrl = await htmlToImage.toJpeg(node, {
        quality: 0.95,
        backgroundColor: '#000000',
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `Biblia_RVR1960_${currentVerse?.bookName || 'Pasaje'}_${currentVerse?.chapter || 1}_${currentVerse?.verse || 1}.jpg`;
      link.href = dataUrl;
      link.click();

      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      setSuccessMessage('¡Diapositiva JPEG exportada exitosamente!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Error al exportar JPEG', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPptx = async () => {
    try {
      setIsExporting(true);
      const pres = new pptxgen();

      // Set slide dimensions to standard 16:9 widescreen
      pres.layout = 'LAYOUT_16x9';

      const slide = pres.addSlide();

      // Slide background color
      slide.background = { color: '0A1128' };

      // Reference
      const refTitle = `${currentVerse?.bookName || 'Juan'} ${currentVerse?.chapter || 3}:${currentVerse?.verse || 16} (RVR1960)`;

      slide.addText(refTitle, {
        x: '8%',
        y: '15%',
        w: '84%',
        h: '10%',
        fontSize: 24,
        fontFace: 'Georgia',
        color: 'F59E0B',
        bold: true,
        align: 'center',
      });

      // Main Verse Text Box
      slide.addText(`“${currentVerse?.text || 'Porque de tal manera amó Dios al mundo...'}”`, {
        x: '8%',
        y: '28%',
        w: '84%',
        h: '55%',
        fontSize: 32,
        fontFace: 'Georgia',
        color: 'FFFFFF',
        align: 'center',
        valign: 'middle',
        lineSpacing: 40,
      });

      // Footer
      slide.addText('Biblia Reina Valera 1960 • Proyección en Vivo', {
        x: '8%',
        y: '88%',
        w: '84%',
        h: '5%',
        fontSize: 12,
        fontFace: 'Calibri',
        color: '94A3B8',
        align: 'center',
      });

      await pres.writeFile({
        fileName: `Presentacion_Biblia_${currentVerse?.bookName || 'Pasaje'}_${currentVerse?.chapter || 1}_${currentVerse?.verse || 1}.pptx`,
      });

      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      setSuccessMessage('¡Presentación PowerPoint (.pptx) descargada!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Error al exportar PPTX', err);
      alert('Hubo un problema al generar el archivo de PowerPoint.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyText = () => {
    if (!currentVerse) return;
    const text = `"${currentVerse.text}" — ${currentVerse.bookName} ${currentVerse.chapter}:${currentVerse.verse} (Reina-Valera 1960)`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
            <Presentation className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">
            Exportar Diapositivas de Presentación
          </h3>
          <p className="text-xs text-slate-400">
            Descarga el pasaje actual en formatos compatibles con PowerPoint, ProPresenter, OBS y redes sociales.
          </p>
        </div>

        {/* Current Passage Preview Card */}
        {currentVerse && (
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">
                {currentVerse.bookName} {currentVerse.chapter}:{currentVerse.verse}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                Reina Valera 1960
              </span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-2 italic">
              "{currentVerse.text}"
            </p>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Export Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* PowerPoint PPTX */}
          <button
            onClick={handleExportPptx}
            disabled={isExporting}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/60 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 group-hover:scale-110 transition-transform">
                <Presentation className="w-5 h-5" />
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">
                PowerPoint (.PPTX)
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Diapositiva 16:9 editable
              </div>
            </div>
          </button>

          {/* PNG High-Res Slide */}
          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/60 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                <FileImage className="w-5 h-5" />
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">
                Imagen PNG HD
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Ideal para OBS y pantallas
              </div>
            </div>
          </button>

          {/* JPEG Standard Slide */}
          <button
            onClick={handleExportJpeg}
            disabled={isExporting}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/60 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <FileImage className="w-5 h-5" />
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">
                Imagen JPEG
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Para redes sociales y WhatsApp
              </div>
            </div>
          </button>

          {/* Copy Text with Reference */}
          <button
            onClick={handleCopyText}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/60 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                {copiedText ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </div>
              <span className="text-[10px] text-amber-400 font-mono font-bold">
                {copiedText ? 'Copiado' : 'Portapapeles'}
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">
                Copiar Texto Formateado
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Copia versículo con cita bíblica
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
