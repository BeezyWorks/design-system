import {NamedColor} from './named'
import type {BrandPalette, HexColor, ResolvedBrand} from './brands'

// A brand is one color — the "500" — and the rest of its scale is derived
// here, in OKLCH (perceptually even lightness, so hue holds steady as the
// lightness moves). Pure math, no dependencies.
//
//  - `primaryLight` is the hue lifted until it reads on dark surfaces.
//  - `deep` is the hue dropped darker, still able to carry light text.
//  - `marker` / `markerLight` are the hue at mid lightness, for small marks
//    set among body text (pasuk numbers): as far from `TextPrimary` as the
//    background allows, while still AA on it.
//
// All are anchored on contrast rather than a fixed lightness step, so they
// hold up for any primary, not just the ones we happened to test.

const HEX = /^#[0-9a-fA-F]{6}$/

// What the derived colors must work against. These mirror the dark theme's
// `SurfaceBackground` and `TextPrimary`, and `TextOnAccent` for the primary.
const ON_DARK_SURFACE = NamedColor.Coal
const TEXT_ON_DARK = NamedColor.Parchment
const TEXT_ON_ACCENT = NamedColor.White
// The darkest light-mode surface (sepia paper), so `marker` holds on all of them.
const ON_LIGHT_SURFACE = NamedColor.SepiaPaper

/** `primaryLight` against dark surfaces: WCAG AAA for text. */
const LIGHT_MIN_CONTRAST = 7
/** `deep` against `TextPrimary` in dark mode. */
const DEEP_MIN_CONTRAST = 5
/** `marker`/`markerLight` against their surfaces: WCAG AA for text. */
const MARKER_MIN_CONTRAST = 4.5
/** `primary` against `TextOnAccent`: the WCAG floor for UI components. */
const PRIMARY_MIN_CONTRAST = 3

/** `primaryLight` is at least this much lighter than `primary` (OKLCH L). */
const LIGHT_MIN_LIFT = 0.06
/** `deep` starts this much darker than `primary` (OKLCH L). */
const DEEP_DROP = 0.12
const DEEP_MIN_L = 0.1
const LIGHT_MAX_L = 0.98
const STEP = 0.005

type Rgb = [number, number, number]
interface Oklch {
  L: number
  C: number
  H: number
}

const parse = (hex: string): Rgb =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as Rgb

const toLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
const fromLinear = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055

const toOklch = (hex: string): Oklch => {
  const [r, g, b] = parse(hex).map(toLinear)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return {L, C: Math.hypot(a, bb), H: Math.atan2(bb, a)}
}

const oklchToLinear = ({L, C, H}: Oklch): Rgb => {
  const a = C * Math.cos(H)
  const b = C * Math.sin(H)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

const inGamut = (rgb: Rgb) => rgb.every((v) => v >= -1e-4 && v <= 1 + 1e-4)

/** The hex for an OKLCH color, easing chroma down until it fits sRGB. */
const toHex = (color: Oklch): HexColor => {
  let C = color.C
  let rgb = oklchToLinear({...color, C})
  while (!inGamut(rgb) && C > 0) {
    C = Math.max(0, C - 0.002)
    rgb = oklchToLinear({...color, C})
  }
  const channel = (v: number) =>
    Math.round(Math.min(1, Math.max(0, fromLinear(Math.max(0, v)))) * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${rgb.map(channel).join('')}`.toUpperCase() as HexColor
}

const luminance = (hex: string) => {
  const [r, g, b] = parse(hex).map(toLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const contrastRatio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const assertHex = (slot: string, value: unknown) => {
  if (typeof value !== 'string' || !HEX.test(value)) {
    throw new Error(
      `Invalid brand: \`${slot}\` must be a #RRGGBB color, got ${JSON.stringify(
        value,
      )}.`,
    )
  }
}

const deriveLight = (primary: Oklch): HexColor => {
  const C = primary.C * 0.9
  let L = Math.min(primary.L + LIGHT_MIN_LIFT, LIGHT_MAX_L)
  while (
    L < LIGHT_MAX_L &&
    contrastRatio(toHex({L, C, H: primary.H}), ON_DARK_SURFACE) <
      LIGHT_MIN_CONTRAST
  ) {
    L += STEP
  }
  return toHex({L, C, H: primary.H})
}

const deriveDeep = (primary: Oklch): HexColor => {
  const C = primary.C * 0.95
  let L = Math.max(primary.L - DEEP_DROP, DEEP_MIN_L)
  while (
    L > DEEP_MIN_L &&
    contrastRatio(toHex({L, C, H: primary.H}), TEXT_ON_DARK) < DEEP_MIN_CONTRAST
  ) {
    L -= STEP
  }
  return toHex({L, C, H: primary.H})
}

// Walks lightness from `from` toward `surface` (`step`'s sign) for as long
// as the color still holds `MARKER_MIN_CONTRAST` against it, and returns the
// last one that did. A `from` that already fails is first walked away until
// it passes.
const deriveMarker = (from: Oklch, surface: string, step: number): HexColor => {
  let L = from.L
  const at = (l: number) => toHex({L: l, C: from.C, H: from.H})
  while (
    L - step > 0 &&
    L - step < 1 &&
    contrastRatio(at(L), surface) < MARKER_MIN_CONTRAST
  ) {
    L -= step
  }
  while (
    L + step > 0 &&
    L + step < 1 &&
    contrastRatio(at(L + step), surface) >= MARKER_MIN_CONTRAST
  ) {
    L += step
  }
  return at(L)
}

const cache = new WeakMap<BrandPalette, ResolvedBrand>()

/** A brand's full scale: what the app passed, plus the rest derived from
 * `primary`. Throws on a malformed or unusable brand. Memoized per object. */
export const resolveBrand = (brand: BrandPalette): ResolvedBrand => {
  const cached = cache.get(brand)
  if (cached) return cached

  assertHex('primary', brand.primary)
  if (brand.primaryLight !== undefined) {
    assertHex('primaryLight', brand.primaryLight)
  }
  if (brand.deep !== undefined) assertHex('deep', brand.deep)

  const onAccent = contrastRatio(brand.primary, TEXT_ON_ACCENT)
  if (onAccent < PRIMARY_MIN_CONTRAST) {
    throw new Error(
      `Invalid brand: \`primary\` (${brand.primary}) is too light to carry ` +
        `white text — it needs at least ${PRIMARY_MIN_CONTRAST}:1 against ` +
        `white, got ${onAccent.toFixed(2)}:1. Pick a darker hue.`,
    )
  }

  if (brand.marker !== undefined) assertHex('marker', brand.marker)
  if (brand.markerLight !== undefined) {
    assertHex('markerLight', brand.markerLight)
  }

  const primary = toOklch(brand.primary)
  const primaryLight = brand.primaryLight ?? deriveLight(primary)
  const resolved: ResolvedBrand = {
    primary: brand.primary,
    primaryLight,
    deep: brand.deep ?? deriveDeep(primary),
    marker: brand.marker ?? deriveMarker(primary, ON_LIGHT_SURFACE, STEP),
    markerLight:
      brand.markerLight ??
      deriveMarker(toOklch(primaryLight), ON_DARK_SURFACE, -STEP),
  }
  cache.set(brand, resolved)
  return resolved
}
