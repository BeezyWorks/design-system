import React from 'react'
import {Surface} from '../Surface'
import {Icon} from '../Icon'
import {IconButton} from '../IconButton'
import {MenuOption} from '../MenuOption'
import {MenuSection} from '../MenuSection'
import {MessageCard} from '../MessageCard'
import {NestedSettingHeader} from '../NestedSettingHeader'
import {PagerFrame} from '../PagerFrame'
import {SettingsBox} from '../SettingsBox'
import {SettingsCard} from '../SettingsCard'
import {SettingsListRow} from '../SettingsListRow'
import {SlideIndicator} from '../SlideIndicator'
import {Stack} from '../Stack'
import {Stepper} from '../Stepper'
import {TabBarIcon} from '../TabBarIcon'
import {TextField} from '../TextField'
import {Text} from '../Text'
import {Scrim} from '../Scrim'
import {SemanticColor} from '../../colors'
import {
  pressables,
  renderWithTheme,
  themes,
} from '../../testing/renderWithTheme'

const expectSnapshot = (ui: React.ReactElement, theme: 'light' | 'dark') =>
  expect(renderWithTheme(ui, theme).toJSON()).toMatchSnapshot()

const noop = () => {}

describe.each(themes)('more components (%s theme)', (theme) => {
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

    it('Scrim', () => {
      expectSnapshot(
        <>
          <Scrim />
          <Scrim opacity={0.3} onPress={noop} />
        </>,
        theme,
      )
    })

    it('SlideIndicator', () => {
      expectSnapshot(<SlideIndicator />, theme)
    })
  })

  describe('text', () => {
    it('MessageCard', () => {
      expectSnapshot(<MessageCard message="Erev Shabbos" />, theme)
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
})
