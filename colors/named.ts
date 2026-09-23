// Tier 1 — named colors. Every literal color value in the design system lives
// here and nowhere else. Nothing outside the theme definitions (themes.ts)
// and build-time config should ever reference these; components and apps
// speak `SemanticColor` (semantic.ts) instead.
//
// Alpha lives *in* the named color (`InkFaded` is Ink at 50%) — a theme never
// composes opacity on the fly. Rgba strings are spelled exactly as the old
// `withOpacity()` rendered them so snapshots stay stable through the
// migration. Every value that shipped before the token refactor keeps its own
// name (no near-duplicates merged yet — see the "unification pass" notes).
export const NamedColor = {
  // --- Neutrals: light-mode surfaces
  White: '#FFFFFF',
  Cream: '#FAF7F0',
  Linen: '#F2EDE2',
  Sand: '#D8D2C4',
  Stone: '#C7C2B8',

  // --- Neutrals: dark-mode surfaces
  Coal: '#1C1A17',
  Graphite: '#262320',
  Smoke: '#34302A',
  Taupe: '#4A443B',
  // The always-dark Luach panel gray — cooler than the dark theme's warm
  // browns, kept as its own color on purpose.
  PanelGray: '#313131',

  // --- Ink (warm near-black, light-mode text) and its alpha steps
  Ink: '#2A2521',
  InkFaded: 'rgba(42, 37, 33, 0.5)',
  InkFaded55: 'rgba(42, 37, 33, 0.55)',
  InkFaded60: 'rgba(42, 37, 33, 0.6)',
  InkFaded65: 'rgba(42, 37, 33, 0.65)',
  InkWash: 'rgba(42, 37, 33, 0.04)',
  InkHairline: 'rgba(30, 25, 20, 0.10)',

  // --- Parchment (warm off-white, dark-mode text) and its alpha steps
  Parchment: '#F0ECE4',
  ParchmentFaded: 'rgba(240, 236, 228, 0.5)',
  ParchmentFaded55: 'rgba(240, 236, 228, 0.55)',
  ParchmentFaded60: 'rgba(240, 236, 228, 0.6)',
  ParchmentFaded65: 'rgba(240, 236, 228, 0.65)',
  ParchmentWash: 'rgba(240, 236, 228, 0.04)',
  WhiteHairline: 'rgba(255, 255, 255, 0.12)',
  WhiteWash: 'rgba(255, 255, 255, 0.08)',

  // --- Black and its alpha steps (scrims, shadows)
  Black: '#000000',
  BlackScrim15: 'rgba(0, 0, 0, 0.15)',
  BlackScrim50: 'rgba(0, 0, 0, 0.5)',
  BlackScrim55: 'rgba(0, 0, 0, 0.55)',

  Transparent: 'rgba(255, 255, 255, 0)',

  // --- Brand blue and its variants
  SiddurBlue: '#3E7FD1',
  SiddurBlueLight: '#6FA3E8',
  SiddurBlueTint08: 'rgba(62, 127, 209, 0.08)',
  SiddurBlueTint10: 'rgba(62, 127, 209, 0.1)',
  SiddurBlueLightTint10: 'rgba(111, 163, 232, 0.1)',
  SiddurBlueLightTint60: 'rgba(111, 163, 232, 0.6)',
  SkyBlue: '#6ec6ff',
  PillBlue: '#3B7FB4',

  // --- Status hues
  DangerRed: '#f44336',
  DangerRedBright: '#EF4444',
  AlertOrange: '#F97316',
  AlertOrangeFaded: '#FDBA74',
  WarningYellow: '#FCD34D',
  InfoBlue: '#3B82F6',
  InfoBlueFaded: '#93C5FD',
  SuccessGreen: '#22C55E',
} as const

export type NamedColor = (typeof NamedColor)[keyof typeof NamedColor]
