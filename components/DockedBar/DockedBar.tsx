import React from 'react'
import type {LayoutChangeEvent} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'

export interface DockedBarProps {
  children?: React.ReactNode
  /** Lifts the bar above something floating at the bottom of the screen
   * (a pager pill), in points. Added to the safe-area inset. */
  bottomOffset?: number
  /** Content under the bar's rounded body that should stay flush to its
   * bottom edge, e.g. a thin `ProgressBar`. */
  footer?: React.ReactNode
  /** Layout of the whole docked area (bar + offset + safe area). Its height
   * is how much of the parent's bottom the bar covers — use it to pad
   * scrolling content or shrink a fit-to-screen area so nothing hides
   * behind the bar. */
  onLayout?: (event: LayoutChangeEvent) => void
  accessibilityLabel?: string
  testID?: string
}

/** A card docked to the bottom of its parent, above the safe area and
 * `bottomOffset`: the shell of a mini player or a contextual bar. Compose
 * the content (artwork, text, buttons) as children. It is absolutely
 * positioned (`box-none`, so only the card takes touches) — mount it at the
 * end of a screen. Ported from limud-baderech's `MiniPlayer` shell. */
export const DockedBar: React.FunctionComponent<DockedBarProps> = ({
  children,
  bottomOffset = 0,
  footer,
  onLayout,
  accessibilityLabel,
  testID,
}) => {
  const insets = useSafeAreaInsets()
  return (
    <Stack
      position="absolute"
      bottom="none"
      left="none"
      right="none"
      paddingHorizontal="sm"
      paddingBottom={bottomOffset + Math.max(insets.bottom, 8)}
      pointerEvents="box-none"
      onLayout={onLayout}
    >
      <Stack
        radius="lg"
        shadow="card"
        overflow="hidden"
        background={SemanticColor.SurfaceCard}
        borderWidth={1}
        borderColor={SemanticColor.BorderDefault}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        <Stack direction="row" align="center" gap="sm" padding="sm">
          {children}
        </Stack>
        {footer}
      </Stack>
    </Stack>
  )
}
