import React from 'react'
import {act} from 'react-test-renderer'
import {Artwork} from '../Artwork'
import {Button} from '../Button'
import {Card} from '../Card'
import {DockedBar} from '../DockedBar'
import {GlassSurface} from '../GlassSurface'
import {Icon} from '../Icon'
import {NoteBar} from '../NoteBar'
import {PhotoSheetScroll} from '../PhotoSheetScroll'
import {SearchField} from '../SearchField'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Toast} from '../Toast'
import {TransportButton} from '../TransportButton'
import {ZoomStepper} from '../ZoomStepper'
import {renderWithTheme, themes} from '../../testing/renderWithTheme'

const expectSnapshot = (ui: React.ReactElement, theme: 'light' | 'dark') =>
  expect(renderWithTheme(ui, theme).toJSON()).toMatchSnapshot()
const noop = () => {}
const zoom = (value: number) => (
  <ZoomStepper
    zoom={value}
    min={0.5}
    max={3}
    onZoomIn={noop}
    onZoomOut={noop}
    onFit={noop}
  />
)

describe.each(themes)('gemara components (%s theme)', (theme) => {
  it('Toast', () => {
    expectSnapshot(
      <>
        <Toast visible message="Marked learned" actionLabel="Undo" />
        <Toast visible rtl message="סומן" actionLabel="בטל" />
        <Toast visible={false} message="hidden" />
      </>,
      theme,
    )
  })

  it('ZoomStepper', () => {
    expectSnapshot(
      <>
        {zoom(1)}
        {zoom(3)}
      </>,
      theme,
    )
  })

  it('DockedBar, Artwork, TransportButton', () => {
    expectSnapshot(
      <DockedBar bottomOffset={8}>
        <Artwork name="Daf Yomi" />
        <Artwork />
        <TransportButton kind="play" label="Play" />
        <TransportButton kind="skip-back" seconds={15} label="Back" />
      </DockedBar>,
      theme,
    )
  })

  it('NoteBar empty and with a note', () => {
    expectSnapshot(
      <>
        <NoteBar onSave={noop} onDelete={noop} />
        <NoteBar
          floating={false}
          note={{text: 'hello', updatedAt: 1_700_000_000_000}}
          onSave={noop}
          onDelete={noop}
        />
      </>,
      theme,
    )
  })

  it('dashed Card, Button and Stack', () => {
    expectSnapshot(
      <>
        <Card borderStyle="dashed" shadow="none">
          <Text>add</Text>
        </Card>
        <Button title="Add" variant="dashed" />
        <Stack borderWidth={1} borderStyle="dashed" />
      </>,
      theme,
    )
  })

  it('GlassSurface intensity/opacity, transport icons', () => {
    expectSnapshot(
      <>
        <GlassSurface intensity={20} opacity={0.5}>
          <Text>glass</Text>
        </GlassSurface>
        <Icon name="play" />
        <Icon name="headphones" />
      </>,
      theme,
    )
  })
})

describe('behaviour', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('Toast fires its action and dismisses after its duration', () => {
    const onDismiss = jest.fn()
    const onAction = jest.fn()
    const r = renderWithTheme(
      <Toast
        visible
        message="m"
        actionLabel="Undo"
        onAction={onAction}
        onDismiss={onDismiss}
        duration={1000}
      />,
    )
    act(() => {
      r.root.findByProps({accessibilityLabel: 'Undo'}).props.onPress()
    })
    expect(onAction).toHaveBeenCalled()
    act(() => {
      jest.advanceTimersByTime(1001)
    })
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('SearchField with onPress is a tap target, not an input', () => {
    const onPress = jest.fn()
    const r = renderWithTheme(
      <SearchField placeholder="Search" onPress={onPress} />,
    )
    expect(r.root.findAllByType('TextInput' as never)).toHaveLength(0)
    act(() => {
      r.root.findByProps({accessibilityRole: 'search'}).props.onPress()
    })
    expect(onPress).toHaveBeenCalled()
  })

  it('ZoomStepper disables at its limits', () => {
    const r = renderWithTheme(zoom(3))
    expect(
      r.root.findByProps({accessibilityLabel: 'Zoom in'}).props.disabled,
    ).toBe(true)
  })

  it('PhotoSheetScroll renders its corner slot', () => {
    const r = renderWithTheme(
      <PhotoSheetScroll
        source={{uri: 'https://example.com/p.jpg'}}
        hero={<Text>hero</Text>}
        corner={<Text>corner-x</Text>}
      />,
    )
    expect(JSON.stringify(r.toJSON())).toContain('corner-x')
  })
})
