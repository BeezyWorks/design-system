import React from 'react'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text, TextAlign} from '../Text'
import {IconButton} from '../IconButton'
import {IconName} from '../Icon'

export interface ListRowAction {
  icon: IconName
  /** Accessibility label — also what the action is called in tests. */
  label: string
  onPress: () => void
}

export interface ListRowProps {
  title: string
  /** A second, quieter line under the title. */
  subtitle?: string
  /** Pin the subtitle's alignment — needed when it is in a different script
   * direction than the row (e.g. Hebrew under an LTR title). */
  subtitleAlign?: TextAlign
  /** Trailing supplemental text (a time, a date). */
  value?: string
  /** A control before the text (typically a `ToggleSwitch`). */
  leading?: React.ReactNode
  /** Trailing icon buttons, in order. */
  actions?: ListRowAction[]
  /** Fades the whole row to 50% while every control stays tappable. */
  dimmed?: boolean
  /** Omits the bottom divider — set on the last row in a card. */
  isLast?: boolean
}

/** The generic list row: optional leading control, a title with an optional
 * subtitle, an optional trailing value, then optional icon actions, with a
 * hairline divider below. Apps build their own rows (notifications, events…)
 * from this rather than re-assembling the layout. */
export const ListRow: React.FunctionComponent<ListRowProps> = ({
  title,
  subtitle,
  subtitleAlign,
  value,
  leading,
  actions,
  dimmed,
  isLast,
}) => (
  <Stack
    direction="row"
    align="center"
    gap="sm"
    paddingVertical="sm"
    borderBottomWidth={isLast ? 'none' : 1}
    borderColor={SemanticColor.BorderDefault}
    opacity={dimmed ? 0.5 : undefined}
  >
    {leading}
    {/* `width={0}` alongside `grow`: RN's yoga defaults to `flexShrink: 0`
        (unlike web flexbox), so a plain `grow` Stack won't shrink below its
        text's natural width — it just overflows the row instead of
        wrapping. Starting the flex-basis at 0 forces it to size purely from
        its grow share, so the text wraps within that instead. */}
    <Stack grow width={0} gap="xs">
      <Text variant="itemHeader">{title}</Text>
      {subtitle !== undefined && (
        <Text variant="detail" align={subtitleAlign}>
          {subtitle}
        </Text>
      )}
    </Stack>
    {value !== undefined && (
      <Text variant="supplemental" align="right">
        {value}
      </Text>
    )}
    {!!actions?.length && (
      <Stack direction="row">
        {actions.map(({icon, label, onPress}) => (
          <IconButton
            key={label}
            name={icon}
            size={20}
            color={SemanticColor.TextSecondary}
            onPress={onPress}
            accessibilityLabel={label}
          />
        ))}
      </Stack>
    )}
  </Stack>
)
