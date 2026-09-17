export type Testament = 'OT' | 'NT';

export interface BibleBook {
  id: string;
  name: string;
  shortName: string;
  abbr: string[];
  testament: Testament;
  chaptersCount: number;
  category: string;
}

export interface BibleVerse {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleReference {
  bookId: string;
  bookName: string;
  chapter: number;
  startVerse: number;
  endVerse?: number;
}

export type FontFamily = 
  | 'Cinzel' 
  | 'Playfair Display' 
  | 'Montserrat' 
  | 'Merriweather' 
  | 'Roboto Slab' 
  | 'Outfit' 
  | 'Lora' 
  | 'EB Garamond' 
  | 'Plus Jakarta Sans';

export type PositionType = 
  | 'lower-third' 
  | 'center' 
  | 'top' 
  | 'fullscreen' 
  | 'bottom-bar' 
  | 'floating-card';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type BackgroundType = 'transparent' | 'gradient' | 'image' | 'solid' | 'curated';

export type TransitionEffect = 'fade' | 'slide-up' | 'slide-side' | 'zoom' | 'flip' | 'blur' | 'cut';

export type TextShadowStyle = 'none' | 'soft' | 'strong' | 'outline' | 'glow';

export interface DisplaySettings {
  fontFamily: FontFamily;
  fontSize: number; // in px
  refFontSize: number;
  textColor: string;
  textOpacity: number; // 0.1 to 1.0
  textAlign: TextAlign;
  position: PositionType;
  maxWidth: number; // in percentage e.g. 85
  
  // Background configuration
  backgroundType: BackgroundType;
  backgroundColor: string;
  gradientPreset: string;
  bgImageUrl: string;
  bgImageOpacity: number;
  bgBlur: number;
  
  // Box / Container styling
  showBoxBackground: boolean;
  boxBgColor: string;
  boxBgOpacity: number;
  boxBorderRadius: number;
  boxPadding: number;
  boxBorder: boolean;
  boxBorderColor: string;
  
  // Text Enhancement
  textShadow: TextShadowStyle;
  lineHeight: number;
  letterSpacing: string;
  isBold: boolean;
  isItalic: boolean;
  isUppercase: boolean;
  showQuotes: boolean;
  
  // Reference & Metadata
  showReference: boolean;
  showVersionBadge: boolean;
  versionText: string;
  referencePosition: 'inline-bottom' | 'top' | 'bottom-right' | 'badge-top';
  
  // Animation / Transition
  transitionEffect: TransitionEffect;
  transitionDuration: number; // seconds
}

export interface ActiveProjectionState {
  currentVerse: BibleVerse | null;
  selectedVerses: BibleVerse[];
  referenceDisplay: string;
  isLive: boolean;
  isBlank: boolean;
  isBlack: boolean;
  showLogo: boolean;
  logoUrl?: string;
  customOverlayText?: string;
  settings: DisplaySettings;
  timestamp: number;
}

export interface SavedFavorite {
  id: string;
  reference: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  notes?: string;
  tags?: string[];
  createdAt: number;
}

export interface ServicePlaylistItem {
  id: string;
  type: 'verse' | 'header' | 'note';
  title: string;
  verseData?: BibleVerse;
  reference?: string;
  note?: string;
}

export interface ServicePlaylist {
  id: string;
  name: string;
  description?: string;
  items: ServicePlaylistItem[];
  createdAt: number;
  updatedAt: number;
}

export interface BackgroundPreset {
  id: string;
  name: string;
  category: 'worship' | 'nature' | 'dark' | 'gradient' | 'minimal';
  type: 'image' | 'gradient';
  value: string; // url or css gradient
  thumbnail?: string;
}
