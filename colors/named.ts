// Tier 1 — named colors. Every literal color value in the design system lives
// here and nowhere else. Nothing outside the theme definitions (themes.ts)
// and build-time config should ever reference these; components and apps
// speak `SemanticColor` (semantic.ts) instead.
//
// Alpha lives *in* the named color (`InkFaded` is Ink at 50%) — a theme never
// composes opacity on the fly. Values that predate the token refactor keep
// their own names; near-duplicates such as the four blues are deliberately
// not merged yet.
export const NamedColor = {
  // --- Neutrals: light-mode surfaces
  White: '#FFFFFF',
  Cream: '#FAF7F0',
  Linen: '#F2EDE2',
  Sand: '#D8D2C4',
  Stone: '#C7C2B8',

  // --- Neutrals: sepia-mode surfaces (warm paper for long reading)
  SepiaPaper: '#EFE1C4',
  SepiaCard: '#F7EDD6',
  SepiaLinen: '#E7D6AF',
  SepiaSand: '#DECBA0',

  // --- Neutrals: dark-mode surfaces
  Coal: '#1C1A17',
  Graphite: '#262320',
  Smoke: '#34302A',
  Taupe: '#4A443B',
  // A cool panel gray that stays the same in both modes — cooler than the
  // dark theme's warm
  // browns, kept as its own color on purpose.
  PanelGray: '#313131',

  // --- Ink (warm near-black, light-mode text) and its alpha steps
  Ink: '#2A2521',
  InkFaded: 'rgba(42, 37, 33, 0.5)',
  InkFaded60: 'rgba(42, 37, 33, 0.6)',
  InkWash: 'rgba(42, 37, 33, 0.04)',
  InkHairline: 'rgba(30, 25, 20, 0.10)',

  // --- Sepia ink (brown, sepia-mode text) and its alpha steps
  SepiaInk: '#4A3826',
  SepiaInkFaded: 'rgba(74, 56, 38, 0.5)',
  SepiaInkFaded60: 'rgba(74, 56, 38, 0.6)',
  SepiaInkWash: 'rgba(74, 56, 38, 0.04)',
  SepiaInkHairline: 'rgba(74, 56, 38, 0.12)',

  // --- Parchment (warm off-white, dark-mode text) and its alpha steps
  Parchment: '#F0ECE4',
  ParchmentFaded: 'rgba(240, 236, 228, 0.5)',
  ParchmentFaded60: 'rgba(240, 236, 228, 0.6)',
  ParchmentWash: 'rgba(240, 236, 228, 0.04)',
  WhiteHairline: 'rgba(255, 255, 255, 0.12)',
  WhiteWash: 'rgba(255, 255, 255, 0.08)',
  // A translucent white chip laid over a brand fill — reads on any hue.
  WhiteTint18: 'rgba(255, 255, 255, 0.18)',

  // --- Black and its alpha steps (scrims, shadows)
  Black: '#000000',
  BlackScrim15: 'rgba(0, 0, 0, 0.15)',
  BlackScrim50: 'rgba(0, 0, 0, 0.5)',
  BlackScrim55: 'rgba(0, 0, 0, 0.55)',

  Transparent: 'rgba(255, 255, 255, 0)',

  // --- Brand hues. Each app picks one brand (colors/brands.ts); these are
  // the only per-app colors — surfaces, text and status are shared.

  // Brand blue and its variants
  BrandBlue: '#3E7FD1',
  BrandBlueLight: '#6FA3E8',
  BrandBlueTint08: 'rgba(62, 127, 209, 0.08)',
  BrandBlueTint10: 'rgba(62, 127, 209, 0.1)',
  BrandBlueLightTint10: 'rgba(111, 163, 232, 0.1)',
  BrandBlueLightTint60: 'rgba(111, 163, 232, 0.6)',
  SkyBlue: '#6ec6ff',
  DeepBlue: '#3B7FB4',

  // Brand gold (sefer-leather) and its variants
  BrandGold: '#9C7A2E',
  BrandGoldLight: '#D4AF6A',
  BrandGoldTint08: 'rgba(156, 122, 46, 0.08)',
  BrandGoldTint10: 'rgba(156, 122, 46, 0.1)',
  BrandGoldLightTint10: 'rgba(212, 175, 106, 0.1)',
  BrandGoldLightTint60: 'rgba(212, 175, 106, 0.6)',
  Honey: '#E0B85C',
  Oxblood: '#6E2C2C',

  // --- Status hues
  DangerRed: '#f44336',
  DangerRedBright: '#EF4444',
  AlertOrange: '#F97316',
  AlertOrangeFaded: '#FDBA74',
  WarningYellow: '#FCD34D',
  InfoBlue: '#3B82F6',
  InfoBlueFaded: '#93C5FD',
  SuccessGreen: '#22C55E',
  // Success as text and as a quiet tint behind it (badges, "done" states).
  SuccessGreenDeep: '#3F7D4F',
  SuccessGreenDeepTint: 'rgba(63, 125, 79, 0.14)',
  SuccessGreenLight: '#7FBE8E',
  SuccessGreenLightTint: 'rgba(127, 190, 142, 0.16)',
} as const

export type NamedColor = (typeof NamedColor)[keyof typeof NamedColor]
