import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {RtlScope} from '../../layout'
import {Grid} from '../Grid'
import {TimeTile} from './TimeTile'

const meta = {
  title: 'Calendar/TimeTile',
  component: TimeTile,
  parameters: {layout: 'padded'},
  args: {label: 'הדלקת נרות', time: '3:05 PM', highlighted: true},
} satisfies Meta<typeof TimeTile>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const YomTovGrid: Story = {
  render: () => (
    <RtlScope>
      <Grid columns={2} rtl>
        <TimeTile label="הדלקת נרות" day="Mon" time="8:03 PM" highlighted />
        <TimeTile
          label="הדלקת נרות"
          day="Tue"
          time="after 9:12 PM"
          highlighted
        />
        <TimeTile label="צאת יום טוב" day="Wed" time="10:47 PM" />
      </Grid>
    </RtlScope>
  ),
}
