import React from 'react'
import {appearanceOf} from '../../colors'
import type {ThemeMode} from '../../colors'
import {ScrollStack} from '../ScrollStack'
import {Stack} from '../Stack'
import {SystemModes, ThemeSwatch} from '../ThemeSwatch'
import {useRtl} from '../../layout'
import {spacing} from '../../spacing'

export type ThemeSwatchValue = ThemeMode | 'system'

export interface ThemeSwatchPickerProps {
  /** The selected mode — or several, e.g. the light and dark modes a
   * "system" setting follows, each drawn selected. */
  value: ThemeSwatchValue | readonly ThemeSwatchValue[]
  onChange: (value: ThemeSwatchValue) => void
  /** Which modes to offer, in order. Default light, sepia, dark, black,
   * system. The light modes and the dark ones are set apart by a wider gap. */
  modes?: ThemeSwatchValue[]
  /** Overrides the default labels (`Light`, `Sepia`, `Dark`, `Black`,
   * `System`) — e.g. `{light: 'White', black: 'OLED'}`. */
  labels?: Partial<Record<ThemeSwatchValue, string>>
  /** The sample glyph on each swatch. Default `Aa`. */
  glyph?: string
  /** The modes the `system` swatch splits between. Default light and dark. */
  systemModes?: SystemModes
  /** Lay the row out right to left, opening at the right edge. Defaults to
   * the enclosing `RtlScope`. */
  rtl?: boolean
}

const DEFAULT_MODES: ThemeSwatchValue[] = [
  'light',
  'sepia',
  'dark',
  'black',
  'system',
]
const DEFAULT_LABELS: Record<ThemeSwatchValue, string> = {
  light: 'Light',
  sepia: 'Sepia',
  dark: 'Dark',
  black: 'Black',
  system: 'System',
}

const groupOf = (mode: ThemeSwatchValue) =>
  mode === 'system' ? mode : appearanceOf(mode)

/** A scrolling row of `ThemeSwatch`es — the appearance picker for a settings
 * screen. Controlled: pass the current mode and handle `onChange`. */
export const ThemeSwatchPicker: React.FunctionComponent<
  ThemeSwatchPickerProps
> = ({
  value,
  onChange,
  modes = DEFAULT_MODES,
  labels,
  glyph,
  systemModes,
  rtl: rtlProp,
}) => {
  const rtl = useRtl(rtlProp)
  const selected: readonly ThemeSwatchValue[] =
    typeof value === 'string' ? [value] : value
  return (
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
        {modes.map((mode, i) => (
          <React.Fragment key={mode}>
            {i > 0 && groupOf(modes[i - 1]) !== groupOf(mode) && (
              <Stack width={spacing.xs} />
            )}
            <ThemeSwatch
              mode={mode}
              glyph={glyph}
              systemModes={systemModes}
              label={labels?.[mode] ?? DEFAULT_LABELS[mode]}
              selected={selected.includes(mode)}
              onPress={() => onChange(mode)}
            />
          </React.Fragment>
        ))}
      </Stack>
    </ScrollStack>
  )
}
