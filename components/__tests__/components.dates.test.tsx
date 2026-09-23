import React from 'react'
import {Platform} from 'react-native'
import {renderWithTheme, themes} from '../../testing/renderWithTheme'
import {GregorianDateField} from '../GregorianDateField'
import {GregorianDateField as GregorianDateFieldWeb} from '../GregorianDateField/GregorianDateField.web'
import {HebrewDatePicker} from '../HebrewDatePicker'

// Snapshot coverage for the date pickers, recorded before their colors (and
// GregorianDateField's theme lookup) moved onto the design system provider.

const noop = () => {}
const date = new Date(2020, 5, 16, 10)

const onPlatform = (os: 'ios' | 'android' | 'web', run: () => void) => {
  const restore = jest.replaceProperty(Platform, 'OS', os)
  try {
    run()
  } finally {
    restore.restore()
  }
}

describe.each(themes)('date pickers (%s theme)', (theme) => {
  it.each(['ios', 'android'] as const)('GregorianDateField (%s)', (os) => {
    onPlatform(os, () => {
      const r = renderWithTheme(
        <GregorianDateField value={date} onChange={noop} />,
        theme,
      )
      expect(r.toJSON()).toMatchSnapshot()
    })
  })

  it('GregorianDateField (web input)', () => {
    const r = renderWithTheme(
      <GregorianDateFieldWeb value={date} onChange={noop} />,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it.each(['ios', 'web'] as const)('HebrewDatePicker (%s)', (os) => {
    onPlatform(os, () => {
      const r = renderWithTheme(
        <HebrewDatePicker
          value={{day: 24, monthKey: 'Sivan'}}
          onChange={noop}
        />,
        theme,
      )
      expect(r.toJSON()).toMatchSnapshot()
    })
  })
})
