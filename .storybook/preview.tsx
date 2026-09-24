import React from 'react'
import type {Preview} from '@storybook/react-native-web-vite'
import {DesignSystemProvider} from '../theme'
import {resolveColor, ThemeMode} from '../colors/themes'
import {sampleBrands} from '../colors/sampleBrands'
import {SemanticColor} from '../colors/semantic'

// Every story renders inside the design system's provider; the toolbar's Mode
// switch is what an app would pass down after resolving light/dark/system,
// and Brand stands in for the app's hue with one of the sample brands
// (everything else is shared by the family).
const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },
  initialGlobals: {mode: 'light', brand: 'Blue'},
  globalTypes: {
    mode: {
      description: 'Theme mode passed to DesignSystemProvider',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          {value: 'light', title: 'Light'},
          {value: 'sepia', title: 'Sepia'},
          {value: 'dark', title: 'Dark'},
        ],
        dynamicTitle: true,
      },
    },
    brand: {
      description: 'Brand passed to DesignSystemProvider',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: Object.keys(sampleBrands).map((name) => ({
          value: name,
          title: name,
        })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.mode ?? 'light') as ThemeMode
      const brand =
        sampleBrands[
          (context.globals.brand ?? 'Blue') as keyof typeof sampleBrands
        ]
      return (
        <DesignSystemProvider mode={mode} brand={brand}>
          <div
            style={{
              minHeight: '100vh',
              background: resolveColor(
                mode,
                SemanticColor.SurfaceBackground,
                brand,
              ),
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
