import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {GlassSurface} from '../GlassSurface'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {PhotoSheetScroll} from './PhotoSheetScroll'

const meta = {
  title: 'Layout/PhotoSheetScroll',
  component: PhotoSheetScroll,
  parameters: {layout: 'fullscreen'},
  args: {
    source: {uri: 'https://picsum.photos/id/1018/1200/1600'},
    hero: (
      <GlassSurface padding="md" gap="xs">
        <Text variant="itemHeader">Continue</Text>
        <Text variant="detail">Where you left off</Text>
      </GlassSurface>
    ),
    children: (
      <Stack gap="md">
        {Array.from({length: 12}, (_, i) => (
          <Card key={i}>
            <Text>Row {i + 1}</Text>
          </Card>
        ))}
      </Stack>
    ),
  },
} satisfies Meta<typeof PhotoSheetScroll>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** The hero sized to its content: the sheet starts right under it. */
export const ContentSizedHero: Story = {args: {heroShare: 0}}
