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
