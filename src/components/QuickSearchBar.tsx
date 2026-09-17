import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Send, Eye, X, BookOpen, Clock } from 'lucide-react';
import { BibleVerse, BibleBook } from '../types';
import { BIBLE_BOOKS, POPULAR_VERSES, BIBLE_TOPICS, parseBibleQuery, getVerseText } from '../data/bibleData';

interface QuickSearchBarProps {
  onSelectVerse: (verse: BibleVerse, sendLiveImmediately?: boolean) => void;
  onPreviewVerse: (verse: BibleVerse) => void;
  activeVerse: BibleVerse | null;
}

export const QuickSearchBar: React.FC<QuickSearchBarProps> = ({
  onSelectVerse,
  onPreviewVerse,
  activeVerse,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<BibleVerse[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Juan 3:16',
    'Salmos 23:1',
    'Filipenses 4:13',
    'Romanos 8:28',
    'Salmos 91:1'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions dynamically as query changes
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions(POPULAR_VERSES.slice(0, 8));
      return;
    }

    const parsed = parseBibleQuery(query);
    if (parsed.book) {
      const results: BibleVerse[] = [];
      const startV = parsed.verse || 1;
      const endV = parsed.endVerse || (parsed.isSpecificVerse ? startV : Math.min(startV + 5, 20));

      for (let v = startV; v <= endV; v++) {
        const text = getVerseText(parsed.book.id, parsed.chapter, v);
        results.push({
          bookId: parsed.book.id,
          bookName: parsed.book.name,
          chapter: parsed.chapter,
          verse: v,
          text
        });
      }
      setSuggestions(results);
    } else {
      // Keyword full text filter
      const clean = query.toLowerCase().trim();
      const filtered = POPULAR_VERSES.filter(
        v =>
          v.text.toLowerCase().includes(clean) ||
          v.bookName.toLowerCase().includes(clean) ||
          `${v.bookName} ${v.chapter}:${v.verse}`.toLowerCase().includes(clean)
      );
      setSuggestions(filtered.length > 0 ? filtered.slice(0, 8) : POPULAR_VERSES.slice(0, 6));
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        const target = suggestions[0];
        onSelectVerse(target, true);
        addToRecents(`${target.bookName} ${target.chapter}:${target.verse}`);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const addToRecents = (ref: string) => {
    setRecentSearches(prev => {
      const next = [ref, ...prev.filter(r => r !== ref)].slice(0, 6);
      return next;
    });
  };

  const handleTopicClick = (topicVerse: { ref: string; bookId: string; ch: number; v: number }) => {
    const book = BIBLE_BOOKS.find(b => b.id === topicVerse.bookId);
    const bookName = book ? book.name : 'Juan';
    const text = getVerseText(topicVerse.bookId, topicVerse.ch, topicVerse.v);
    const verseObj: BibleVerse = {
      bookId: topicVerse.bookId,
      bookName,
      chapter: topicVerse.ch,
      verse: topicVerse.v,
      text
    };
    onSelectVerse(verseObj, true);
    addToRecents(topicVerse.ref);
    setIsOpen(false);
  };

  return (
    <div id="quick-search-section" className="relative w-full">
      {/* Search Bar Input */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-amber-400 pointer-events-none flex items-center">
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          id="bible-quick-search-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar versículo o pasaje (ej: Juan 3:16, Sal 23:1, Rom 8:28, o palabra clave)..."
          className="w-full bg-slate-900/90 hover:bg-slate-900 text-white placeholder-slate-400 text-sm md:text-base pl-11 pr-24 py-3 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-inner transition-all outline-none"
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Limpiar"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              if (suggestions.length > 0) {
                const target = suggestions[0];
                onSelectVerse(target, true);
                addToRecents(`${target.bookName} ${target.chapter}:${target.verse}`);
                setIsOpen(false);
              }
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-md shadow-amber-500/20 active:scale-95 transition-all"
            title="Proyectar versículo directamente al OBS en Vivo"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">VIVO</span>
          </button>
        </div>
      </div>

      {/* Quick Topic Chips */}
      <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold whitespace-nowrap pl-1">
          Temas Rápidos:
        </span>
        {BIBLE_TOPICS.map((topic) => (
          <button
            key={topic.id}
            id={`topic-btn-${topic.id}`}
            onClick={() => handleTopicClick(topic.verses[0])}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-500/40 text-slate-300 border border-slate-700/60 whitespace-nowrap transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{topic.name}</span>
          </button>
        ))}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div
          ref={dropdownRef}
          id="search-dropdown-menu"
          className="absolute top-full left-0 right-0 mt-2 bg-slate-900/98 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[420px] flex flex-col"
        >
          {/* Header & Recent Shortcuts */}
          <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Resultados para "{query || 'Versículos Destacados'}"</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              Presione [Enter] para Proyectar
            </span>
          </div>

          {/* Recents list if no query */}
          {!query && recentSearches.length > 0 && (
            <div className="px-3 pt-2.5 pb-1 flex items-center gap-2 overflow-x-auto">
              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="text-[11px] text-slate-400 shrink-0">Recientes:</span>
              <div className="flex items-center gap-1.5">
                {recentSearches.map((rec, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(rec);
                    }}
                    className="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 whitespace-nowrap"
                  >
                    {rec}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results list */}
          <div className="overflow-y-auto p-2 space-y-1.5 flex-1 divide-y divide-slate-800/40">
            {suggestions.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">
                No se encontraron pasajes para "{query}". Intenta buscar por libro y capítulo (ej. "Juan 3:16" o "Salmos 23").
              </div>
            ) : (
              suggestions.map((verse, index) => {
                const isCurrentActive =
                  activeVerse?.bookId === verse.bookId &&
                  activeVerse?.chapter === verse.chapter &&
                  activeVerse?.verse === verse.verse;

                return (
                  <div
                    key={`${verse.bookId}_${verse.chapter}_${verse.verse}_${index}`}
                    id={`verse-search-item-${verse.bookId}-${verse.chapter}-${verse.verse}`}
                    className={`p-2.5 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 group cursor-pointer ${
                      isCurrentActive
                        ? 'bg-amber-500/15 border border-amber-500/40'
                        : 'hover:bg-slate-800/80 border border-transparent hover:border-slate-700'
                    }`}
                    onClick={() => {
                      onPreviewVerse(verse);
                    }}
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-amber-300 text-sm">
                          {verse.bookName} {verse.chapter}:{verse.verse}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          RVR1960
                        </span>
                        {isCurrentActive && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-500/30 text-red-300 border border-red-500/40 animate-pulse">
                            ● AL AIRE
                          </span>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                        {verse.text}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPreviewVerse(verse);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1"
                        title="Previsualizar en monitor de operador"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                        <span className="hidden md:inline">Ver</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectVerse(verse, true);
                          addToRecents(`${verse.bookName} ${verse.chapter}:${verse.verse}`);
                          setIsOpen(false);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm"
                        title="Lanzar a transmisión en vivo"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>EN VIVO</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
