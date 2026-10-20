import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import {Icon} from '../Icon'
import {Stack} from '../Stack'
import {Text} from '../Text'

/** `primary` — a solid brand pill (the one way on); `outline` — a quiet
 * bordered pill beside other content. */
export type PillButtonVariant = 'primary' | 'outline'

const variantColors: Record<
  PillButtonVariant,
  {background?: SemanticColor; label: SemanticColor; border?: SemanticColor}
> = {
  primary: {
    background: SemanticColor.AccentPrimary,
    label: SemanticColor.TextInverse,
  },
  outline: {
    label: SemanticColor.TextAccent,
    border: SemanticColor.AccentPrimary,
  },
}

export interface PillButtonProps {
  title: string
  onPress?: () => void
  variant?: PillButtonVariant
  /** A "go there" chevron after the label. Default on. */
  chevron?: boolean
  /** A right-to-left (Hebrew) label: the chevron goes on the left and
   * points left, which is forward in Hebrew. */
  rtl?: boolean
  disabled?: boolean
  accessibilityLabel?: string
  testID?: string
}

/** A rounded-pill action that sizes to its label — a link out to another
 * screen from inside content (e.g. "ברכת המזון ‹" at the end of a seder).
 * Use `Button` for form and dialog actions. */
export const PillButton: React.FunctionComponent<PillButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  chevron = true,
  rtl,
  disabled,
  accessibilityLabel,
  testID,
}) => {
  const colors = variantColors[variant]
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{disabled: !!disabled}}
      testID={testID}
    >
      {({pressed}) => (
        <Stack
          direction={rtl ? 'rowReverse' : 'row'}
          align="center"
          gap="sm"
          radius="full"
          paddingHorizontal="lg"
          paddingVertical="sm"
          background={colors.background}
          borderWidth={colors.border ? 1 : undefined}
          borderColor={colors.border}
          opacity={disabled ? 0.4 : pressed ? 0.7 : undefined}
        >
          <Text variant="headline" color={colors.label} rtl={rtl}>
            {title}
          </Text>
          {chevron && (
            <Icon
              name={rtl ? 'chevron-left' : 'chevron-right'}
              size={18}
              color={colors.label}
            />
          )}
        </Stack>
      )}
    </Pressable>
  )
}
