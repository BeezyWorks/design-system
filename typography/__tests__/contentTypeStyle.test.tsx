import React from 'react'
import {Platform} from 'react-native'
import {act, create} from 'react-test-renderer'
import {testBrand} from '../../colors/sampleBrands'
import {DesignSystemProvider} from '../../theme'
import {Typeface} from '../content'
import {ContentScript, useContentTypeStyle} from '..'

const styleFor = (script: ContentScript) => {
  const seen: {current?: ReturnType<typeof useContentTypeStyle>} = {}
  const Probe = () => {
    seen.current = useContentTypeStyle(script)
    return null
  }
  act(() => {
    create(
      <DesignSystemProvider
        mode="light"
        brand={testBrand}
        content={{typeface: Typeface.Frank, size: 20, leading: 1.7, tracking: 0.05}}
      >
        <Probe />
      </DesignSystemProvider>,
    )
  })
  return seen.current!
}

describe('useContentTypeStyle letter spacing', () => {
  const originalOS = Platform.OS
  afterEach(() => {
    Platform.OS = originalOS
  })

  it('drops tracking from Hebrew on iOS, where kerned RTL text mis-lays-out', () => {
    Platform.OS = 'ios'
    expect(styleFor('hebrew')).not.toHaveProperty('letterSpacing')
    expect(styleFor('latin').letterSpacing).toBe(1)
  })

  it('keeps tracking for Hebrew on other platforms', () => {
    Platform.OS = 'android'
    expect(styleFor('hebrew').letterSpacing).toBe(1)
  })
})
