import React, { useEffect } from 'react';
import { Minimize2 } from 'lucide-react';
import { ActiveProjectionState } from '../types';
import { BibleRenderer } from './BibleRenderer';

interface FullscreenDisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ActiveProjectionState;
}

export const FullscreenDisplayModal: React.FC<FullscreenDisplayModalProps> = ({
  isOpen,
  onClose,
  state,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'f' || e.key === 'F') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col select-none group">
      {/* Floating Exit Button that fades out */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        title="Salir de Pantalla Completa (Escape o tecla F)"
      >
        <Minimize2 className="w-5 h-5" />
      </button>

      <div className="w-full h-full flex-1">
        <BibleRenderer state={state} previewMode={false} />
      </div>
    </div>
  );
};
