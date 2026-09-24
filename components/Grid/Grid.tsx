import React from 'react'
import {Stack, Spacing} from '../Stack'

export interface GridProps {
  columns: number
  gap?: Spacing
  /** Fill right-to-left (first item top-right) — for Hebrew-first grids. */
  rtl?: boolean
  children: React.ReactNode
}

/** A fixed-column grid. Chunks children into rows of `columns`; every cell
 * takes an equal share of the row (`grow` from a zero basis) rather than a
 * percentage width — RN doesn't subtract `gap` from percentages, so
 * `width: '33%'` plus a gap overflows the row. A short last row is padded
 * with empty cells so it stays on the grid instead of stretching. */
export const Grid: React.FunctionComponent<GridProps> = ({
  columns,
  gap = 'sm',
  rtl,
  children,
}) => {
  const items = React.Children.toArray(children)
  const rows: React.ReactNode[][] = []
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns))
  }
  return (
    <Stack gap={gap}>
      {rows.map((row, rowIndex) => (
        <Stack key={rowIndex} direction={rtl ? 'rowReverse' : 'row'} gap={gap}>
          {row.map((item, itemIndex) => (
            <Stack key={itemIndex} grow width={0}>
              {item}
            </Stack>
          ))}
          {Array.from({length: columns - row.length}, (_, i) => (
            <Stack key={`empty-${i}`} grow width={0} />
          ))}
        </Stack>
      ))}
    </Stack>
  )
}
