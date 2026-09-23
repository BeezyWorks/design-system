import React from 'react'
import {SemanticColor} from '../../colors'
import {TypeFace} from '@models'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'

export interface TypefaceChipItem {
  key: string
  label: string
  face: TypeFace
}

export interface TypefaceChipsProps {
  items: TypefaceChipItem[]
  selectedKey: string
  onSelect: (key: string) => void
  /** Short sample rendered live in each chip using its own typeface. */
  sampleText?: string
}

/** A wrapping row of typeface picker chips, each previewing its own font
 * via a live sample. */
export const TypefaceChips: React.FunctionComponent<TypefaceChipsProps> = ({
  items,
  selectedKey,
  onSelect,
  sampleText = 'אבגד',
}) => (
  <Stack direction="row" wrap gap="sm">
    {items.map((item) => {
      const selected = item.key === selectedKey
      return (
        <Touchable key={item.key} onPress={() => onSelect(item.key)}>
          <Stack
            width={76}
            height={76}
            align="center"
            justify="center"
            paddingVertical="sm"
            paddingHorizontal="xs"
            radius="sm"
            gap="xs"
            shadow="card"
            background={
              selected
                ? SemanticColor.AccentTintSelected
                : SemanticColor.SurfaceBackground
            }
          >
            <Text variant="titleLarge" align="center" typeface={item.face}>
              {sampleText}
            </Text>
            <Text
              variant="caption"
              align="center"
              color={
                selected ? SemanticColor.TextAccent : SemanticColor.TextPrimary
              }
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </Stack>
        </Touchable>
      )
    })}
  </Stack>
)
