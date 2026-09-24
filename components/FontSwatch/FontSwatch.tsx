import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import type {LatinTypeface, Typeface} from '../../typography'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {SWATCH_SIZE as SIZE} from '../swatchSize'

interface FontSwatchBaseProps {
  label: string
  selected: boolean
  onPress: () => void
  /** The sample text drawn in the typeface. Defaults to `אבגד` for Hebrew
   * and `Aa` for Latin. */
  sample?: string
}

export type FontSwatchProps = FontSwatchBaseProps &
  (
    | {script: 'hebrew'; typeface: Typeface}
    | {script: 'latin'; typeface: LatinTypeface}
  )

/** One option in a font picker: a fixed-size square card showing the typeface
 * itself, with its name below — the same size as a `ThemeSwatch`. Selected
 * fills with the accent tint. */
export const FontSwatch: React.FunctionComponent<FontSwatchProps> = (props) => {
  const {label, selected, onPress} = props
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
          width={SIZE}
          gap="xs"
          align="center"
          opacity={pressed ? 0.7 : undefined}
        >
          <Stack
            width={SIZE}
            height={SIZE}
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
