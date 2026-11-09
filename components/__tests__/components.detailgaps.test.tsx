import React from 'react'
import {act} from 'react-test-renderer'
import PagerView from 'react-native-pager-view'
import {KeyboardAvoidingView} from 'react-native'
import {DetailOverlay} from '../DetailOverlay'
import {Chip} from '../Chip'
import {KeyboardAvoider} from '../KeyboardAvoider'
import {Text} from '../Text'
import {ViewPager} from '../ViewPager'
import {RtlScope} from '../../layout'
import {renderWithTheme, themes} from '../../testing/renderWithTheme'

const noop = () => {}

describe('ViewPager drag state', () => {
  const pager = (props = {}) => (
    <ViewPager {...props}>
      <Text>One</Text>
      <Text>Two</Text>
    </ViewPager>
  )

  it('reports dragging from drag start until idle', () => {
    const onDraggingChange = jest.fn()
    const tree = renderWithTheme(pager({onDraggingChange}), 'light')
    const native = tree.root.findByType(PagerView)
    const state = (pageScrollState: string) =>
      act(() => {
        native.props.onPageScrollStateChanged({nativeEvent: {pageScrollState}})
      })
    state('dragging')
    state('settling')
    expect(onDraggingChange.mock.calls).toEqual([[true]])
    state('idle')
    expect(onDraggingChange.mock.calls).toEqual([[true], [false]])
  })

  it('passes onPageScroll through', () => {
    const onPageScroll = jest.fn()
    const tree = renderWithTheme(pager({onPageScroll}), 'light')
    act(() => {
      tree.root
        .findByType(PagerView)
        .props.onPageScroll({nativeEvent: {position: 1, offset: 0.25}})
    })
    expect(onPageScroll).toHaveBeenCalledWith(1, 0.25)
  })

  it('stays in logical page order inside an RtlScope', () => {
    const onPageScroll = jest.fn()
    const tree = renderWithTheme(
      <RtlScope>{pager({onPageScroll})}</RtlScope>,
      'light',
    )
    const native = tree.root.findByType(PagerView)
    expect(native.props.layoutDirection).toBe('rtl')
    act(() => {
      native.props.onPageScroll({nativeEvent: {position: 0, offset: 0.5}})
    })
    expect(onPageScroll).toHaveBeenCalledWith(0, 0.5)
  })
})

describe('KeyboardAvoider', () => {
  it('pads for the keyboard on native and forwards offset', () => {
    const tree = renderWithTheme(
      <KeyboardAvoider offset={12}>
        <Text>Field</Text>
      </KeyboardAvoider>,
      'light',
    )
    const view = tree.root.findByType(KeyboardAvoidingView)
    expect(view.props.behavior).toBe('padding')
    expect(view.props.keyboardVerticalOffset).toBe(12)
    expect(view.props.enabled).toBe(true)
  })
})

describe.each(themes)('DetailOverlay headerCenter (%s)', (theme) => {
  it('replaces the title with the centered slot', () => {
    const tree = renderWithTheme(
      <DetailOverlay
        visible
        title="Ignored"
        headerCenter={<Chip label="משנה א׳" selected onPress={noop} />}
        onClose={noop}
      >
        <Text>Detail</Text>
      </DetailOverlay>,
      theme,
    )
    expect(JSON.stringify(tree.toJSON())).not.toContain('Ignored')
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
