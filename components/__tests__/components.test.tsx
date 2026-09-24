import React from 'react'
import {Switch} from 'react-native'
import {Button, ButtonSize, ButtonVariant} from '../Button'
import {Card} from '../Card'
import {Divider} from '../Divider'
import {EmptyState} from '../EmptyState'
import {EventDot} from '../EventDot'
import {MenuItemRow} from '../MenuItemRow'
import {SectionHeader, SickNameRow, ZmanimRow} from '@components'
import {SegmentedControl} from '../SegmentedControl'
import {SettingsRow} from '../SettingsRow'
import {Spacer} from '../Spacer'
import {Text} from '../Text'
import {ToggleSetting} from '../ToggleSetting'
import {ToggleSwitch} from '../ToggleSwitch'
import {eventCategoryColors, SemanticColor} from '../../colors'
import {
  pressables,
  renderWithTheme,
  themes,
} from '../../testing/renderWithTheme'

const expectSnapshot = (ui: React.ReactElement, theme: 'light' | 'dark') =>
  expect(renderWithTheme(ui, theme).toJSON()).toMatchSnapshot()

describe.each(themes)('components (%s theme)', (theme) => {
  describe('Button', () => {
    const variants: ButtonVariant[] = [
      'primary',
      'secondary',
      'ghost',
      'destructive',
      'outline',
    ]
    const sizes: ButtonSize[] = ['sm', 'md', 'lg']

    it.each(variants)('%s variant', (variant) => {
      expectSnapshot(<Button title="Save" variant={variant} />, theme)
    })

    it.each(sizes)('%s size', (size) => {
      expectSnapshot(<Button title="Save" size={size} />, theme)
    })

    it('with an icon', () => {
      expectSnapshot(<Button title="Add" icon="add" />, theme)
    })

    it('disabled', () => {
      expectSnapshot(<Button title="Save" disabled />, theme)
    })

    it('loading', () => {
      expectSnapshot(<Button title="Save" loading />, theme)
    })
  })

  describe('Text', () => {
    it.each([
      'caption',
      'body',
      'headline',
      'title',
      'pageHeader',
      'sectionHeader',
    ] as const)('%s variant', (variant) => {
      expectSnapshot(<Text variant={variant}>שלום</Text>, theme)
    })

    it('with tone, alignment and bold', () => {
      expectSnapshot(
        <Text color={SemanticColor.TextAccent} align="center" bold>
          שלום
        </Text>,
        theme,
      )
    })

    it('as reading content', () => {
      expectSnapshot(<Text content>בראשית ברא</Text>, theme)
    })

    it('in ktav Rashi', () => {
      expectSnapshot(<Text rashiScript>רש״י</Text>, theme)
    })
  })

  it('Divider', () => {
    expectSnapshot(<Divider />, theme)
  })

  it('Spacer', () => {
    expectSnapshot(
      <>
        <Spacer />
        <Spacer size="xl" />
        <Spacer grow />
      </>,
      theme,
    )
  })

  it('Card', () => {
    expectSnapshot(
      <Card padding="md">
        <Text>Inside</Text>
      </Card>,
      theme,
    )
  })

  describe('ToggleSwitch', () => {
    it.each([true, false])('value=%s', (value) => {
      expectSnapshot(
        <ToggleSwitch value={value} onValueChange={() => {}} />,
        theme,
      )
    })

    it('disabled', () => {
      expectSnapshot(
        <ToggleSwitch value onValueChange={() => {}} disabled />,
        theme,
      )
    })
  })

  it('SegmentedControl', () => {
    expectSnapshot(
      <SegmentedControl
        options={[
          {key: 'system', label: 'System'},
          {key: 'light', label: 'Light'},
          {key: 'dark', label: 'Dark'},
        ]}
        value="light"
        onChange={() => {}}
      />,
      theme,
    )
  })

  describe('EmptyState', () => {
    it('title only', () => {
      expectSnapshot(<EmptyState title="No notifications" />, theme)
    })

    it('with subtitle and action', () => {
      expectSnapshot(
        <EmptyState
          title="No notifications"
          subtitle="Add one to be reminded before a zman."
          actionLabel="Add notification"
          onAction={() => {}}
        />,
        theme,
      )
    })
  })

  describe('SectionHeader', () => {
    it('with a title', () => {
      expectSnapshot(<SectionHeader title="שחרית" />, theme)
    })

    it('without a title reserves the gap', () => {
      expectSnapshot(<SectionHeader />, theme)
    })
  })

  describe('ToggleSetting', () => {
    it.each([true, false])('enabled=%s', (enabled) => {
      expectSnapshot(
        <ToggleSetting
          title="Omer alert"
          enabled={enabled}
          onSwitch={() => {}}
        />,
        theme,
      )
    })

    it('with on/off titles', () => {
      expectSnapshot(
        <ToggleSetting
          title="Nusach"
          titleOn="Sfard"
          titleOff="Ashkenaz"
          enabled
          onSwitch={() => {}}
        />,
        theme,
      )
    })
  })

  it('SettingsRow', () => {
    expectSnapshot(
      <SettingsRow title="Font size">
        <Text>Normal</Text>
      </SettingsRow>,
      theme,
    )
  })

  describe('ZmanimRow', () => {
    it('upcoming', () => {
      expectSnapshot(<ZmanimRow time="7:42 AM" label="Sof Zman Shma" />, theme)
    })

    it('past', () => {
      expectSnapshot(
        <ZmanimRow time="5:10 AM" label="Alos HaShachar" past />,
        theme,
      )
    })
  })

  it.each(
    Object.keys(eventCategoryColors) as Array<keyof typeof eventCategoryColors>,
  )('EventDot %s', (category) => {
    expectSnapshot(<EventDot category={category} />, theme)
  })

  describe('MenuItemRow', () => {
    it('with a divider', () => {
      expectSnapshot(<MenuItemRow label="שחרית" onPress={() => {}} />, theme)
    })

    it('last in a section has no divider', () => {
      expectSnapshot(
        <MenuItemRow label="מעריב" onPress={() => {}} isLast />,
        theme,
      )
    })
  })

  it('SickNameRow', () => {
    expectSnapshot(
      <SickNameRow name="Miriam bat Sarah" onDelete={() => {}} />,
      theme,
    )
  })
})

describe('interaction', () => {
  describe('Button', () => {
    it('calls onPress', () => {
      const onPress = jest.fn()
      const r = renderWithTheme(<Button title="Save" onPress={onPress} />)
      pressables(r)[0].props.onPress()
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('exposes its title as the accessibility label by default', () => {
      const r = renderWithTheme(<Button title="Save" />)
      expect(pressables(r)[0].props.accessibilityLabel).toBe('Save')
    })

    it('prefers an explicit accessibility label', () => {
      const r = renderWithTheme(
        <Button title="Save" accessibilityLabel="Save settings" />,
      )
      expect(pressables(r)[0].props.accessibilityLabel).toBe('Save settings')
    })

    it('is disabled and busy while loading', () => {
      const r = renderWithTheme(<Button title="Save" loading />)
      const pressable = pressables(r)[0]
      expect(pressable.props.disabled).toBe(true)
      expect(pressable.props.accessibilityState).toEqual({
        disabled: true,
        busy: true,
      })
    })

    it('is disabled when disabled', () => {
      const r = renderWithTheme(<Button title="Save" disabled />)
      expect(pressables(r)[0].props.disabled).toBe(true)
    })
  })

  describe('ToggleSwitch', () => {
    it('reports value changes', () => {
      const onValueChange = jest.fn()
      const r = renderWithTheme(
        <ToggleSwitch value={false} onValueChange={onValueChange} />,
      )
      r.root.findByType(Switch).props.onValueChange(true)
      expect(onValueChange).toHaveBeenCalledWith(true)
    })
  })

  describe('SegmentedControl', () => {
    const options = [
      {key: 'system', label: 'System'},
      {key: 'light', label: 'Light'},
    ]

    it('reports the key of a tapped segment', () => {
      const onChange = jest.fn()
      const r = renderWithTheme(
        <SegmentedControl
          options={options}
          value="system"
          onChange={onChange}
        />,
      )
      const touchables = pressables(r)
      expect(touchables).toHaveLength(2)
      touchables[1].props.onPress()
      expect(onChange).toHaveBeenCalledWith('light')
    })
  })

  describe('EmptyState', () => {
    it('runs the action', () => {
      const onAction = jest.fn()
      const r = renderWithTheme(
        <EmptyState title="Empty" actionLabel="Add" onAction={onAction} />,
      )
      pressables(r)[0].props.onPress()
      expect(onAction).toHaveBeenCalledTimes(1)
    })

    it('renders no action without a label', () => {
      const r = renderWithTheme(<EmptyState title="Empty" />)
      expect(pressables(r)).toHaveLength(0)
    })
  })

  describe('ToggleSetting', () => {
    it('flips the value when the row is pressed', () => {
      const onSwitch = jest.fn()
      const r = renderWithTheme(
        <ToggleSetting
          title="Omer alert"
          enabled={false}
          onSwitch={onSwitch}
        />,
      )
      pressables(r)[0].props.onPress()
      expect(onSwitch).toHaveBeenCalledWith(true)
    })
  })

  describe('MenuItemRow', () => {
    it('calls onPress', () => {
      const onPress = jest.fn()
      const r = renderWithTheme(<MenuItemRow label="שחרית" onPress={onPress} />)
      pressables(r)[0].props.onPress()
      expect(onPress).toHaveBeenCalledTimes(1)
    })
  })
})
