import React, { useState, useEffect } from 'react';
import { Bookmark, Star, Plus, Trash2, Send, Eye, FolderPlus, FileText, Check, Tag } from 'lucide-react';
import { SavedFavorite, BibleVerse, ServicePlaylist, ServicePlaylistItem } from '../types';
import { POPULAR_VERSES } from '../data/bibleData';

interface FavoritesAndPlaylistsProps {
  currentVerse: BibleVerse | null;
  onSelectVerse: (verse: BibleVerse, sendLive?: boolean) => void;
  onPreviewVerse: (verse: BibleVerse) => void;
}

const STORAGE_FAVORITES_KEY = 'rvr1960_favorites_list';
const STORAGE_PLAYLISTS_KEY = 'rvr1960_playlists_list';

export const FavoritesAndPlaylists: React.FC<FavoritesAndPlaylistsProps> = ({
  currentVerse,
  onSelectVerse,
  onPreviewVerse,
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'playlists'>('favorites');
  const [favorites, setFavorites] = useState<SavedFavorite[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    // Pre-populate with starter favorites
    return [
      {
        id: 'fav-1',
        reference: 'Juan 3:16',
        bookId: 'JHN',
        bookName: 'Juan',
        chapter: 3,
        verse: 16,
        text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
        notes: 'Pasaje central de Salvación',
        tags: ['Evangelio', 'Amor'],
        createdAt: Date.now() - 100000,
      },
      {
        id: 'fav-2',
        reference: 'Salmos 23:1',
        bookId: 'PSA',
        bookName: 'Salmos',
        chapter: 23,
        verse: 1,
        text: 'Jehová es mi pastor; nada me faltará.',
        notes: 'Confianza y provisión divina',
        tags: ['Paz', 'Protección'],
        createdAt: Date.now() - 90000,
      },
      {
        id: 'fav-3',
        reference: 'Filipenses 4:13',
        bookId: 'PHP',
        bookName: 'Filipenses',
        chapter: 4,
        verse: 13,
        text: 'Todo lo puedo en Cristo que me fortalece.',
        notes: 'Victoria y fortaleza en Cristo',
        tags: ['Fe', 'Fuerza'],
        createdAt: Date.now() - 80000,
      },
      {
        id: 'fav-4',
        reference: 'Isaías 40:31',
        bookId: 'ISA',
        bookName: 'Isaías',
        chapter: 40,
        verse: 31,
        text: 'pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.',
        notes: 'Esperanza en tiempos difíciles',
        tags: ['Esperanza', 'Fortaleza'],
        createdAt: Date.now() - 70000,
      }
    ];
  });

  const [playlists, setPlaylists] = useState<ServicePlaylist[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_PLAYLISTS_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return [
      {
        id: 'pl-domingo',
        name: 'Culto Dominical - Predicación Principal',
        description: 'Pasajes programados para el servicio de hoy',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        items: [
          {
            id: 'item-1',
            type: 'verse',
            title: 'Juan 3:16',
            reference: 'Juan 3:16',
            verseData: POPULAR_VERSES[0],
            note: 'Introducción del mensaje',
          },
          {
            id: 'item-2',
            type: 'verse',
            title: 'Romanos 8:28',
            reference: 'Romanos 8:28',
            verseData: POPULAR_VERSES.find(v => v.bookId === 'ROM' && v.chapter === 8 && v.verse === 28),
            note: 'Punto 1: El propósito divino',
          },
          {
            id: 'item-3',
            type: 'verse',
            title: 'Filipenses 4:13',
            reference: 'Filipenses 4:13',
            verseData: POPULAR_VERSES.find(v => v.bookId === 'PHP' && v.chapter === 4 && v.verse === 13),
            note: 'Conclusión y llamado a la congregación',
          }
        ]
      }
    ];
  });

  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>(playlists[0]?.id || '');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PLAYLISTS_KEY, JSON.stringify(playlists));
  }, [playlists]);

  const isCurrentFavorite = currentVerse
    ? favorites.some(
        (f) =>
          f.bookId === currentVerse.bookId &&
          f.chapter === currentVerse.chapter &&
          f.verse === currentVerse.verse
      )
    : false;

  const toggleFavoriteCurrent = () => {
    if (!currentVerse) return;

    if (isCurrentFavorite) {
      setFavorites((prev) =>
        prev.filter(
          (f) =>
            !(
              f.bookId === currentVerse.bookId &&
              f.chapter === currentVerse.chapter &&
              f.verse === currentVerse.verse
            )
        )
      );
    } else {
      const newFav: SavedFavorite = {
        id: `fav-${Date.now()}`,
        reference: `${currentVerse.bookName} ${currentVerse.chapter}:${currentVerse.verse}`,
        bookId: currentVerse.bookId,
        bookName: currentVerse.bookName,
        chapter: currentVerse.chapter,
        verse: currentVerse.verse,
        text: currentVerse.text,
        createdAt: Date.now(),
      };
      setFavorites((prev) => [newFav, ...prev]);
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    const newPl: ServicePlaylist = {
      id: `pl-${Date.now()}`,
      name: newPlaylistName.trim(),
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setPlaylists((prev) => [...prev, newPl]);
    setSelectedPlaylistId(newPl.id);
    setNewPlaylistName('');
  };

  const addCurrentVerseToPlaylist = () => {
    if (!currentVerse || !selectedPlaylistId) return;

    const newItem: ServicePlaylistItem = {
      id: `item-${Date.now()}`,
      type: 'verse',
      title: `${currentVerse.bookName} ${currentVerse.chapter}:${currentVerse.verse}`,
      reference: `${currentVerse.bookName} ${currentVerse.chapter}:${currentVerse.verse}`,
      verseData: currentVerse,
    };

    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === selectedPlaylistId
          ? { ...pl, items: [...pl.items, newItem], updatedAt: Date.now() }
          : pl
      )
    );
  };

  const removePlaylistItem = (playlistId: string, itemId: string) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, items: pl.items.filter((item) => item.id !== itemId), updatedAt: Date.now() }
          : pl
      )
    );
  };

  const currentPlaylist = playlists.find((pl) => pl.id === selectedPlaylistId);

  return (
    <div id="favorites-and-playlists-panel" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col h-full shadow-lg">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Favoritos ({favorites.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('playlists')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'playlists'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Orden de Culto ({playlists.length})</span>
          </button>
        </div>

        {/* Quick Save Current Verse Action */}
        {currentVerse && (
          <button
            onClick={toggleFavoriteCurrent}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isCurrentFavorite
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Guardar versículo activo en Favoritos"
          >
            <Star className={`w-3.5 h-3.5 ${isCurrentFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isCurrentFavorite ? 'Guardado' : 'Guardar Actual'}</span>
          </button>
        )}
      </div>

      {/* Tab 1: Favorites List */}
      {activeTab === 'favorites' && (
        <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[310px]">
          {favorites.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
              <Star className="w-8 h-8 opacity-30 text-amber-400" />
              <span>Aún no tienes pasajes guardados. Presiona "Guardar Actual" al ver un versículo.</span>
            </div>
          ) : (
            favorites.map((fav) => (
              <div
                key={fav.id}
                id={`fav-card-${fav.id}`}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col gap-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-amber-300">
                      {fav.reference}
                    </span>
                    {fav.tags && fav.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        {fav.tags.map((t, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const v: BibleVerse = {
                          bookId: fav.bookId,
                          bookName: fav.bookName,
                          chapter: fav.chapter,
                          verse: fav.verse,
                          text: fav.text,
                        };
                        onPreviewVerse(v);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 text-xs"
                      title="Previsualizar"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        const v: BibleVerse = {
                          bookId: fav.bookId,
                          bookName: fav.bookName,
                          chapter: fav.chapter,
                          verse: fav.verse,
                          text: fav.text,
                        };
                        onSelectVerse(v, true);
                      }}
                      className="px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm"
                      title="Proyectar de inmediato en Vivo"
                    >
                      <Send className="w-3 h-3" />
                      <span>VIVO</span>
                    </button>

                    <button
                      onClick={() => removeFavorite(fav.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                      title="Eliminar de favoritos"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {fav.text}
                </p>

                {fav.notes && (
                  <div className="text-[11px] text-amber-200/80 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{fav.notes}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Service Playlists / Liturgies */}
      {activeTab === 'playlists' && (
        <div className="flex-1 flex flex-col min-h-0 space-y-3">
          {/* Playlist Selector & Add */}
          <div className="flex items-center gap-2">
            <select
              value={selectedPlaylistId}
              onChange={(e) => setSelectedPlaylistId(e.target.value)}
              className="flex-1 bg-slate-950 text-xs px-3 py-1.5 rounded-xl border border-slate-800 text-amber-300 font-semibold outline-none focus:border-amber-500"
            >
              {playlists.map((pl) => (
                <option key={pl.id} value={pl.id}>
                  📁 {pl.name} ({pl.items.length} pasajes)
                </option>
              ))}
            </select>

            <button
              onClick={addCurrentVerseToPlaylist}
              disabled={!currentVerse}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1 whitespace-nowrap"
              title="Añadir versículo actual a este orden de culto"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Añadir Actual</span>
            </button>
          </div>

          {/* Create New Playlist Input */}
          <form onSubmit={handleCreatePlaylist} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Crear nuevo orden (ej. 'Culto de Oración')..."
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className="flex-1 bg-slate-950 text-xs px-3 py-1.5 rounded-lg border border-slate-800 text-slate-200 placeholder-slate-500 outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Crear</span>
            </button>
          </form>

          {/* Items in Current Playlist */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[220px]">
            {!currentPlaylist || currentPlaylist.items.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                Este orden de culto está vacío. Usa el botón "Añadir Actual" para organizar los versículos de tu prédica.
              </div>
            ) : (
              currentPlaylist.items.map((item, index) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-amber-300 truncate">
                        {item.reference || item.title}
                      </div>
                      {item.note && (
                        <div className="text-[10px] text-slate-400 truncate">
                          {item.note}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {item.verseData && (
                      <>
                        <button
                          onClick={() => item.verseData && onPreviewVerse(item.verseData)}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 text-xs"
                          title="Previsualizar"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => item.verseData && onSelectVerse(item.verseData, true)}
                          className="px-2 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 shadow-sm"
                          title="Proyectar en VIVO"
                        >
                          <Send className="w-2.5 h-2.5" />
                          <span>VIVO</span>
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => removePlaylistItem(currentPlaylist.id, item.id)}
                      className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
