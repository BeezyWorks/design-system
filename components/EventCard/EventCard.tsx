import React from 'react'
import {EventKind, SemanticColor, eventTones} from '../../colors'
import {useRtl} from '../../layout'
import {Stack} from '../Stack'
import {Text} from '../Text'

const HAS_LATIN = /[A-Za-z]/
// Isolated (LRI…PDI) so an English name keeps its own order in an RTL card,
// lined up on the right with the Hebrew ones.
const isolate = (text: string) => `⁦${text}⁩`

export interface EventCardTime {
  label: string
  time: string
}

export interface EventCardProps {
  /** The kind of day, which tints the card the color of its calendar dot.
   * None for a plain notice (the rain switch, the omer count). */
  kind?: EventKind
  /** The card's names, one to a line — usually one, or a few that belong
   * together (the summer and winter switches on one card). */
  lines: string[]
  /** Times that come with the day, under its name (a fast's end, the last
   * time to eat chametz). */
  times?: EventCardTime[]
  /** Right-to-left (default: the nearest `RtlScope`'s). */
  rtl?: boolean
}

/** One of a day's events, or a notice about it, as a card washed in its
 * kind's color: what the day is, with any times that matter on it. Hebrew
 * names are set in the serif; an English name (a user's own event) in the
 * UI face, aligned with them. */
export const EventCard: React.FunctionComponent<EventCardProps> = ({
  kind,
  lines,
  times = [],
  rtl: rtlProp,
}) => {
  const rtl = useRtl(rtlProp)
  const tone = kind ? eventTones[kind] : undefined
  const textColor = tone?.text ?? SemanticColor.TextPrimary
  const direction = rtl ? 'rowReverse' : 'row'
  return (
    <Stack
      radius="lg"
      paddingHorizontal="md"
      background={tone?.tint ?? SemanticColor.SurfaceCard}
      borderWidth={1}
      borderColor={tone?.border ?? SemanticColor.BorderDefault}
    >
      {lines.map((line, i) => {
        const latin = HAS_LATIN.test(line)
        return (
          <Stack
            key={`${i}-${line}`}
            direction={direction}
            align="center"
            minHeight={46}
            paddingVertical="xs"
            borderTopWidth={i > 0 ? 'hairline' : undefined}
            borderColor={SemanticColor.BorderDefault}
          >
            <Text
              variant={latin ? 'headline' : 'titleSerif'}
              color={textColor}
              align={rtl ? 'right' : 'left'}
            >
              {latin && rtl ? isolate(line) : line}
            </Text>
          </Stack>
        )
      })}
      {times.map(({label, time}) => (
        <Stack
          key={label}
          direction={direction}
          justify="spaceBetween"
          align="center"
          minHeight={38}
          borderTopWidth="hairline"
          borderColor={SemanticColor.BorderDefault}
        >
          <Text variant="item">{label}</Text>
          <Text variant="headline" color={SemanticColor.TextPrimary}>
            {time}
          </Text>
        </Stack>
      ))}
    </Stack>
  )
}
