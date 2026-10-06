# [0.14.0](https://github.com/BeezyWorks/design-system/compare/v0.13.0...v0.14.0) (2026-10-06)


### Bug Fixes

* **glass-surface:** size to content unless sized, web-safe text shadow ([d825aab](https://github.com/BeezyWorks/design-system/commit/d825aab913f46cceded4390309a73295d676a567))


### Features

* glass surface and page dots ([bf531a9](https://github.com/BeezyWorks/design-system/commit/bf531a9deda4243a4cfffa7a47f3893a4ac66791))
* **theme:** glass tokens for frosted panels ([2da3907](https://github.com/BeezyWorks/design-system/commit/2da390708ed662dd7ad5c68210afee09185c3a81))
* **typography:** display ramp, frank ruhl libre black, and text over photos ([5377d63](https://github.com/BeezyWorks/design-system/commit/5377d63320f81895af5f501efbe448346dbc441c))
* **view-pager:** controlled page, page callback, and rtl paging ([3d42461](https://github.com/BeezyWorks/design-system/commit/3d42461e6f4c9a00169be6dd8f25f0aa74b063bc))

# [0.13.0](https://github.com/BeezyWorks/design-system/compare/v0.12.0...v0.13.0) (2026-10-06)


### Bug Fixes

* **text:** lay out latin-containing labels ltr inside an rtl scope ([d3c1886](https://github.com/BeezyWorks/design-system/commit/d3c1886899f3d787a78f5041c57acebe96044e48))
* **theme:** soften the dark accent tint ([1433439](https://github.com/BeezyWorks/design-system/commit/1433439ad4e8b0d85819d121dd2a53e6a02df376))


### Features

* **header:** build titles from text variants and show a section chevron ([776f761](https://github.com/BeezyWorks/design-system/commit/776f761a546b2583b3062411e479163fd880d5da))
* **icon:** add text-size ([30c462e](https://github.com/BeezyWorks/design-system/commit/30c462e96ae83c8108358c865674b7e8f469f51a))
* **segmented-control:** use frank ruhl libre for every label ([e75f50e](https://github.com/BeezyWorks/design-system/commit/e75f50e9ef575648c5a528d07efa5c7fabbf9ff7))
* **stepper:** match the round slider steppers ([ef8a6ae](https://github.com/BeezyWorks/design-system/commit/ef8a6ae6640462eb0d0c9688138bdf5b07e786f4))
* **typography:** tighten the line spacing presets to 1.5x-2x ([1704011](https://github.com/BeezyWorks/design-system/commit/17040118b324d806588197f950551a2c44459fc0))

# [0.12.0](https://github.com/BeezyWorks/design-system/compare/v0.11.0...v0.12.0) (2026-09-30)


### Bug Fixes

* **segmented-control:** critically damped thumb spring, no overshoot ([79062fa](https://github.com/BeezyWorks/design-system/commit/79062fa07c77e32a39d27f1a2d2c314d687bca1b))
* **segmented-control:** measure labels unconstrained so segments fit the widest bold label ([23a03d8](https://github.com/BeezyWorks/design-system/commit/23a03d836dc57d0aa0101500df5f3fa1584ba8dd))
* **segmented-control:** primary ink for unselected labels to meet contrast ([b28bf4f](https://github.com/BeezyWorks/design-system/commit/b28bf4fc0619c3a26feb10feea5621dfe27331b3))
* **typography:** skip letter spacing for Hebrew reading text on iOS ([02e75f1](https://github.com/BeezyWorks/design-system/commit/02e75f1eac0be655bf75de4575e11ff1dccf2238))


### Features

* **cards:** right-to-left settings/menu cards with one type scale ([145b1d0](https://github.com/BeezyWorks/design-system/commit/145b1d090df0145d895669271c7a80ac1909cd06))
* **segmented-control:** redesign as a recessed iOS-style track with sliding thumb ([65ee174](https://github.com/BeezyWorks/design-system/commit/65ee1749d84997efdddb9b8d1c66e83f7d69d705))


### BREAKING CHANGES

* **cards:** the `subheader` type variant is removed; use
`supplemental`.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

# [0.11.0](https://github.com/BeezyWorks/design-system/compare/v0.10.0...v0.11.0) (2026-09-30)


### Features

* **icon:** add more-vertical icon ([b623f79](https://github.com/BeezyWorks/design-system/commit/b623f79f28fd09cca1d836b1bb517786d962f52f))

# [0.10.0](https://github.com/BeezyWorks/design-system/compare/v0.9.0...v0.10.0) (2026-09-25)


### Features

* **bottom-sheet-modal:** add opt-in fullScreen mode with close button ([956add6](https://github.com/BeezyWorks/design-system/commit/956add66d6b4b3bd9bb3a5077f2d9484e8af46c5))

# [0.9.0](https://github.com/BeezyWorks/design-system/compare/v0.8.0...v0.9.0) (2026-09-25)


### Features

* **icon:** add book-open and scroll-text icons ([59412c2](https://github.com/BeezyWorks/design-system/commit/59412c26e352f1672eb814dff5c03e8e3be90e36))

# [0.8.0](https://github.com/BeezyWorks/design-system/compare/v0.7.0...v0.8.0) (2026-09-24)


* feat(swatches)!: fix swatch size inside the components ([3e78a77](https://github.com/BeezyWorks/design-system/commit/3e78a779b56e436171ba1f682229f50a01a6a968))


### BREAKING CHANGES

* FontSwatch no longer takes `size`; FontSwatchPicker no longer
takes `swatchSize` or `columns` and always lays out a wrapping row of
fixed-size swatches; the `SWATCH_SIZE` export is removed. Remove those props
and the import from call sites.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

# [0.7.0](https://github.com/BeezyWorks/design-system/compare/v0.6.0...v0.7.0) (2026-09-24)


* feat(colors)!: apps own their brand; the design system derives the rest ([1783f6b](https://github.com/BeezyWorks/design-system/commit/1783f6bee04091f644b69589d4bacb6a910fb447))


### Bug Fixes

* **screen:** subtract the docked tab bar from web screen height ([4e4596d](https://github.com/BeezyWorks/design-system/commit/4e4596d5284f55624cb4b1f8a39da44e931bbe30))


### Features

* fixed-size FontSwatch and shared SWATCH_SIZE ([6d30a25](https://github.com/BeezyWorks/design-system/commit/6d30a25ce40a6281e3e64c4bf85d91efa0170c71))


### BREAKING CHANGES

* `brand` is required on DesignSystemProvider and takes a
BrandPalette ({primary: '#RRGGBB'}) instead of a Brand.* preset. Apps pass
their own. buildTheme/resolveColor take a brand argument, and
SemanticColor.AccentPrimaryBright is gone.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

# [0.6.0](https://github.com/BeezyWorks/design-system/compare/v0.5.0...v0.6.0) (2026-09-24)


### Features

* **typography:** set sectionHeader in Frank Ruhl Libre so Hebrew and English titles match ([5b34dd4](https://github.com/BeezyWorks/design-system/commit/5b34dd40f4cac7738ffadaaa4e617f18db08cd5b))

# [0.5.0](https://github.com/BeezyWorks/design-system/compare/v0.4.0...v0.5.0) (2026-09-24)


### Features

* **components:** add SearchField and a search icon ([6bf2b4f](https://github.com/BeezyWorks/design-system/commit/6bf2b4f17719cafef63e2f60dfc6c95c4fa42d5f))

# [0.4.0](https://github.com/BeezyWorks/design-system/compare/v0.3.0...v0.4.0) (2026-09-24)


### Features

* **components:** add an optional detail line to MenuItemRow ([1b59fc7](https://github.com/BeezyWorks/design-system/commit/1b59fc73b396620f56f00197f7a8e43c972b5fe6))

# [0.3.0](https://github.com/BeezyWorks/design-system/compare/v0.2.0...v0.3.0) (2026-09-24)


### Features

* **components:** add FontSwatch, the font picker card ([cecf097](https://github.com/BeezyWorks/design-system/commit/cecf0976081233d943603502e259308748b92f01))
* **components:** add ThemeSwatchPicker and FontSwatchPicker ([a4f3f6f](https://github.com/BeezyWorks/design-system/commit/a4f3f6f725c6d32a0f69882acd7e0faf48ae7813))
* **components:** square FontSwatch cards in an RTL-capable grid ([6cf9817](https://github.com/BeezyWorks/design-system/commit/6cf981772a3d124e3fc745f6c81c483a978b761f))

# [0.2.0](https://github.com/BeezyWorks/design-system/compare/v0.1.0...v0.2.0) (2026-09-24)


### Features

* **components:** add the pieces the Mishnah app was missing ([39b4a48](https://github.com/BeezyWorks/design-system/commit/39b4a487f04d10b5153d8264a929193df9620839))
* **theme:** add brands, a sepia mode and slider-friendly reading text ([0fd8e4d](https://github.com/BeezyWorks/design-system/commit/0fd8e4d3b5f5192b20c417a6ff5472a48bf30e8d))
