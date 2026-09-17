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
          <Touchable key={option.key} onPress={() => onChange(option.key)}>
            <Stack
              paddingVertical="xs"
              paddingHorizontal="sm"
              radius="sm"
              align="center"
              justify="center"
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
        )
      })}
    </Stack>
  )
}

const styles = StyleSheet.create({selectedLabel: {color: '#ffffff'}})
