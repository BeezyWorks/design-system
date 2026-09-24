// A brand is one color: the app's hue at "500". The design system does not
// ship any — each app owns its hue and passes it to `DesignSystemProvider`,
// and the rest of the scale is derived from it (colors/derive.ts). Define it
// once at module scope (the themes are memoized per object). Surfaces, text,
// borders and status colors — info blue included — are deliberately *not*
// part of a brand; sharing them is what makes the apps feel related.

/** A `#RRGGBB` color. */
export type HexColor = `#${string}`

export interface BrandPalette {
  /** The brand hue on light and sepia surfaces; also the strong fill that
   * carries `TextOnAccent` in every mode, so it needs at least 3:1 against
   * white. */
  primary: HexColor
  /** The hue lifted for dark surfaces. Derived (≥ 7:1 on dark surfaces)
   * unless the app hand-tunes it. */
  primaryLight?: HexColor
  /** A darker companion of the same hue (the far end of the brand gradient,
   * deep fills). Derived (holds `TextPrimary` at ≥ 5:1) unless hand-tuned. */
  deep?: HexColor
}

/** A brand with every slot filled in — what the themes are built from. */
export type ResolvedBrand = Required<BrandPalette>
