import React from 'react'
import type {LatinTypeface, Typeface} from '../../typography'
import {FontSwatch} from '../FontSwatch'
import {ScrollStack} from '../ScrollStack'
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
  /** Lay the row out right to left, opening at the right edge. */
  rtl?: boolean
} & (
  | {script: 'hebrew'; options: FontOption<Typeface>[]}
  | {script: 'latin'; options: FontOption<LatinTypeface>[]}
)

/** A scrolling row of `FontSwatch`es — the Hebrew or Latin font picker for a
 * settings screen. Controlled: pass the selected option's key and handle
 * `onSelect`. */
export const FontSwatchPicker: React.FunctionComponent<
  FontSwatchPickerProps
> = (props) => {
  const {selectedKey, onSelect, rtl} = props
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
        gap="sm"
        paddingVertical="xs"
      >
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
      </Stack>
    </ScrollStack>
  )
}
