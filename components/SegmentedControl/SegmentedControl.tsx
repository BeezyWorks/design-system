import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'

export interface SegmentOption<T extends string> {
  key: T
  label: string
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[]
  value: T
  onChange: (key: T) => void
}

/** A pill track of mutually-exclusive options (e.g. theme, time format). */
export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) => (
  <Stack
    direction="row"
    background="backgroundColorDirty"
    radius="md"
    padding="xs"
    gap="xs"
  >
    {options.map((option) => {
      const selected = option.key === value
      return (
        <Touchable key={option.key} onPress={() => onChange(option.key)}>
          <Stack
            paddingVertical="xs"
            paddingHorizontal="sm"
            radius="sm"
            align="center"
            justify="center"
            background={selected ? 'primaryColor' : undefined}
          >
            <Text
              variant="label"
              tone={selected ? 'headerTextColor' : 'primaryTextColor'}
            >
              {option.label}
            </Text>
          </Stack>
        </Touchable>
      )
    })}
  </Stack>
)
