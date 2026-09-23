import React from 'react'
import {Platform, StyleSheet, Text as RNText, View} from 'react-native'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'
import {useTypeStyle} from '../../typography'
import {White, SemanticColor} from '../../colors'

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
    // On web the parent card can be very wide; keep the track compact
    // (sized to its labels) instead of stretching every segment across it.
    <View style={styles.wrapper}>
      <Stack
        direction="row"
        background={SemanticColor.SurfaceBackground}
        shadow="card"
        radius="md"
        padding="xs"
        gap="xs"
      >
        {options.map((option) => {
          const selected = option.key === value
          return (
            // Equal-width, 44px-tall segments: the outer flex:1 View shares the
            // row evenly; the inner Stack has an explicit height because a
            // percentage height doesn't resolve against Pressable on web.
            <View key={option.key} style={styles.segment}>
              <Touchable onPress={() => onChange(option.key)}>
                <Stack
                  width="100%"
                  height={44}
                  align="center"
                  justify="center"
                  radius="sm"
                  background={
                    selected ? SemanticColor.AccentPrimary : undefined
                  }
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
                    <Text variant="label" color={SemanticColor.TextPrimary}>
                      {option.label}
                    </Text>
                  )}
                </Stack>
              </Touchable>
            </View>
          )
        })}
      </Stack>
    </View>
  )
}

const styles = StyleSheet.create({
  selectedLabel: {color: White},
  wrapper: {
    ...(Platform.OS === 'web' ? {alignSelf: 'flex-start' as const} : null),
    maxWidth: '100%',
  },
  // flex: 1 (basis 0) makes segments equal-width regardless of label length.
  segment: {flex: 1, minWidth: Platform.OS === 'web' ? 88 : 0},
})
