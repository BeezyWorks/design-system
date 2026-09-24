import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Typeface} from '../../typography'
import {TypefaceChips, TypefaceChipsProps} from './TypefaceChips'

const items: TypefaceChipsProps['items'] = [
  {key: 'frank', label: 'Frank', face: Typeface.Frank},
  {key: 'david', label: 'David', face: Typeface.David},
  {key: 'ezra', label: 'Ezra', face: Typeface.Ezra},
  {key: 'hadasim', label: 'Hadasim', face: Typeface.Hadasim},
  {key: 'vilna', label: 'Vilna', face: Typeface.MekorotVilna},
  {key: 'cardo', label: 'Cardo', face: Typeface.Cardo},
]

const Controlled = (args: TypefaceChipsProps) => {
  const [selectedKey, setSelectedKey] = useState(args.selectedKey)
  return (
    <TypefaceChips
      {...args}
      selectedKey={selectedKey}
      onSelect={setSelectedKey}
    />
  )
}

const meta = {
  title: 'Controls/TypefaceChips',
  component: TypefaceChips,
  parameters: {layout: 'padded'},
  args: {items, selectedKey: 'frank', onSelect: () => {}},
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof TypefaceChips>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const CustomSample: Story = {args: {sampleText: 'בראשית'}}
