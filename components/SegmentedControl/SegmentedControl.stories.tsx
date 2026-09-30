import React, {useState} from 'react'
import {View} from 'react-native'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import type {ThemeMode} from '../../colors'
import {ThemeScope} from '../../theme'
import {SettingsCard} from '../SettingsCard'
import {SettingsRow, SettingsStackedRow} from '../SettingsRow'
import {Stack} from '../Stack'
import {SegmentedControl, SegmentOption} from './SegmentedControl'

const themeOptions: SegmentOption<'light' | 'dark' | 'system'>[] = [
  {key: 'light', label: 'Light'},
  {key: 'dark', label: 'Dark'},
  {key: 'system', label: 'System'},
]

const Demo = <T extends string>({
  options,
  initial,
  label,
}: {
  options: SegmentOption<T>[]
  initial: T
  label?: string
}) => {
  const [value, setValue] = useState<T>(initial)
  return (
    <SegmentedControl
      options={options}
      value={value}
      onChange={setValue}
      accessibilityLabel={label}
    />
  )
}

const Themed = ({initial}: {initial: 'light' | 'dark' | 'system'}) => (
  <Demo options={themeOptions} initial={initial} label="Theme" />
)

/** The control on a page background in a forced mode. */
const InMode = ({
  mode,
  children,
}: {
  mode: ThemeMode
  children: React.ReactNode
}) => (
  <ThemeScope mode={mode}>
    <Stack background={SemanticColor.SurfaceBackground} padding="lg">
      {children}
    </Stack>
  </ThemeScope>
)

const meta = {
  title: 'Controls/SegmentedControl',
  parameters: {layout: 'padded'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const ThreeOptions: Story = {render: () => <Themed initial="system" />}

export const TwoOption: Story = {
  render: () => (
    <Demo
      initial="12"
      options={[
        {key: '12', label: '12 hour'},
        {key: '24', label: '24 hour'},
      ]}
    />
  ),
}

export const FourOptions: Story = {
  render: () => (
    <Demo
      initial="b"
      options={[
        {key: 'a', label: 'Small'},
        {key: 'b', label: 'Medium'},
        {key: 'c', label: 'Large'},
        {key: 'd', label: 'Huge'},
      ]}
    />
  ),
}

export const Dark: Story = {
  render: () => (
    <InMode mode="dark">
      <Themed initial="dark" />
    </InMode>
  ),
}

export const Sepia: Story = {
  render: () => (
    <InMode mode="sepia">
      <Themed initial="light" />
    </InMode>
  ),
}

export const LongLabels: Story = {
  render: () => (
    <Demo
      initial="middle"
      options={[
        {key: 'none', label: 'No commentary'},
        {key: 'middle', label: 'Commentary in Middle'},
        {key: 'bottom', label: 'Commentary below'},
      ]}
    />
  ),
}

export const HebrewLabels: Story = {
  render: () => (
    <Demo
      initial="sfard"
      options={[
        {key: 'ashkenaz', label: 'אשכנז'},
        {key: 'sfard', label: 'ספרד'},
        {key: 'mizrach', label: 'עדות המזרח'},
      ]}
    />
  ),
}

/** Narrow container: long labels shrink (down to 0.8x) instead of wrapping. */
export const Narrow320: Story = {
  render: () => (
    <View style={{width: 320}}>
      <Demo
        initial="middle"
        options={[
          {key: 'none', label: 'No commentary'},
          {key: 'middle', label: 'Commentary in Middle'},
          {key: 'bottom', label: 'Below'},
        ]}
      />
    </View>
  ),
}

export const InSettingsCard: Story = {
  render: () => (
    <SettingsCard title="Display">
      <SettingsRow title="Theme">
        <Themed initial="system" />
      </SettingsRow>
      <SettingsStackedRow title="Nusach">
        <Demo
          initial="sfard"
          options={[
            {key: 'ashkenaz', label: 'אשכנז'},
            {key: 'sfard', label: 'ספרד'},
            {key: 'mizrach', label: 'עדות המזרח'},
          ]}
        />
      </SettingsStackedRow>
    </SettingsCard>
  ),
}
