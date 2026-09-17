import { BackgroundPreset, DisplaySettings } from '../types';

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'transparent-obs',
    name: 'Transparente (Ideal OBS)',
    category: 'minimal',
    type: 'gradient',
    value: 'transparent',
    thumbnail: 'linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)'
  },
  {
    id: 'worship-deep-navy',
    name: 'Noche de Adoración',
    category: 'worship',
    type: 'gradient',
    value: 'linear-gradient(135deg, #0a1128 0%, #1c1f3b 50%, #080710 100%)',
    thumbnail: 'linear-gradient(135deg, #0a1128 0%, #1c1f3b 50%, #080710 100%)'
  },
  {
    id: 'golden-glory',
    name: 'Gloria Celestial',
    category: 'worship',
    type: 'gradient',
    value: 'radial-gradient(ellipse at top, #2b1f07 0%, #140d04 50%, #050301 100%)',
    thumbnail: 'radial-gradient(ellipse at top, #b45309 0%, #78350f 50%, #050301 100%)'
  },
  {
    id: 'heavenly-emerald',
    name: 'Aguas de Reposo',
    category: 'worship',
    type: 'gradient',
    value: 'linear-gradient(135deg, #062c24 0%, #0f172a 60%, #021a15 100%)',
    thumbnail: 'linear-gradient(135deg, #047857 0%, #0f172a 60%, #064e3b 100%)'
  },
  {
    id: 'royal-purple',
    name: 'Majestad Púrpura',
    category: 'worship',
    type: 'gradient',
    value: 'linear-gradient(140deg, #1e082b 0%, #0d0b24 50%, #04030a 100%)',
    thumbnail: 'linear-gradient(140deg, #6b21a8 0%, #312e81 50%, #04030a 100%)'
  },
  {
    id: 'dark-obsidian',
    name: 'Negro Cine Mate',
    category: 'dark',
    type: 'gradient',
    value: 'linear-gradient(180deg, #121316 0%, #090a0c 100%)',
    thumbnail: 'linear-gradient(180deg, #1f2937 0%, #030712 100%)'
  },
  {
    id: 'img-worship-mountain',
    name: 'Montes & Horizonte',
    category: 'nature',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'img-worship-light',
    name: 'Rayos de Luz',
    category: 'worship',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'img-worship-sky',
    name: 'Cielo Crepuscular',
    category: 'nature',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'img-church-stained-glass',
    name: 'Vitral Sagrado',
    category: 'worship',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1548625361-195fe5742f1a?q=80&w=1600&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1548625361-195fe5742f1a?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'img-stars-cosmos',
    name: 'Cielos Cuentan su Gloria',
    category: 'dark',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=300&auto=format&fit=crop'
  }
];

export const DEFAULT_DISPLAY_SETTINGS: DisplaySettings = {
  fontFamily: 'Playfair Display',
  fontSize: 34,
  refFontSize: 20,
  textColor: '#ffffff',
  textOpacity: 1,
  textAlign: 'center',
  position: 'center',
  maxWidth: 86,

  // Background
  backgroundType: 'gradient',
  backgroundColor: '#0a1128',
  gradientPreset: 'linear-gradient(135deg, #0a1128 0%, #1c1f3b 50%, #080710 100%)',
  bgImageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
  bgImageOpacity: 0.35,
  bgBlur: 3,

  // Container Box
  showBoxBackground: true,
  boxBgColor: '#000000',
  boxBgOpacity: 0.65,
  boxBorderRadius: 16,
  boxPadding: 32,
  boxBorder: true,
  boxBorderColor: 'rgba(217, 119, 6, 0.3)',

  // Text Styling
  textShadow: 'outline',
  lineHeight: 1.5,
  letterSpacing: 'normal',
  isBold: false,
  isItalic: false,
  isUppercase: false,
  showQuotes: true,

  // Reference
  showReference: true,
  showVersionBadge: true,
  versionText: 'RVR1960',
  referencePosition: 'inline-bottom',

  // Animation
  transitionEffect: 'slide-up',
  transitionDuration: 0.45
};

export const LOWER_THIRD_PRESET: DisplaySettings = {
  fontFamily: 'Outfit',
  fontSize: 26,
  refFontSize: 17,
  textColor: '#ffffff',
  textOpacity: 1,
  textAlign: 'left',
  position: 'lower-third',
  maxWidth: 92,

  backgroundType: 'transparent',
  backgroundColor: 'transparent',
  gradientPreset: 'transparent',
  bgImageUrl: '',
  bgImageOpacity: 0,
  bgBlur: 0,

  showBoxBackground: true,
  boxBgColor: '#090d16',
  boxBgOpacity: 0.88,
  boxBorderRadius: 12,
  boxPadding: 22,
  boxBorder: true,
  boxBorderColor: '#eab308',

  textShadow: 'soft',
  lineHeight: 1.4,
  letterSpacing: 'normal',
  isBold: false,
  isItalic: false,
  isUppercase: false,
  showQuotes: false,

  showReference: true,
  showVersionBadge: true,
  versionText: 'RVR1960',
  referencePosition: 'bottom-right',

  transitionEffect: 'slide-up',
  transitionDuration: 0.4
};
