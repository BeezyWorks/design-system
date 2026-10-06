import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import {useRtl} from '../../layout'
import {Stack} from '../Stack'

export interface PageDotsProps {
  count: number
  /** The current page, 0-based. */
  index: number
  /** Makes each dot a tap target that jumps to its page. */
  onSelect?: (index: number) => void
  /** Each page's name, for screen readers. */
  labels?: string[]
}

const DOT = 6
const ACTIVE_WIDTH = 18
// A 6pt dot is too small to hit; each sits in a 20pt-tall, padded target.
const TARGET_HEIGHT = 20
const INACTIVE_OPACITY = 0.5

/** A pager's position: one dot per page, the current one stretched into a
 * pill. In an `RtlScope` the first page is the rightmost dot. */
export const PageDots: React.FunctionComponent<PageDotsProps> = ({
  count,
  index,
  onSelect,
  labels,
}) => {
  const rtl = useRtl()
  const pages = Array.from({length: count}, (_, i) => i)
  return (
    <Stack
      direction={rtl ? 'rowReverse' : 'row'}
      justify="center"
      align="center"
      accessibilityRole="tablist"
    >
      {pages.map((page) => {
        const selected = page === index
        return (
          <Pressable
            key={page}
            accessibilityRole="tab"
            accessibilityState={{selected}}
            accessibilityLabel={labels?.[page]}
            disabled={!onSelect}
            onPress={() => onSelect?.(page)}
            hitSlop={{left: 4, right: 4}}
          >
            <Stack
              height={TARGET_HEIGHT}
              paddingHorizontal="xs"
              justify="center"
            >
              <Stack
                width={selected ? ACTIVE_WIDTH : DOT}
                height={DOT}
                radius="xs"
                background={SemanticColor.TextPrimary}
                opacity={selected ? undefined : INACTIVE_OPACITY}
              />
            </Stack>
          </Pressable>
        )
      })}
    </Stack>
  )
}
