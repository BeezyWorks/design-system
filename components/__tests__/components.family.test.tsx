import React from 'react'
import {act} from 'react-test-renderer'
import {Badge} from '../Badge'
import {Button} from '../Button'
import {Card} from '../Card'
import {Chip} from '../Chip'
import {ChipScroller} from '../ChipScroller'
import {Header} from '../Header'
import {PageDots} from '../PageDots'
import {PagerPill} from '../PagerPill'
import {SortableList} from '../SortableList'
import {RtlScope} from '../../layout'
import {DetailOverlay} from '../DetailOverlay'
import {EmptyState} from '../EmptyState'
import {FontSwatch} from '../FontSwatch'
import {FontSwatchPicker} from '../FontSwatchPicker'
import {GradientCard} from '../GradientCard'
import {Grid} from '../Grid'
import {IconButton} from '../IconButton'
import {ListRow} from '../ListRow'
import {ProgressBar} from '../ProgressBar'
import {Slider} from '../Slider'
import {StatCard} from '../StatCard'
import {Text} from '../Text'
import {TextField} from '../TextField'
import {ThemeSwatch} from '../ThemeSwatch'
import {ThemeSwatchPicker} from '../ThemeSwatchPicker'
import {ToggleSetting} from '../ToggleSetting'
import {LatinTypeface, Typeface} from '../../typography'
import {DesignSystemProvider} from '../../theme'
import {testBrand} from '../../colors/sampleBrands'
import {
  pressables,
  renderWithTheme,
  themes,
} from '../../testing/renderWithTheme'

// Components and props added for the Mishnah app — the snapshot is the
// review for their look in each mode.
const expectSnapshot = (ui: React.ReactElement, theme: 'light' | 'dark') =>
  expect(renderWithTheme(ui, theme).toJSON()).toMatchSnapshot()

const noop = () => {}

describe.each(themes)('family components (%s theme)', (theme) => {
  it('Chip, selected and not', () => {
    expectSnapshot(
      <>
        <Chip label="א" selected onPress={noop} />
        <Chip label="ב" onPress={noop} />
      </>,
      theme,
    )
  })

  it('Badge in every tone, with an icon', () => {
    expectSnapshot(
      <>
        <Badge label="3/9" />
        <Badge label="3/9" tone="accent" />
        <Badge label="9/9" tone="success" />
        <Badge label="Resume" tone="onAccent" icon="chevron-left" />
      </>,
      theme,
    )
  })

  it('ProgressBar clamps and takes a tone', () => {
    expectSnapshot(
      <>
        <ProgressBar progress={0.42} />
        <ProgressBar progress={1.5} tone="success" size="md" />
      </>,
      theme,
    )
  })

  it('StatCard, compact and large, in a Grid', () => {
    expectSnapshot(
      <Grid columns={2} rtl>
        <StatCard value={3} label="day streak" size="compact" />
        <StatCard value="42%" label="done" />
        <StatCard value={1} label="odd one out" />
      </Grid>,
      theme,
    )
  })

  it('GradientCard', () => {
    expectSnapshot(
      <GradientCard>
        <Text>Continue</Text>
      </GradientCard>,
      theme,
    )
  })

  it('ThemeSwatch previews each mode', () => {
    expectSnapshot(
      <>
        <ThemeSwatch mode="sepia" label="Sepia" selected onPress={noop} />
        <ThemeSwatch
          mode="system"
          label="System"
          selected={false}
          onPress={noop}
        />
      </>,
      theme,
    )
  })

  it('FontSwatch previews each typeface', () => {
    expectSnapshot(
      <>
        <FontSwatch
          script="hebrew"
          typeface={Typeface.FrankRuhlLibre}
          label="Frank Ruhl Libre"
          selected
          onPress={noop}
        />
        <FontSwatch
          script="latin"
          typeface={LatinTypeface.Inter}
          label="Inter"
          selected={false}
          onPress={noop}
        />
      </>,
      theme,
    )
  })

  it('ThemeSwatchPicker relabels and reports the pressed mode', () => {
    const onChange = jest.fn()
    const tree = renderWithTheme(
      <ThemeSwatchPicker
        value="sepia"
        onChange={onChange}
        labels={{light: 'White', dark: 'Black'}}
        rtl
      />,
      'light',
    )
    const white = tree.root.findAll(
      (n) => n.props.accessibilityLabel === 'White' && !!n.props.onPress,
    )[0]
    act(() => white.props.onPress())
    expect(onChange).toHaveBeenCalledWith('light')
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('FontSwatchPicker reports the pressed key', () => {
    const onSelect = jest.fn()
    const tree = renderWithTheme(
      <FontSwatchPicker
        script="hebrew"
        selectedKey="a"
        onSelect={onSelect}
        options={[
          {
            key: 'a',
            label: 'Frank Ruhl Libre',
            typeface: Typeface.FrankRuhlLibre,
          },
          {key: 'b', label: 'David', typeface: Typeface.David},
        ]}
      />,
      'light',
    )
    const david = tree.root.findAll(
      (n) => n.props.accessibilityLabel === 'David' && !!n.props.onPress,
    )[0]
    act(() => david.props.onPress())
    expect(onSelect).toHaveBeenCalledWith('b')
  })

  it('Slider', () => {
    expectSnapshot(
      <Slider
        value={19}
        min={14}
        max={28}
        onValueChange={noop}
        accessibilityLabel="Font size"
      />,
      theme,
    )
  })

  it('DetailOverlay as a sheet', () => {
    expectSnapshot(
      <DetailOverlay visible title="משנה א׳" titleRtl onClose={noop}>
        <Text>Detail</Text>
      </DetailOverlay>,
      theme,
    )
  })

  it('new props on existing components', () => {
    expectSnapshot(
      <>
        <Button title="הבא" rtl icon="chevron-left" iconPosition="end" />
        <IconButton name="add" variant="accent" accessibilityLabel="Add" />
        <IconButton name="remove" variant="filled" accessibilityLabel="Less" />
        <IconButton name="bookmark" accessibilityLabel="Saved" />
        <EmptyState icon="bookmark-outline" title="Nothing yet" />
        <ListRow
          title="ברכות"
          subtitle="ט׳ פרקים"
          rtl
          showChevron
          onPress={noop}
          trailing={<Badge label="1/9" tone="accent" />}
        />
        <TextField variant="boxed" multiline placeholder="Add a note" />
        <ToggleSetting title="רמב״ם" rtl enabled onSwitch={noop} />
        <Text content="latin" italic>
          Translation
        </Text>
        <Text content secondary rtl bold>
          פירוש
        </Text>
      </>,
      theme,
    )
  })
})

describe('family component behavior', () => {
  it('Chip and a pressable Card fire onPress', () => {
    const onChip = jest.fn()
    const onCard = jest.fn()
    const renderer = renderWithTheme(
      <>
        <Chip label="א" onPress={onChip} />
        <Card onPress={onCard}>
          <Text>card</Text>
        </Card>
      </>,
    )
    const [chip, card] = pressables(renderer)
    act(() => chip.props.onPress())
    act(() => card.props.onPress())
    expect(onChip).toHaveBeenCalledTimes(1)
    expect(onCard).toHaveBeenCalledTimes(1)
  })

  it('ListRow keeps its actions outside the row tap target', () => {
    const onRow = jest.fn()
    const onAction = jest.fn()
    const renderer = renderWithTheme(
      <ListRow
        title="row"
        onPress={onRow}
        actions={[{icon: 'delete', label: 'Delete', onPress: onAction}]}
      />,
    )
    const [row, action] = pressables(renderer)
    act(() => action.props.onPress())
    expect(onAction).toHaveBeenCalledTimes(1)
    expect(onRow).not.toHaveBeenCalled()
    act(() => row.props.onPress())
    expect(onRow).toHaveBeenCalledTimes(1)
  })

  it('PageDots as a worm, dragging and in RTL', () => {
    expectSnapshot(
      <>
        <PageDots count={4} index={1} />
        <PageDots count={4} index={2} dragging />
        <RtlScope>
          <PageDots count={4} index={0} />
        </RtlScope>
      </>,
      'light',
    )
  })

  it('PagerPill, glass and plain, in RTL', () => {
    expectSnapshot(
      <RtlScope>
        <PagerPill
          title="פרק ב׳"
          titleRtl
          onNext={noop}
          onTitlePress={noop}
          previousLabel="Previous"
          nextLabel="Next"
        />
        <PagerPill
          glass={false}
          title="פרק ג׳"
          titleRtl
          onPrevious={noop}
          onNext={noop}
          previousLabel="Previous"
          nextLabel="Next"
        />
      </RtlScope>,
      'light',
    )
  })

  it('PagerPill puts next on the left in RTL and slides the title', () => {
    const onNext = jest.fn()
    const element = (title: string) => (
      <RtlScope>
        <PagerPill
          title={title}
          onNext={onNext}
          previousLabel="Previous"
          nextLabel="Next"
        />
      </RtlScope>
    )
    const renderer = renderWithTheme(element('א'))
    const [first] = pressables(renderer)
    expect(first.props.accessibilityLabel).toBe('Next')
    act(() => first.props.onPress())
    expect(onNext).toHaveBeenCalledTimes(1)
    act(() =>
      renderer.update(
        <DesignSystemProvider mode="light" brand={testBrand}>
          {element('ב')}
        </DesignSystemProvider>,
      ),
    )
    expect(renderer.toJSON()).toBeTruthy()
  })

  it('Header with a center slot', () => {
    expectSnapshot(
      <Header onBack={noop} center={<Chip label="ברכות" onPress={noop} />} />,
      'light',
    )
  })

  it('Chip with a leading check', () => {
    expectSnapshot(
      <>
        <Chip label="שבת" selected check onPress={noop} />
        <Chip label="פסחים" check onPress={noop} />
      </>,
      'light',
    )
  })

  it('ChipScroller', () => {
    expectSnapshot(
      <ChipScroller rtl>
        <Chip label="א" selected check onPress={noop} />
        <Chip label="ב" check onPress={noop} />
      </ChipScroller>,
      'light',
    )
  })

  it('SortableList reorders through its move actions', () => {
    const onReorder = jest.fn()
    const items = [
      {key: 'a', label: 'ברטנורא', rtl: true},
      {key: 'b', label: 'רמב״ם', rtl: true},
    ]
    const renderer = renderWithTheme(
      <RtlScope>
        <SortableList items={items} onReorder={onReorder} />
      </RtlScope>,
      'light',
    )
    expect(renderer.toJSON()).toMatchSnapshot()
    const rows = renderer.root.findAll(
      (n) =>
        n.props.accessibilityLabel === 'ברטנורא' &&
        !!n.props.onAccessibilityAction,
    )
    act(() =>
      rows[0].props.onAccessibilityAction({
        nativeEvent: {actionName: 'moveDown'},
      }),
    )
    expect(onReorder).toHaveBeenCalledWith(['b', 'a'])
  })
})
