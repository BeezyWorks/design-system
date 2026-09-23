import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../colors/semantic'
import {ThemeMode} from '../colors/themes'
import {ThemeScope, useResolvedColor, useThemeMode} from '.'

const meta: Meta = {
  title: 'Foundations/Theme scope',
}
export default meta
type Story = StoryObj

// Reads its colors through the provider, exactly as a DL component would.
const Region = ({label}: {label: string}) => {
  const mode = useThemeMode()
  const background = useResolvedColor(SemanticColor.SurfaceCard)
  const text = useResolvedColor(SemanticColor.TextPrimary)
  const secondary = useResolvedColor(SemanticColor.TextSecondary)
  const accent = useResolvedColor(SemanticColor.AccentPrimary)
  const border = useResolvedColor(SemanticColor.BorderDefault)
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background,
        color: text,
        border: `1px solid ${border}`,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{fontWeight: 600}}>{label}</div>
      <div style={{color: secondary, fontSize: 13}}>mode: {mode}</div>
      <div style={{color: accent, fontSize: 13}}>accent text</div>
    </div>
  )
}

const Nested = ({scope, inner}: {scope: ThemeMode; inner: ThemeMode}) => (
  <div style={{display: 'grid', gap: 12, padding: 24, maxWidth: 420}}>
    <Region label="App (follows the toolbar mode)" />
    <ThemeScope mode={scope}>
      <Region label={`<ThemeScope mode="${scope}">`} />
      <div style={{height: 12}} />
      <ThemeScope mode={inner}>
        <Region label={`nested <ThemeScope mode="${inner}">`} />
      </ThemeScope>
    </ThemeScope>
  </div>
)

export const AlwaysDarkPanel: Story = {
  render: () => <Nested scope="dark" inner="light" />,
}
export const AlwaysLightPanel: Story = {
  render: () => <Nested scope="light" inner="dark" />,
}
