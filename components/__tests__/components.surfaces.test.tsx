import React from 'react'
import {Text as RNText} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {act, create} from 'react-test-renderer'
import {DesignSystemProvider} from '../../theme'
import {
  pressables,
  renderWithTheme,
  themes,
  track,
} from '../../testing/renderWithTheme'
import {AlertCard} from '../AlertCard'
import {AnchoredPopover} from '../AnchoredPopover'
import {BottomSheet} from '../BottomSheet'
import {BottomSheetHeader} from '../BottomSheetHeader'
import {BottomSheetModal} from '../BottomSheetModal/BottomSheetModal.web'
import {GlassIconButton} from '../GlassIconButton'
import {IconButton} from '../IconButton'
import {ScreenLoader} from '../ScreenLoader'
import {SlideIndicator} from '../SlideIndicator'
import {Touchable} from '../Touchable'
import {useFloatingTabBarStyle} from '../TabBarBackground/useFloatingTabBarStyle'

// Snapshot coverage for the surfaces / sheets / popovers / touch feedback,
// recorded before their colors moved from `useColors` to `SemanticColor` so
// the migration is provably pixel-identical.

const noop = () => {}

describe.each(themes)('surfaces (%s theme)', (theme) => {
  it('AlertCard', () => {
    const r = renderWithTheme(
      <AlertCard title="Title" onDismissBackground={noop}>
        <RNText>body</RNText>
      </AlertCard>,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('AlertCard without a title', () => {
    const r = renderWithTheme(
      <AlertCard onDismissBackground={noop}>
        <RNText>body</RNText>
      </AlertCard>,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('BottomSheet with header', () => {
    const r = renderWithTheme(
      <BottomSheet
        header={{title: 'Sheet', onPan: noop, onPanRelease: noop}}
        onLayoutHeight={noop}
      >
        <RNText>content</RNText>
      </BottomSheet>,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('BottomSheetHeader with actions', () => {
    const r = renderWithTheme(
      <BottomSheetHeader
        title="Header"
        left={<RNText>Cancel</RNText>}
        right={<RNText>Save</RNText>}
        onPan={noop}
        onPanRelease={noop}
      />,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('SlideIndicator', () => {
    expect(
      renderWithTheme(<SlideIndicator />, theme).toJSON(),
    ).toMatchSnapshot()
  })

  it('ScreenLoader', () => {
    expect(renderWithTheme(<ScreenLoader />, theme).toJSON()).toMatchSnapshot()
  })

  it.each(['center', 'end'] as const)('AnchoredPopover align=%s', (align) => {
    const r = renderWithTheme(
      <AnchoredPopover visible onDismiss={noop} align={align}>
        <RNText>popover</RNText>
      </AnchoredPopover>,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('BottomSheetModal (web)', () => {
    const r = renderWithTheme(
      <BottomSheetModal title="Web sheet">
        <RNText>content</RNText>
      </BottomSheetModal>,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('GlassIconButton (solid fallback)', () => {
    const r = renderWithTheme(
      <GlassIconButton name="add" onPress={noop} accessibilityLabel="add" />,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('IconButton at rest and pressed', () => {
    const r = renderWithTheme(
      <IconButton name="close" onPress={noop} accessibilityLabel="close" />,
      theme,
    )
    const style = pressables(r)[0].props.style
    expect({
      rest: style({pressed: false}),
      pressed: style({pressed: true}),
    }).toMatchSnapshot()
  })

  it('Touchable rest/pressed styles and ripple', () => {
    const r = renderWithTheme(
      <Touchable onPress={noop}>
        <RNText>row</RNText>
      </Touchable>,
      theme,
    )
    const props = pressables(r)[0].props
    expect({
      ripple: props.android_ripple,
      rest: props.style({pressed: false}),
      pressed: props.style({pressed: true}),
    }).toMatchSnapshot()
  })

  it('useFloatingTabBarStyle', () => {
    let style: unknown
    const Probe = () => {
      style = useFloatingTabBarStyle()
      return null
    }
    let renderer!: ReturnType<typeof create>
    act(() => {
      renderer = create(
        <SafeAreaProvider
          initialMetrics={{
            frame: {x: 0, y: 0, width: 390, height: 844},
            insets: {top: 47, left: 0, right: 0, bottom: 34},
          }}
        >
          <DesignSystemProvider mode={theme}>
            <Probe />
          </DesignSystemProvider>
        </SafeAreaProvider>,
      )
    })
    track(renderer)
    expect(style).toMatchSnapshot()
  })
})
