import React from 'react'
import {Stack} from '../Stack'

export interface CompassBadgeProps {
  children?: React.ReactNode
}

/** Absolute-positioned wrapper that pins the Mizrach compass to the
 * top-right corner of whichever Luach hero area it's nested in — reused
 * across the phone, iPad-grid, and desktop-web hero layouts. Purely a
 * positioning box; the compass widget itself is passed in as `children`. */
export const CompassBadge: React.FunctionComponent<CompassBadgeProps> = ({
  children,
}) => (
  <Stack
    position="absolute"
    width={90}
    height={90}
    right="md"
    top="xxl"
    align="center"
    justify="center"
  >
    {children}
  </Stack>
)
