import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import type {LatinTypeface, Typeface} from '../../typography'
import {Stack} from '../Stack'
import {Text} from '../Text'

interface FontSwatchBaseProps {
  label: string
  selected: boolean
  onPress: () => void
  /** The sample text drawn in the typeface. Defaults to `אבגד` for Hebrew
   * and `Aa` for Latin. */
  sample?: string
  /** Fixes the card to `size`×`size` instead of filling its container. */
  size?: number
}

export type FontSwatchProps = FontSwatchBaseProps &
  (
    | {script: 'hebrew'; typeface: Typeface}
    | {script: 'latin'; typeface: LatinTypeface}
  )

/** One option in a font picker: a square card showing the typeface itself,
 * with its name below. Fills the width it's given (a `Grid` cell), so the
 * card scales with its column, unless `size` fixes it. Selected fills with the
 * accent tint. */
export const FontSwatch: React.FunctionComponent<FontSwatchProps> = (props) => {
  const {label, selected, onPress, size} = props
  const sample = props.sample ?? (props.script === 'hebrew' ? 'אבגד' : 'Aa')

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{selected}}
    >
      {({pressed}) => (
        <Stack
          width={size ?? '100%'}
          gap="xs"
          align="center"
          opacity={pressed ? 0.7 : undefined}
        >
          <Stack
            width={size ?? '100%'}
            height={size}
            aspectRatio={size ? undefined : 1}
            radius="md"
            borderWidth={2}
            borderColor={
              selected ? SemanticColor.AccentPrimary : SemanticColor.BorderDefault
            }
            background={
              selected
                ? SemanticColor.AccentTintSelected
                : SemanticColor.SurfaceCard
            }
            align="center"
            justify="center"
          >
            {props.script === 'hebrew' ? (
              <Text variant="titleLarge" typeface={props.typeface}>
                {sample}
              </Text>
            ) : (
              <Text variant="titleLarge" latinTypeface={props.typeface}>
                {sample}
              </Text>
            )}
          </Stack>
          <Text
            variant="detail"
            align="center"
            color={
              selected ? SemanticColor.TextAccent : SemanticColor.TextSecondary
            }
          >
            {label}
          </Text>
        </Stack>
      )}
    </Pressable>
  )
}
