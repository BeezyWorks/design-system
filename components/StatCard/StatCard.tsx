import React from 'react'
import {SemanticColor} from '../../colors'
import {Card} from '../Card'
import {Text} from '../Text'

export interface StatCardProps {
  value: string | number
  label: string
  /** `compact` — centered, for a row of three on a phone; `large` —
   * start-aligned with a bigger figure, for a roomier grid. */
  size?: 'compact' | 'large'
}

// Room for a one-line value and a two-line label — the tallest either gets
// — so tiles in a grid stay the same height whatever their label length.
const minContentHeight = {compact: 64, large: 72} as const

/** An at-a-glance figure (a streak, a count, a percentage) over its label. */
export const StatCard: React.FunctionComponent<StatCardProps> = ({
  value,
  label,
  size = 'large',
}) => {
  const compact = size === 'compact'
  return (
    // `grow` fills a `Grid` cell, so a row's tiles share the tallest height.
    <Card
      grow
      padding="md"
      gap="xs"
      justify="center"
      align={compact ? 'center' : 'start'}
      minHeight={minContentHeight[size]}
    >
      <Text
        variant={compact ? 'title' : 'largeTitle'}
        color={SemanticColor.TextAccent}
      >
        {value}
      </Text>
      <Text variant="detail" align={compact ? 'center' : undefined}>
        {label}
      </Text>
    </Card>
  )
}
