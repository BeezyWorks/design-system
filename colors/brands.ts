import {NamedColor} from './named'

// A brand is the handful of named colors that tell one app in the family
// from another. It is tier 1 (named colors), not tier 2: the themes map the
// brand-derived semantic tokens (`AccentPrimary`, `TextAccent`, the tints…)
// onto these slots, exactly as they map every other token onto a named
// color. Surfaces, text, borders and status colors are deliberately *not*
// part of a brand — sharing them is what makes the apps feel related.
export interface BrandPalette {
  /** The brand hue on light and sepia surfaces; also the strong fill that
   * carries `TextOnAccent` in every mode. */
  primary: NamedColor
  /** The brand hue lifted for dark surfaces. */
  primaryLight: NamedColor
  /** A brighter accent for small, vivid marks. */
  bright: NamedColor
  /** A deep companion hue (e.g. the far end of a brand gradient). */
  deep: NamedColor
  /** Quiet wash of `primary` (hovered/selected backgrounds, light modes). */
  tint: NamedColor
  /** A slightly stronger wash of `primary`. */
  tintSelected: NamedColor
  /** Quiet wash of `primaryLight` (dark mode). */
  lightTint: NamedColor
  /** Strong wash of `primaryLight` (dark mode focus backgrounds). */
  lightTintStrong: NamedColor
}

const C = NamedColor

/** The brands the design system ships. An app passes one to
 * `DesignSystemProvider`; `Brand.Blue` is the default. */
export const Brand = {
  Blue: {
    primary: C.BrandBlue,
    primaryLight: C.BrandBlueLight,
    bright: C.SkyBlue,
    deep: C.DeepBlue,
    tint: C.BrandBlueTint08,
    tintSelected: C.BrandBlueTint10,
    lightTint: C.BrandBlueLightTint10,
    lightTintStrong: C.BrandBlueLightTint60,
  },
  Gold: {
    primary: C.BrandGold,
    primaryLight: C.BrandGoldLight,
    bright: C.Honey,
    deep: C.Oxblood,
    tint: C.BrandGoldTint08,
    tintSelected: C.BrandGoldTint10,
    lightTint: C.BrandGoldLightTint10,
    lightTintStrong: C.BrandGoldLightTint60,
  },
} as const satisfies Record<string, BrandPalette>
