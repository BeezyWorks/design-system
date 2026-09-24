import React from 'react'
import {act} from 'react-test-renderer'
import {Badge} from '../Badge'
import {Button} from '../Button'
import {Card} from '../Card'
import {Chip} from '../Chip'
import {DetailOverlay} from '../DetailOverlay'
import {EmptyState} from '../EmptyState'
import {FontSwatch} from '../FontSwatch'
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
import {ToggleSetting} from '../ToggleSetting'
import {LatinTypeface, Typeface} from '../../typography'
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
})
