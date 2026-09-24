import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text, TextAlign} from '../Text'
import {IconButton} from '../IconButton'
import {Icon, IconName} from '../Icon'

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
  /** A control or icon before the text (typically a `ToggleSwitch`). */
  leading?: React.ReactNode
  /** Trailing icon buttons, in order. */
  actions?: ListRowAction[]
  /** Any other trailing element (a badge, a count). */
  trailing?: React.ReactNode
  /** Makes the row (everything but `actions`) one tap target. */
  onPress?: () => void
  /** A disclosure chevron at the far end — for rows that navigate. */
  showChevron?: boolean
  /** A right-to-left (Hebrew) row: mirrors the layout and the chevron. */
  rtl?: boolean
  /** Fades the whole row to 50% while every control stays tappable. */
  dimmed?: boolean
  /** Omits the bottom divider — set on the last row in a card. */
  isLast?: boolean
}

/** The generic list row: optional leading control, a title with an optional
 * subtitle, an optional trailing value/element, then optional icon actions,
 * with a hairline divider below. Apps build their own rows (notifications,
 * events, bookmarks…) from this rather than re-assembling the layout.
 *
 * With `onPress`, the actions sit *beside* the tap target rather than inside
 * it: on web a `Pressable` is a `<button>`, and a button inside a button has
 * undefined click handling. */
export const ListRow: React.FunctionComponent<ListRowProps> = ({
  title,
  subtitle,
  subtitleAlign,
  value,
  leading,
  actions,
  trailing,
  onPress,
  showChevron,
  rtl,
  dimmed,
  isLast,
}) => {
  const direction = rtl ? 'rowReverse' : 'row'
  const content = (
    <>
      {leading}
      {/* `width={0}` alongside `grow`: RN's yoga defaults to `flexShrink: 0`
          (unlike web flexbox), so a plain `grow` Stack won't shrink below its
          text's natural width — it just overflows the row instead of
          wrapping. Starting the flex-basis at 0 forces it to size purely from
          its grow share, so the text wraps within that instead. */}
      <Stack grow width={0} gap="xs">
        <Text variant="itemHeader" rtl={rtl}>
          {title}
        </Text>
        {subtitle !== undefined && (
          <Text variant="detail" rtl={rtl} align={subtitleAlign}>
            {subtitle}
          </Text>
        )}
      </Stack>
      {value !== undefined && (
        <Text variant="supplemental" align={rtl ? 'left' : 'right'}>
          {value}
        </Text>
      )}
      {trailing}
      {showChevron && (
        <Icon
          name={rtl ? 'chevron-left' : 'chevron-right'}
          size={18}
          color={SemanticColor.TextSecondary}
        />
      )}
    </>
  )

  return (
    <Stack
      direction={direction}
      align="center"
      gap="sm"
      paddingVertical="sm"
      borderBottomWidth={isLast ? 'none' : 1}
      borderColor={SemanticColor.BorderDefault}
      opacity={dimmed ? 0.5 : undefined}
    >
      {onPress ? (
        <Stack grow width={0}>
          <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={title}
          >
            {({pressed}) => (
              <Stack
                direction={direction}
                align="center"
                gap="sm"
                opacity={pressed ? 0.6 : undefined}
              >
                {content}
              </Stack>
            )}
          </Pressable>
        </Stack>
      ) : (
        content
      )}
      {!!actions?.length && (
        <Stack direction={direction}>
          {actions.map(({icon, label, onPress: onAction}) => (
            <IconButton
              key={label}
              name={icon}
              size={20}
              color={SemanticColor.TextSecondary}
              onPress={onAction}
              accessibilityLabel={label}
            />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
