import { ActiveProjectionState, DisplaySettings, BibleVerse } from '../types';
import { DEFAULT_DISPLAY_SETTINGS } from '../data/backgroundPresets';

const BROADCAST_CHANNEL_NAME = 'rvr1960_bible_obs_channel';
const STORAGE_KEY_STATE = 'rvr1960_active_projection_state';
const STORAGE_KEY_SETTINGS = 'rvr1960_display_settings';
const STORAGE_KEY_FAVORITES = 'rvr1960_saved_favorites';
const STORAGE_KEY_PLAYLISTS = 'rvr1960_service_playlists';

export class BroadcastService {
  private channel: BroadcastChannel | null = null;
  private listeners: ((state: ActiveProjectionState) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        this.channel.onmessage = (event) => {
          if (event.data && event.data.type === 'PROJECTION_UPDATE') {
            this.notifyListeners(event.data.state);
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported or blocked, falling back to localStorage', e);
      }
    }

    // Fallback: Listen to storage events across tabs/windows
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key === STORAGE_KEY_STATE && event.newValue) {
          try {
            const parsed = JSON.parse(event.newValue);
            this.notifyListeners(parsed);
          } catch (e) {
            console.error('Failed to parse state from storage event', e);
          }
        }
      });
    }
  }

  public subscribe(callback: (state: ActiveProjectionState) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notifyListeners(state: ActiveProjectionState) {
    this.listeners.forEach((cb) => cb(state));
  }

  public broadcastState(state: ActiveProjectionState) {
    // 1. Save to local storage for persistence across reloads/OBS restarts
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
    }

    // 2. Broadcast via BroadcastChannel
    if (this.channel) {
      this.channel.postMessage({
        type: 'PROJECTION_UPDATE',
        state,
      });
    }
  }

  public getInitialState(): ActiveProjectionState {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_STATE);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved state', e);
        }
      }
    }

    // Default initial state with John 3:16
    const initialVerse: BibleVerse = {
      bookId: 'JHN',
      bookName: 'Juan',
      chapter: 3,
      verse: 16,
      text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.'
    };

    return {
      currentVerse: initialVerse,
      selectedVerses: [initialVerse],
      referenceDisplay: 'Juan 3:16',
      isLive: true,
      isBlank: false,
      isBlack: false,
      showLogo: false,
      settings: DEFAULT_DISPLAY_SETTINGS,
      timestamp: Date.now()
    };
  }

  public getStoredSettings(): DisplaySettings {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        try {
          return { ...DEFAULT_DISPLAY_SETTINGS, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Error reading settings', e);
        }
      }
    }
    return DEFAULT_DISPLAY_SETTINGS;
  }

  public saveSettings(settings: DisplaySettings) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    }
  }
}

export const broadcastService = new BroadcastService();
