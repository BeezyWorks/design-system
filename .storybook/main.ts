import {fileURLToPath} from 'node:url'
import type {StorybookConfig} from '@storybook/react-native-web-vite'

const stub = (name: string) =>
  fileURLToPath(new URL(`./stubs/${name}`, import.meta.url))

// Web-only Storybook for the design system (react-native-web via Vite).
// Stories live next to what they document in this repo.
const config: StorybookConfig = {
  stories: ['../!(node_modules)/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  // moment's UMD build loses its named exports (`isDate`, `isMoment`) through
  // Vite's CJS interop, so route it through a shim (see stubs/moment.ts).
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: [
        ...(Array.isArray(viteConfig.resolve?.alias)
          ? viteConfig.resolve.alias
          : Object.entries(viteConfig.resolve?.alias ?? {}).map(
              ([find, replacement]) => ({find, replacement}),
            )),
        {find: /^moment$/, replacement: stub('moment.ts')},
        // The design system's font assets are native-only (see the stub).
        {find: /^\.\/fonts$/, replacement: stub('design-fonts.ts')},
        // Expo native modules Vite can't bundle (they need expo-modules-core,
        // which ships TS source only) — web stand-ins.
        {
          find: /^expo-glass-effect$/,
          replacement: stub('expo-glass-effect.tsx'),
        },
        {find: /^expo-blur$/, replacement: stub('expo-blur.tsx')},
      ],
    },
  }),
}

export default config
