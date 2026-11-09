import React from 'react'
import {Text as RNText} from 'react-native'
import {renderWithTheme} from '../../testing/renderWithTheme'
import {PhotoSheetScroll} from '../PhotoSheetScroll'

describe('PhotoSheetScroll', () => {
  it('renders the hero and the sheet content', () => {
    const r = renderWithTheme(
      <PhotoSheetScroll
        source={{uri: 'https://example.com/photo.jpg'}}
        hero={<RNText>hero</RNText>}
      >
        <RNText>sheet</RNText>
      </PhotoSheetScroll>,
      'light',
    )
    const text = JSON.stringify(r.toJSON())
    expect(text).toContain('hero')
    expect(text).toContain('sheet')
  })
})
