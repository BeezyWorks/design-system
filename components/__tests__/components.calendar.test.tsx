import React from 'react'
import {renderWithTheme, themes} from '../../testing/renderWithTheme'
import {SemanticColor} from '../../colors'
import {RtlScope} from '../../layout'
import {EventCard} from '../EventCard'
import {TimeTile} from '../TimeTile'
import {DatePager} from '../DatePager'
import {MonthGrid, dayKey} from '../MonthGrid'

const noop = () => {}
const today = new Date(2026, 9, 28, 12)
const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

describe.each(themes)('calendar pieces (%s theme)', (theme) => {
  it('EventCard', () => {
    const r = renderWithTheme(
      <RtlScope>
        <EventCard
          kind="fast"
          lines={['עשרה בטבת']}
          times={[{label: 'סיום הצום', time: '5:04 PM'}]}
        />
        <EventCard kind="personal" lines={['Yahrzeit · Reb Yaakov']} />
        <EventCard lines={['מוריד הגשם', 'ותן טל ומטר']} />
      </RtlScope>,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('TimeTile', () => {
    const r = renderWithTheme(
      <TimeTile label="הדלקת נרות" day="Mon" time="8:03 PM" highlighted rtl />,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('DatePager', () => {
    const r = renderWithTheme(
      <DatePager
        weekday="Fri"
        hebrewDate="יט חשון"
        civilDate="30 October 2026"
        onPrevious={noop}
        onNext={noop}
        onPressDate={noop}
        previousLabel="Previous day"
        nextLabel="Next day"
        pickDateLabel="Choose a date"
      />,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it.each(['month', 'week'] as const)('MonthGrid (%s)', (mode) => {
    const r = renderWithTheme(
      <MonthGrid
        month={today}
        mode={mode}
        today={today}
        selected={new Date(2026, 9, 29, 12)}
        weekdayLabels={weekdayLabels}
        marks={{'2026-10-29': [SemanticColor.EventPersonal]}}
        onDayPress={noop}
      />,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })
})

describe('MonthGrid', () => {
  it('keys days by their local civil date', () => {
    expect(dayKey(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05')
  })

  it('draws the Hebrew date without gershaim', () => {
    const r = renderWithTheme(
      <MonthGrid
        month={today}
        mode="week"
        today={today}
        weekdayLabels={weekdayLabels}
      />,
      'light',
    )
    const text = JSON.stringify(r.toJSON())
    expect(text).toContain('יז')
    expect(text).not.toMatch(/[׳״]/)
  })
})
