import React from 'react'
import type {LatinTypeface, Typeface} from '../../typography'
import {FontSwatch} from '../FontSwatch'
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
  /** Fill right to left (first option top-right). */
  rtl?: boolean
} & (
  | {script: 'hebrew'; options: FontOption<Typeface>[]}
  | {script: 'latin'; options: FontOption<LatinTypeface>[]}
)

/** A wrapping row of `FontSwatch`es — the Hebrew or Latin font picker for a
 * settings screen. Controlled: pass the selected option's key and handle
 * `onSelect`. */
export const FontSwatchPicker: React.FunctionComponent<
  FontSwatchPickerProps
> = (props) => {
  const {selectedKey, onSelect, rtl} = props
  const swatches =
    props.script === 'hebrew'
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
        ))

  return (
    <Stack direction={rtl ? 'rowReverse' : 'row'} gap="md" wrap>
      {swatches}
    </Stack>
  )
}
