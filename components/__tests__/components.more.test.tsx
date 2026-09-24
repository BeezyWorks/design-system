import React from 'react'
import {AgendaRow} from '../AgendaRow'
import {AgendaSectionHeader} from '../AgendaSectionHeader'
import {CompassBadge} from '../CompassBadge'
import {ContentText} from '../ContentText'
import {Surface} from '../Surface'
import {DashboardRow} from '../DashboardRow'
import {EventRow} from '../EventRow'
import {Icon} from '../Icon'
import {IconButton} from '../IconButton'
import {MenuOption} from '../MenuOption'
import {MenuSection} from '../MenuSection'
import {MessageCard} from '../MessageCard'
import {NestedSettingHeader} from '../NestedSettingHeader'
import {NotificationRow} from '../NotificationRow'
import {PagerFrame} from '../PagerFrame'
import {PanelGrid2x2} from '../PanelGrid2x2'
import {PanelTabRow} from '../PanelTabRow'
import {ReaderParagraph} from '../ReaderParagraph'
import {SettingsBox} from '../SettingsBox'
import {SettingsCard} from '../SettingsCard'
import {SettingsListRow} from '../SettingsListRow'
import {SlideIndicator} from '../SlideIndicator'
import {SpecialNotificationRow} from '../SpecialNotificationRow'
import {Stack} from '../Stack'
import {Stepper} from '../Stepper'
import {TabBarIcon} from '../TabBarIcon'
import {TextField} from '../TextField'
import {Text} from '../Text'
import {TypefaceChips} from '../TypefaceChips'
import {UpcomingZmanButton} from '../UpcomingZmanButton'
import {VersionText} from '../VersionText'
import {ZmanimSeparator} from '../ZmanimSeparator'
import {Menora} from '../Menora'
import {Scrim} from '../Scrim'
import {eventCategoryColors, SemanticColor} from '../../colors'
import {
  pressables,
  renderWithTheme,
  themes,
} from '../../testing/renderWithTheme'

const expectSnapshot = (ui: React.ReactElement, theme: 'light' | 'dark') =>
  expect(renderWithTheme(ui, theme).toJSON()).toMatchSnapshot()

const noop = () => {}

describe.each(themes)('more components (%s theme)', (theme) => {
  describe('calendar / agenda', () => {
    it.each(
      Object.keys(eventCategoryColors) as Array<
        keyof typeof eventCategoryColors
      >,
    )('AgendaRow %s', (category) => {
      expectSnapshot(<AgendaRow name="Yahrzeit" category={category} />, theme)
    })

    it('AgendaSectionHeader', () => {
      expectSnapshot(
        <AgendaSectionHeader gregorianDate="30 July 2020" hebrewDate="ט׳ אב" />,
        theme,
      )
    })

    it.each([true, false])('EventRow isLast=%s', (isLast) => {
      expectSnapshot(
        <EventRow
          description="Yahrzeit"
          hebrewDate="ט׳ אב"
          nextOccurrenceDate="30 July 2020"
          onDelete={noop}
          isLast={isLast}
        />,
        theme,
      )
    })

    it('DashboardRow with and without a value', () => {
      expectSnapshot(
        <>
          <DashboardRow title="Parsha" value="Devarim" />
          <DashboardRow title="Omer" />
        </>,
        theme,
      )
    })
  })

  describe('layout primitives', () => {
    it('Stack direction / align / justify / gap', () => {
      expectSnapshot(
        <>
          <Stack direction="row" align="center" justify="spaceBetween" gap="md">
            <Text>a</Text>
            <Text>b</Text>
          </Stack>
          <Stack
            direction="rowReverse"
            align="end"
            justify="center"
            gap="sm"
            wrap
          >
            <Text>a</Text>
          </Stack>
          <Stack
            padding="lg"
            paddingVertical="sm"
            background={SemanticColor.SurfaceBackground}
            radius="md"
            shadow="card"
          >
            <Text>padded</Text>
          </Stack>
          <Stack grow width="100%" height={20} />
        </>,
        theme,
      )
    })

    it('DarkSurface', () => {
      expectSnapshot(
        <Surface
          background={SemanticColor.SurfacePanel}
          height={120}
          radius="lg"
          shadow="card"
          grow
        >
          <Text>on dark</Text>
        </Surface>,
        theme,
      )
    })

    it('PagerFrame', () => {
      expectSnapshot(
        <PagerFrame paddingBottom={24}>
          <Text>page</Text>
        </PagerFrame>,
        theme,
      )
    })

    it('PanelGrid2x2', () => {
      expectSnapshot(
        <PanelGrid2x2>
          {[
            <Text key="a">a</Text>,
            <Text key="b">b</Text>,
            <Text key="c">c</Text>,
            <Text key="d">d</Text>,
          ]}
        </PanelGrid2x2>,
        theme,
      )
    })

    it('Scrim', () => {
      expectSnapshot(
        <>
          <Scrim />
          <Scrim opacity={0.3} onPress={noop} />
        </>,
        theme,
      )
    })

    it('SlideIndicator, ZmanimSeparator, Menora', () => {
      expectSnapshot(
        <>
          <SlideIndicator />
          <ZmanimSeparator />
          <Menora />
        </>,
        theme,
      )
    })
  })

  describe('text', () => {
    it.each([
      ['regular', 'normal', 'normal'],
      ['bold', 'large', 'special'],
      ['regular', 'small', 'normal'],
    ] as const)(
      'ContentText weight=%s size=%s tone=%s',
      (weight, size, tone) => {
        expectSnapshot(
          <ContentText weight={weight} size={size} tone={tone}>
            בראשית ברא אלהים
          </ContentText>,
          theme,
        )
      },
    )

    it('ReaderParagraph with and without a heading', () => {
      expectSnapshot(
        <>
          <ReaderParagraph heading="ראשון">טקסט</ReaderParagraph>
          <ReaderParagraph>טקסט</ReaderParagraph>
        </>,
        theme,
      )
    })

    it('MessageCard', () => {
      expectSnapshot(<MessageCard message="Erev Shabbos" />, theme)
    })

    it('CompassBadge', () => {
      expectSnapshot(<CompassBadge>NE</CompassBadge>, theme)
    })

    it('VersionText', () => {
      expectSnapshot(
        <>
          <VersionText versionName="9.7.2" />
          <VersionText versionName="9.7.2" buildNumber="412" />
        </>,
        theme,
      )
    })
  })

  describe('icons', () => {
    it('Icon in a few sizes and tones', () => {
      expectSnapshot(
        <>
          <Icon name="settings" />
          <Icon name="book" size={32} color={SemanticColor.TextAccent} />
          <Icon
            name="chevron-left"
            size={16}
            color={SemanticColor.TextDanger}
          />
        </>,
        theme,
      )
    })

    it('IconButton enabled and disabled', () => {
      expectSnapshot(
        <>
          <IconButton name="add" accessibilityLabel="Add" onPress={noop} />
          <IconButton name="delete" accessibilityLabel="Delete" disabled />
        </>,
        theme,
      )
    })

    it.each([true, false])('TabBarIcon focused=%s', (focused) => {
      expectSnapshot(
        <TabBarIcon name="calendar-today" focused={focused} />,
        theme,
      )
    })
  })

  describe('lists and menus', () => {
    it('MenuSection', () => {
      expectSnapshot(
        <MenuSection
          title="תפילות"
          items={[
            {key: 'a', label: 'שחרית', onPress: noop},
            {key: 'b', label: 'מנחה', onPress: noop},
            {key: 'c', label: 'מעריב', onPress: noop},
          ]}
        />,
        theme,
      )
    })

    it.each([true, false])('MenuOption selected=%s', (selected) => {
      expectSnapshot(
        <MenuOption label="Ashkenaz" selected={selected} onPress={noop} />,
        theme,
      )
    })

    it('PanelTabRow', () => {
      expectSnapshot(
        <PanelTabRow
          tabs={[
            {key: 'zmanim', label: 'זמנים'},
            {key: 'agenda', label: 'אג׳נדה'},
          ]}
          activeKey="zmanim"
          onSelect={noop}
        />,
        theme,
      )
    })

    it('TypefaceChips', () => {
      expectSnapshot(
        <TypefaceChips
          items={[
            {key: 'frank', label: 'Frank', face: 'Frank'},
            {key: 'cardo', label: 'Cardo', face: 'Cardo' as never},
          ]}
          selectedKey="frank"
          onSelect={noop}
          sampleText="בראשית"
        />,
        theme,
      )
    })
  })

  describe('settings', () => {
    it('SettingsCard and SettingsBox', () => {
      expectSnapshot(
        <>
          <SettingsCard title="Display">
            <Text>child</Text>
          </SettingsCard>
          <SettingsCard grow>
            <Text>untitled</Text>
          </SettingsCard>
          <SettingsBox title="Notifications">
            <Text>child</Text>
          </SettingsBox>
        </>,
        theme,
      )
    })

    it.each([true, false])('SettingsListRow disabled=%s', (disabled) => {
      expectSnapshot(
        <SettingsListRow
          title="Nusach"
          value="Ashkenaz"
          onPress={noop}
          disabled={disabled}
        />,
        theme,
      )
    })

    it('NestedSettingHeader', () => {
      expectSnapshot(
        <NestedSettingHeader title="Display" onPress={noop} />,
        theme,
      )
    })

    it('Stepper', () => {
      expectSnapshot(
        <>
          <Stepper label="18 min" onDecrement={noop} onIncrement={noop} />
          <Stepper
            label="0 min"
            onDecrement={noop}
            onIncrement={noop}
            decrementDisabled
            incrementDisabled
          />
        </>,
        theme,
      )
    })

    it('TextField', () => {
      expectSnapshot(
        <>
          <TextField placeholder="Name" value="" onChangeText={noop} />
          <TextField
            value="Miriam bat Sarah"
            onChangeText={noop}
            align="right"
          />
        </>,
        theme,
      )
    })

    it.each([true, false])('NotificationRow enabled=%s', (enabled) => {
      expectSnapshot(
        <NotificationRow
          zmanLabel="Sunset"
          offsetLabel="10 min before"
          timeLabel="7:37 PM"
          enabled={enabled}
          onToggle={noop}
          onEdit={noop}
          onDelete={noop}
        />,
        theme,
      )
    })

    it('SpecialNotificationRow', () => {
      expectSnapshot(
        <>
          <SpecialNotificationRow
            name="Omer"
            description="Reminder to count the Omer"
            enabled
            onToggle={noop}
          />
          <SpecialNotificationRow
            name="Eiruv Tavshilin"
            description="Reminder on erev yom tov"
            enabled={false}
            onToggle={noop}
            isLast
          />
        </>,
        theme,
      )
    })
  })

  it('UpcomingZmanButton', () => {
    expectSnapshot(
      <UpcomingZmanButton
        tefilaLabel="מנחה"
        zmanName="Sunset"
        zmanTime="7:47 PM"
        onPress={noop}
      />,
      theme,
    )
  })
})

describe('interaction', () => {
  it('IconButton calls onPress and is disabled when asked', () => {
    const onPress = jest.fn()
    const enabled = renderWithTheme(
      <IconButton name="add" accessibilityLabel="Add" onPress={onPress} />,
    )
    pressables(enabled)[0].props.onPress()
    expect(onPress).toHaveBeenCalledTimes(1)

    const disabled = renderWithTheme(
      <IconButton name="add" accessibilityLabel="Add" disabled />,
    )
    expect(pressables(disabled)[0].props.disabled).toBe(true)
  })

  it('NotificationRow wires up edit and delete', () => {
    const onEdit = jest.fn()
    const onDelete = jest.fn()
    const r = renderWithTheme(
      <NotificationRow
        zmanLabel="Sunset"
        offsetLabel="10 min before"
        timeLabel="7:37 PM"
        enabled
        onToggle={noop}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    )
    const handlers = pressables(r).map((p) => p.props.onPress)
    handlers.forEach((h) => h?.())
    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('MenuSection fires the pressed item', () => {
    const first = jest.fn()
    const second = jest.fn()
    const r = renderWithTheme(
      <MenuSection
        title="תפילות"
        items={[
          {key: 'a', label: 'שחרית', onPress: first},
          {key: 'b', label: 'מנחה', onPress: second},
        ]}
      />,
    )
    pressables(r)[1].props.onPress()
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('PanelTabRow reports the selected tab', () => {
    const onSelect = jest.fn()
    const r = renderWithTheme(
      <PanelTabRow
        tabs={[
          {key: 'zmanim', label: 'זמנים'},
          {key: 'agenda', label: 'אג׳נדה'},
        ]}
        activeKey="zmanim"
        onSelect={onSelect}
      />,
    )
    pressables(r)[1].props.onPress()
    expect(onSelect).toHaveBeenCalledWith('agenda')
  })
})
