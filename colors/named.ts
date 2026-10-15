// Tier 1 — named colors. Every literal color value in the design system lives
// here and nowhere else. Nothing outside the theme definitions (themes.ts)
// and build-time config should ever reference these; components and apps
// speak `SemanticColor` (semantic.ts) instead.
//
// Alpha lives *in* the named color (`InkFaded` is Ink at 50%). The one
// exception is a brand's washes (`AccentTint*`), which themes.ts derives from
// the brand's three colors. The brand itself is *not* here: each app owns its
// own hue and passes it in (colors/brands.ts). Status hues (`InfoBlue`…) are
// shared by every app and never brand-derived.
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
  InkTrack: 'rgba(42, 37, 33, 0.07)',

  // --- Sepia ink (brown, sepia-mode text) and its alpha steps
  SepiaInk: '#4A3826',
  SepiaInkFaded: 'rgba(74, 56, 38, 0.5)',
  SepiaInkFaded60: 'rgba(74, 56, 38, 0.6)',
  SepiaInkWash: 'rgba(74, 56, 38, 0.04)',
  SepiaInkHairline: 'rgba(74, 56, 38, 0.12)',
  SepiaInkTrack: 'rgba(74, 56, 38, 0.08)',

  // --- Parchment (warm off-white, dark-mode text) and its alpha steps
  Parchment: '#F0ECE4',
  ParchmentFaded: 'rgba(240, 236, 228, 0.5)',
  ParchmentFaded60: 'rgba(240, 236, 228, 0.6)',
  ParchmentWash: 'rgba(240, 236, 228, 0.04)',
  WhiteHairline: 'rgba(255, 255, 255, 0.12)',
  WhiteWash: 'rgba(255, 255, 255, 0.08)',
  // A translucent white chip laid over a brand fill — reads on any hue.
  WhiteTint18: 'rgba(255, 255, 255, 0.18)',

  // --- Glass: the tint over a backdrop blur, per mode. The *Opaque steps
  // stand in where the platform can't blur (Android), so text stays legible
  // over a photo without it.
  GlassFrost: 'rgba(250, 247, 240, 0.5)',
  GlassFrostOpaque: 'rgba(250, 247, 240, 0.88)',
  GlassSepia: 'rgba(239, 225, 196, 0.55)',
  GlassSepiaOpaque: 'rgba(239, 225, 196, 0.9)',
  GlassSmoke: 'rgba(24, 20, 17, 0.34)',
  GlassSmokeOpaque: 'rgba(24, 20, 17, 0.8)',
  GlassEdgeLight: 'rgba(255, 255, 255, 0.65)',
  GlassEdgeDark: 'rgba(255, 255, 255, 0.18)',
  GlassSheenLight: 'rgba(255, 255, 255, 0.35)',
  GlassSheenDark: 'rgba(255, 255, 255, 0.08)',

  // --- Black and its alpha steps (scrims, shadows)
  Black: '#000000',
  BlackScrim15: 'rgba(0, 0, 0, 0.15)',
  BlackScrim50: 'rgba(0, 0, 0, 0.5)',
  BlackScrim55: 'rgba(0, 0, 0, 0.55)',

  Transparent: 'rgba(255, 255, 255, 0)',

  // --- Categorical hues: 18 distinguishable hues for telling items apart
  // (commentaries, series). `CategoryN` carries text on every light surface
  // (>= 4.5:1 on sepia paper); `CategoryNLight` carries it on dark surfaces
  // (>= 7:1 on the dark card). Consecutive steps are a golden angle apart in
  // hue, so neighbours in a list never look alike.
  Category1: '#0267B1',
  Category1Light: '#6AB3FD',
  Category2: '#AF3D35',
  Category2Light: '#FA9184',
  Category3: '#047252',
  Category3Light: '#45C395',
  Category4: '#7A4FAF',
  Category4Light: '#C39EF7',
  Category5: '#855E00',
  Category5Light: '#DAA542',
  Category6: '#036D83',
  Category6Light: '#15BEE0',
  Category7: '#A73B6D',
  Category7Light: '#F590B8',
  Category8: '#417101',
  Category8Light: '#8BBC63',
  Category9: '#475EBC',
  Category9Light: '#91ABFE',
  Category10: '#A74901',
  Category10Light: '#F59867',
  Category11: '#057168',
  Category11Light: '#0EC3B4',
  Category12: '#90469A',
  Category12Light: '#DA96E3',
  Category13: '#736503',
  Category13Light: '#C1AF41',
  Category14: '#016B9A',
  Category14Light: '#50B9F6',
  Category15: '#AE3B4C',
  Category15Light: '#FC9099',
  Category16: '#03743B',
  Category16Light: '#62C181',
  Category17: '#6A55B8',
  Category17Light: '#B0A2FE',
  Category18: '#8F5701',
  Category18Light: '#E7A04D',

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

  // --- Sign-in providers. Third-party marks: Google's and Apple's button
  // guidelines fix these values, so they are never brand- or mode-derived
  // beyond the light/dark variants each guideline specifies.
  GoogleBlue: '#4285F4',
  GoogleGreen: '#34A853',
  GoogleYellow: '#FBBC05',
  GoogleRed: '#EA4335',
  GoogleButtonStroke: '#747775',
  GoogleButtonInk: '#1F1F1F',
  GoogleButtonDark: '#131314',
  GoogleButtonStrokeDark: '#8E918F',
  GoogleButtonInkDark: '#E3E3E3',
} as const

export type NamedColor = (typeof NamedColor)[keyof typeof NamedColor]
