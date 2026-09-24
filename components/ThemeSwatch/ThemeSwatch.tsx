import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import type {ThemeMode} from '../../colors'
import {ThemeScope} from '../../theme'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {SWATCH_SIZE as SIZE} from '../swatchSize'

export interface ThemeSwatchProps {
  /** The mode to preview, or `system` for a split light/dark tile. */
  mode: ThemeMode | 'system'
  label: string
  selected: boolean
  onPress: () => void
  /** The sample glyph drawn in the mode's ink. Default `Aa`. */
  glyph?: string
}

// Paints its children in `mode` — a real `ThemeScope`, so the preview is the
// mode's actual background and ink rather than a copy of their values.
const ModeTile = ({
  mode,
  glyph,
  width,
}: {
  mode: ThemeMode
  glyph?: string
  width: number
}) => (
  <ThemeScope mode={mode}>
    <Stack
      width={width}
      height="100%"
      align="center"
      justify="center"
      background={SemanticColor.SurfaceBackground}
    >
      {!!glyph && (
        <Text variant="headline" color={SemanticColor.TextPrimary}>
          {glyph}
        </Text>
      )}
    </Stack>
  </ThemeScope>
)

/** One option in an appearance picker: a tile showing the mode itself, with
 * its label below. */
export const ThemeSwatch: React.FunctionComponent<ThemeSwatchProps> = ({
  mode,
  label,
  selected,
  onPress,
  glyph = 'Aa',
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityState={{selected}}
  >
    {({pressed}) => (
      <Stack align="center" gap="xs" opacity={pressed ? 0.7 : undefined}>
        <Stack
          direction="row"
          width={SIZE}
          height={SIZE}
          radius="md"
          overflow="hidden"
          borderWidth={selected ? 2 : 1}
          borderColor={
            selected ? SemanticColor.AccentPrimary : SemanticColor.BorderDefault
          }
        >
          {mode === 'system' ? (
            <>
              <ModeTile mode="light" width={SIZE / 2} />
              <ModeTile mode="dark" width={SIZE / 2} />
            </>
          ) : (
            <ModeTile mode={mode} glyph={glyph} width={SIZE} />
          )}
        </Stack>
        <Text
          variant="label"
          color={
            selected ? SemanticColor.TextAccent : SemanticColor.TextPrimary
          }
        >
          {label}
        </Text>
      </Stack>
    )}
  </Pressable>
)
