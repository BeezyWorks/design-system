import React from 'react'
import type {LatinTypeface, Typeface} from '../../typography'
import {FontSwatch} from '../FontSwatch'
import {Grid} from '../Grid'

export interface FontOption<T> {
  /** Stable id handed back through `onSelect`. */
  key: string
  label: string
  typeface: T
}

export type FontSwatchPickerProps = {
  selectedKey: string
  onSelect: (key: string) => void
  /** Swatches per row. Default 4. */
  columns?: number
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
  const {selectedKey, onSelect, columns = 4, rtl} = props
  return (
    <Grid columns={columns} gap="sm" rtl={rtl}>
      {props.script === 'hebrew'
        ? props.options.map((option) => (
            <FontSwatch
              key={option.key}
              script="hebrew"
              typeface={option.typeface}
              label={option.label}
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
              selected={option.key === selectedKey}
              onPress={() => onSelect(option.key)}
            />
          ))}
    </Grid>
  )
}
