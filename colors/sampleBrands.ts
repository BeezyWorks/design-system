import type {BrandPalette} from './brands'

// Fixtures for the design system's own tests and Storybook — two hues so the
// brand-vs-shared split can be checked. Not exported from the package: an app
// defines its own brand and passes it to `DesignSystemProvider`.
export const sampleBrands = {
  Blue: {primary: '#3E7FD1'},
  Gold: {primary: '#9C7A2E'},
} as const satisfies Record<string, BrandPalette>

/** The default fixture brand for tests that don't care which. */
export const testBrand: BrandPalette = sampleBrands.Blue
