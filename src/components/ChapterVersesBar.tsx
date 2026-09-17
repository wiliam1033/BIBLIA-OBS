import React from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { BibleVerse } from '../types';
import { getVerseText } from '../data/bibleData';

interface ChapterVersesBarProps {
  currentVerse: BibleVerse | null;
  onSelectVerse: (verse: BibleVerse, sendLive?: boolean) => void;
  autoLiveOnChange?: boolean;
}

export const ChapterVersesBar: React.FC<ChapterVersesBarProps> = ({
  currentVerse,
  onSelectVerse,
  autoLiveOnChange = true,
}) => {
  if (!currentVerse) return null;

  const currentCh = currentVerse.chapter;
  const currentV = currentVerse.verse;
  const bookId = currentVerse.bookId;
  const bookName = currentVerse.bookName;

  const handlePrevVerse = () => {
    if (currentV > 1) {
      const nextV = currentV - 1;
      const text = getVerseText(bookId, currentCh, nextV);
      onSelectVerse(
        {
          bookId,
          bookName,
          chapter: currentCh,
          verse: nextV,
          text,
        },
        autoLiveOnChange
      );
    }
  };

  const handleNextVerse = () => {
    const nextV = currentV + 1;
    const text = getVerseText(bookId, currentCh, nextV);
    onSelectVerse(
      {
        bookId,
        bookName,
        chapter: currentCh,
        verse: nextV,
        text,
      },
      autoLiveOnChange
    );
  };

  // Generate range of 20 verses around current
  const startRange = Math.max(1, currentV - 5);
  const endRange = Math.max(startRange + 15, currentV + 10);
  const verseList = Array.from({ length: endRange - startRange + 1 }, (_, i) => startRange + i);

  return (
    <div id="live-chapter-verses-bar" className="bg-slate-900/95 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 shadow-md">
      {/* Active Chapter Label */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-amber-300 shrink-0">
        <span>{bookName} {currentCh}</span>
      </div>

      {/* Prev Button */}
      <button
        onClick={handlePrevVerse}
        disabled={currentV <= 1}
        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-white transition-all flex items-center justify-center shrink-0 border border-slate-700"
        title="Versículo Anterior (Flecha Izquierda ←)"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Verses Scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none flex-1">
        {verseList.map((v) => {
          const isSelected = v === currentV;
          return (
            <button
              key={v}
              id={`quick-v-btn-${v}`}
              onClick={() => {
                const text = getVerseText(bookId, currentCh, v);
                onSelectVerse(
                  {
                    bookId,
                    bookName,
                    chapter: currentCh,
                    verse: v,
                    text,
                  },
                  autoLiveOnChange
                );
              }}
              className={`min-w-8 h-8 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-105 font-black ring-2 ring-amber-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
              }`}
            >
              {v}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNextVerse}
        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all flex items-center justify-center shrink-0 border border-slate-700"
        title="Versículo Siguiente (Flecha Derecha →)"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Mode hint */}
      <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 shrink-0 pl-1">
        <Zap className="w-3 h-3 text-amber-400" />
        <span>Cambio en vivo activo</span>
      </div>
    </div>
  );
};
