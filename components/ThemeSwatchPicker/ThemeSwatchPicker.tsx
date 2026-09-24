import React from 'react'
import type {ThemeMode} from '../../colors'
import {ScrollStack} from '../ScrollStack'
import {Stack} from '../Stack'
import {ThemeSwatch} from '../ThemeSwatch'

export type ThemeSwatchValue = ThemeMode | 'system'

export interface ThemeSwatchPickerProps {
  value: ThemeSwatchValue
  onChange: (value: ThemeSwatchValue) => void
  /** Which modes to offer, in order. Default light, sepia, dark, system. */
  modes?: ThemeSwatchValue[]
  /** Overrides the default labels (`Light`, `Sepia`, `Dark`, `System`) —
   * e.g. `{light: 'White', dark: 'Black'}`. */
  labels?: Partial<Record<ThemeSwatchValue, string>>
  /** The sample glyph on each swatch. Default `Aa`. */
  glyph?: string
  /** Lay the row out right to left, opening at the right edge. */
  rtl?: boolean
}

const DEFAULT_MODES: ThemeSwatchValue[] = ['light', 'sepia', 'dark', 'system']
const DEFAULT_LABELS: Record<ThemeSwatchValue, string> = {
  light: 'Light',
  sepia: 'Sepia',
  dark: 'Dark',
  system: 'System',
}

/** A scrolling row of `ThemeSwatch`es — the appearance picker for a settings
 * screen. Controlled: pass the current mode and handle `onChange`. */
export const ThemeSwatchPicker: React.FunctionComponent<
  ThemeSwatchPickerProps
> = ({value, onChange, modes = DEFAULT_MODES, labels, glyph, rtl}) => (
  <ScrollStack
    horizontal
    rtl={rtl}
    grow
    showsHorizontalScrollIndicator={false}
  >
    <Stack
      direction={rtl ? 'rowReverse' : 'row'}
      grow
      gap="md"
      paddingVertical="xs"
    >
      {modes.map((mode) => (
        <ThemeSwatch
          key={mode}
          mode={mode}
          glyph={glyph}
          label={labels?.[mode] ?? DEFAULT_LABELS[mode]}
          selected={value === mode}
          onPress={() => onChange(mode)}
        />
      ))}
    </Stack>
  </ScrollStack>
)
