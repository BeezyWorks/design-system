import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {RtlScope} from '../../layout'
import {PagerPill} from '../PagerPill'
import {Stack} from '../Stack'
import {SectionsPopover, SectionsPopoverProps} from './SectionsPopover'

const ALIYOS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'ששי', 'שביעי']

const Demo = (args: SectionsPopoverProps) => {
  const [open, setOpen] = useState(args.visible)
  const [current, setCurrent] = useState(1)
  return (
    <Stack height={560}>
      <Stack
        position="absolute"
        left="none"
        right="none"
        bottom="md"
        align="center"
      >
        <RtlScope>
          <PagerPill
            titleRtl
            title={ALIYOS[current]}
            previousLabel="Previous aliyah"
            nextLabel="Next aliyah"
            onPrevious={current > 0 ? () => setCurrent(current - 1) : undefined}
            onNext={current < 6 ? () => setCurrent(current + 1) : undefined}
            onTitlePress={() => setOpen((o) => !o)}
            pickerOpen={open}
          />
        </RtlScope>
      </Stack>
      <SectionsPopover
        {...args}
        visible={open}
        onDismiss={() => setOpen(false)}
        currentSectionKey={String(current)}
        onSelectSection={(key) => {
          setOpen(false)
          setCurrent(Number(key))
        }}
      />
    </Stack>
  )
}

const meta = {
  title: 'Overlays/SectionsPopover',
  component: SectionsPopover,
  parameters: {layout: 'fullscreen'},
  args: {
    visible: true,
    placement: 'bottom',
    edgeOffset: 72,
    sections: ALIYOS.map((label, i) => ({key: String(i), label})),
    onDismiss: () => {},
    onSelectSection: () => {},
  },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof SectionsPopover>
export default meta
type Story = StoryObj<typeof meta>

export const FromThePagerPill: Story = {}
