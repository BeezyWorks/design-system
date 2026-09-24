import React from 'react'
import type {LatinTypeface, Typeface} from '../../typography'
import {FontSwatch} from '../FontSwatch'
import {Grid} from '../Grid'
import {Stack} from '../Stack'

export interface FontOption<T> {
  /** Stable id handed back through `onSelect`. */
  key: string
  label: string
  typeface: T
}

export type FontSwatchPickerProps = {
  selectedKey: string
  onSelect: (key: string) => void
  /** Swatches per row. Default 4. Ignored when `swatchSize` is set. */
  columns?: number
  /** Fixed swatch edge length. Lays the swatches out as a wrapping row of
   * that size (e.g. `SWATCH_SIZE`, to match `ThemeSwatchPicker`) instead of
   * a column-filling `Grid`. */
  swatchSize?: number
  /** Fill right to left (first option top-right). */
  rtl?: boolean
} & (
  | {script: 'hebrew'; options: FontOption<Typeface>[]}
  | {script: 'latin'; options: FontOption<LatinTypeface>[]}
)

/** A `Grid` of `FontSwatch`es — the Hebrew or Latin font picker for a
 * settings screen. Controlled: pass the selected option's key and handle
 * `onSelect`. */
export const FontSwatchPicker: React.FunctionComponent<
  FontSwatchPickerProps
> = (props) => {
  const {selectedKey, onSelect, columns = 4, swatchSize, rtl} = props
  const swatches =
    props.script === 'hebrew'
      ? props.options.map((option) => (
          <FontSwatch
            key={option.key}
            script="hebrew"
            typeface={option.typeface}
            label={option.label}
            size={swatchSize}
            selected={option.key === selectedKey}
            onPress={() => onSelect(option.key)}
          />
        ))
      : props.options.map((option) => (
          <FontSwatch
            key={option.key}
            script="latin"
            typeface={option.typeface}
            label={option.label}
            size={swatchSize}
            selected={option.key === selectedKey}
            onPress={() => onSelect(option.key)}
          />
        ))

  return swatchSize ? (
    <Stack direction={rtl ? 'rowReverse' : 'row'} gap="md" wrap>
      {swatches}
    </Stack>
  ) : (
    <Grid columns={columns} gap="sm" rtl={rtl}>
      {swatches}
    </Grid>
  )
}
