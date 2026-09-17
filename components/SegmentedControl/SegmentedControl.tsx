import React from 'react'
import {StyleSheet, Text as RNText} from 'react-native'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'
import {useTypeStyle} from '../../typography'

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
}: SegmentedControlProps<T>) => {
  const labelStyle = useTypeStyle('label')
  return (
    <Stack
      direction="row"
      background="surface"
      shadow="card"
      radius="md"
      padding="xs"
      gap="xs"
    >
      {options.map((option) => {
        const selected = option.key === value
        return (
          // Equal-width, ≥44px-tall segments: the outer `grow` Stack is
          // the actual row flex-item (so all options share the row width
          // evenly); `Touchable`/its inner `fill` Stack then just stretch
          // to fill whatever that wrapper was given.
          <Stack key={option.key} grow height={44}>
            <Touchable onPress={() => onChange(option.key)}>
              <Stack
                fill
                align="center"
                justify="center"
                radius="sm"
                background={selected ? 'primaryColor' : undefined}
              >
                {selected ? (
                  // `headerTextColor` isn't an "on-primaryColor" contrast
                  // token (it's the iOS nav-bar tint, same blue as
                  // `primaryColor` itself) — a literal white matches what
                  // this control always rendered for its selected pill.
                  <RNText style={[labelStyle, styles.selectedLabel]}>
                    {option.label}
                  </RNText>
                ) : (
                  <Text variant="label" tone="primaryTextColor">
                    {option.label}
                  </Text>
                )}
              </Stack>
            </Touchable>
          </Stack>
        )
      })}
    </Stack>
  )
}

const styles = StyleSheet.create({selectedLabel: {color: '#ffffff'}})
