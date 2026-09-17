import React, { useState } from 'react';
import { BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { BibleBook, BibleVerse } from '../types';
import { BIBLE_BOOKS, getVerseText } from '../data/bibleData';

interface BibleBookNavigatorProps {
  onSelectVerse: (verse: BibleVerse, sendLive?: boolean) => void;
  selectedBook: BibleBook | null;
  selectedChapter: number;
  selectedVerse: number;
  onBookChange: (book: BibleBook) => void;
  onChapterChange: (chapter: number) => void;
}

export const BibleBookNavigator: React.FC<BibleBookNavigatorProps> = ({
  onSelectVerse,
  selectedBook,
  selectedChapter,
  selectedVerse,
  onBookChange,
  onChapterChange,
}) => {
  const [testamentFilter, setTestamentFilter] = useState<'ALL' | 'OT' | 'NT'>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [activeStep, setActiveStep] = useState<'book' | 'chapter' | 'verse'>('book');

  const currentBook = selectedBook || BIBLE_BOOKS[42]; // Default to Juan

  const filteredBooks = BIBLE_BOOKS.filter((b) => {
    if (testamentFilter !== 'ALL' && b.testament !== testamentFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return b.name.toLowerCase().includes(q) || b.shortName.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
    }
    return true;
  });

  // Calculate approximate verses in current chapter (standard range 1 to 30 for navigation grid)
  const maxVersesForChapter = Math.min(Math.max(25, (currentBook.id === 'PSA' && selectedChapter === 119) ? 176 : 35), 60);
  const versesArray = Array.from({ length: maxVersesForChapter }, (_, i) => i + 1);

  return (
    <div id="bible-book-navigator" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col h-full shadow-lg">
      {/* Step Navigation Tabs */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveStep('book')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeStep === 'book'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. {currentBook.name}</span>
          </button>

          <button
            onClick={() => setActiveStep('chapter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeStep === 'chapter'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Cap. {selectedChapter}</span>
          </button>

          <button
            onClick={() => setActiveStep('verse')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeStep === 'verse'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>3. Vers. {selectedVerse}</span>
          </button>
        </div>

        {/* Quick Testament toggle when viewing books */}
        {activeStep === 'book' && (
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
            <button
              onClick={() => setTestamentFilter('ALL')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                testamentFilter === 'ALL' ? 'bg-slate-800 text-amber-300 font-bold' : 'text-slate-400'
              }`}
            >
              Todos (66)
            </button>
            <button
              onClick={() => setTestamentFilter('OT')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                testamentFilter === 'OT' ? 'bg-slate-800 text-amber-300 font-bold' : 'text-slate-400'
              }`}
            >
              A.T. (39)
            </button>
            <button
              onClick={() => setTestamentFilter('NT')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                testamentFilter === 'NT' ? 'bg-slate-800 text-amber-300 font-bold' : 'text-slate-400'
              }`}
            >
              N.T. (27)
            </button>
          </div>
        )}
      </div>

      {/* Step 1: Books Grid */}
      {activeStep === 'book' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Filtrar libros..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-950 text-xs px-3 py-1.5 rounded-lg border border-slate-800 focus:border-amber-500 text-slate-200 placeholder-slate-500 outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 max-h-[290px]">
            {filteredBooks.map((book) => {
              const isSelected = currentBook.id === book.id;
              return (
                <button
                  key={book.id}
                  id={`nav-book-${book.id}`}
                  onClick={() => {
                    onBookChange(book);
                    onChapterChange(1);
                    setActiveStep('chapter');
                  }}
                  className={`text-left p-2 rounded-xl text-xs transition-all border ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold shadow-sm'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{book.name}</span>
                    <span className="text-[10px] opacity-60 ml-1 font-mono font-normal">{book.shortName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span>{book.chaptersCount} caps</span>
                    <span className="text-[9px] px-1 rounded bg-slate-900 border border-slate-800">
                      {book.testament}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Chapters Grid */}
      {activeStep === 'chapter' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-300 font-bold">
              Selecciona Capítulo de {currentBook.name} ({currentBook.chaptersCount} caps)
            </span>
            <button
              onClick={() => setActiveStep('book')}
              className="text-[11px] text-amber-400 hover:underline"
            >
              ← Cambiar libro
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-[290px]">
            {Array.from({ length: currentBook.chaptersCount }, (_, i) => i + 1).map((ch) => {
              const isSelected = selectedChapter === ch;
              return (
                <button
                  key={ch}
                  id={`nav-chapter-${ch}`}
                  onClick={() => {
                    onChapterChange(ch);
                    setActiveStep('verse');
                  }}
                  className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 scale-105'
                      : 'bg-slate-950/80 border-slate-800 hover:bg-slate-800 hover:border-amber-500/50 text-slate-200'
                  }`}
                >
                  {ch}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Verses Grid */}
      {activeStep === 'verse' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-300 font-bold">
              Versículos de {currentBook.name} {selectedChapter}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStep('chapter')}
                className="text-[11px] text-amber-400 hover:underline"
              >
                ← Cambiar cap.
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-[290px]">
            {versesArray.map((v) => {
              const isSelected = selectedVerse === v;
              return (
                <button
                  key={v}
                  id={`nav-verse-${v}`}
                  onClick={() => {
                    const text = getVerseText(currentBook.id, selectedChapter, v);
                    onSelectVerse({
                      bookId: currentBook.id,
                      bookName: currentBook.name,
                      chapter: selectedChapter,
                      verse: v,
                      text,
                    }, false);
                  }}
                  onDoubleClick={() => {
                    const text = getVerseText(currentBook.id, selectedChapter, v);
                    onSelectVerse({
                      bookId: currentBook.id,
                      bookName: currentBook.name,
                      chapter: selectedChapter,
                      verse: v,
                      text,
                    }, true);
                  }}
                  className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 scale-105'
                      : 'bg-slate-950/80 border-slate-800 hover:bg-slate-800 hover:border-amber-500/50 text-slate-200'
                  }`}
                  title={`Doble clic para proyectar en VIVO`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
