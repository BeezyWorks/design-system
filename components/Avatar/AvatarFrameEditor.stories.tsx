import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {Avatar} from './Avatar'
import {AvatarFrameEditor} from './AvatarFrameEditor'
import {AvatarFrame, formatAvatarImage} from './avatarFrame'
import {Stack} from '../Stack'
import {Text} from '../Text'

const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#2f6f73"/><stop offset="1" stop-color="#e8b86d"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><circle cx="430" cy="150" r="70" fill="#fff"/><circle cx="405" cy="135" r="9"/><circle cx="455" cy="135" r="9"/><rect x="60" y="280" width="160" height="60" fill="#1d3b3d"/></svg>'
const image = `data:image/svg+xml;base64,${btoa(svg)}`

const Editor = () => {
  const [frame, setFrame] = useState<AvatarFrame | null>(null)
  const link = formatAvatarImage(image, frame)
  return (
    <GestureHandlerRootView>
      <Stack gap="md" align="center">
        <AvatarFrameEditor
          imageUrl={image}
          onChange={setFrame}
          hint="Drag to position. Pinch or use the slider to zoom."
          zoomLabel="Zoom"
        />
        <Stack direction="row" gap="md" align="center">
          <Avatar imageUrl={link} size={72} />
          <Avatar imageUrl={link} size={44} />
        </Stack>
        <Text variant="caption" testID="avatar-frame-value">
          {link.slice(image.length) || 'plain link'}
        </Text>
      </Stack>
    </GestureHandlerRootView>
  )
}

const meta = {
  title: 'Auth/AvatarFrameEditor',
  component: Editor,
  parameters: {layout: 'padded'},
} satisfies Meta<typeof Editor>
export default meta

export const Default: StoryObj<typeof meta> = {}
