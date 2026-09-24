import React from 'react'
import type {Preview} from '@storybook/react-native-web-vite'
import {DesignSystemProvider} from '../theme'
import {resolveColor, ThemeMode} from '../colors/themes'
import {SemanticColor} from '../colors/semantic'

// Every story renders inside the design system's provider; the toolbar's Mode
// switch is what an app would pass down after resolving light/dark/system.
const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },
  initialGlobals: {mode: 'light'},
  globalTypes: {
    mode: {
      description: 'Theme mode passed to DesignSystemProvider',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          {value: 'light', title: 'Light'},
          {value: 'dark', title: 'Dark'},
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.mode ?? 'light') as ThemeMode
      return (
        <DesignSystemProvider mode={mode}>
          <div
            style={{
              minHeight: '100vh',
              background: resolveColor(mode, SemanticColor.SurfaceBackground),
            }}
          >
            <Story />
          </div>
        </DesignSystemProvider>
      )
    },
  ],
}

export default preview
