import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {NamedColor} from './named'
import {SemanticColor} from './semantic'
import {resolveColor, ThemeMode} from './themes'

// The story chrome itself is styled with semantic tokens — if a token is
// wrong, this page shows it.

const meta: Meta = {
  title: 'Foundations/Colors',
}
export default meta
type Story = StoryObj

const namedNameByValue = new Map<string, string>(
  Object.entries(NamedColor).map(([name, value]) => [value, name]),
)
const namedName = (value: string) => namedNameByValue.get(value) ?? value

const roleOf = (token: string) =>
  Object.keys(SemanticColor)
    .find((key) => SemanticColor[key as keyof typeof SemanticColor] === token)
    ?.match(/^[A-Z][a-z]+/)?.[0] ?? ''

const tokenName = (token: string) =>
  Object.keys(SemanticColor).find(
    (key) => SemanticColor[key as keyof typeof SemanticColor] === token,
  ) ?? token

const font = 'ui-sans-serif, system-ui, -apple-system, sans-serif'
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace'

// A checkerboard-free way to show alpha colors: paint each swatch over a
// half-light, half-dark backing so translucent values read in both modes.
const backing = `linear-gradient(90deg, ${resolveColor(
  'light',
  SemanticColor.SurfaceBackground,
)} 50%, ${resolveColor('dark', SemanticColor.SurfaceBackground)} 50%)`

const Swatch = ({color, size = 44}: {color: string; size?: number}) => (
  <div
    style={{
      width: size,
      height: size,
      flex: 'none',
      borderRadius: 8,
      background: backing,
      border: `1px solid ${resolveColor('light', SemanticColor.BorderDefault)}`,
      overflow: 'hidden',
    }}
  >
    <div style={{width: '100%', height: '100%', background: color}} />
  </div>
)

const NamedColors = () => {
  const mode: ThemeMode = 'light'
  return (
    <div
      style={{
        padding: 24,
        fontFamily: font,
        background: resolveColor(mode, SemanticColor.SurfaceBackground),
        color: resolveColor(mode, SemanticColor.TextPrimary),
        minHeight: '100vh',
      }}
    >
      <h2 style={{margin: '0 0 4px'}}>Named colors</h2>
      <p
        style={{
          margin: '0 0 20px',
          color: resolveColor(mode, SemanticColor.TextSecondary),
        }}
      >
        Tier 1. Every literal value in the design system. Shown over a light and
        dark backing so alpha is visible. Apps never use these directly.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: 12,
        }}
      >
        {Object.entries(NamedColor).map(([name, value]) => (
          <div
            key={name}
            style={{display: 'flex', gap: 10, alignItems: 'center'}}
          >
            <Swatch color={value} />
            <div>
              <div style={{fontWeight: 600, fontSize: 14}}>{name}</div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  color: resolveColor(mode, SemanticColor.TextSecondary),
                }}
              >
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ThemePanel = ({mode}: {mode: ThemeMode}) => {
  const tokens = Object.values(SemanticColor)
  const roles = Array.from(new Set(tokens.map(roleOf)))
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        padding: 24,
        fontFamily: font,
        background: resolveColor(mode, SemanticColor.SurfaceBackground),
        color: resolveColor(mode, SemanticColor.TextPrimary),
      }}
    >
      <h2 style={{margin: '0 0 16px', textTransform: 'capitalize'}}>{mode}</h2>
      {roles.map((role) => (
        <section key={role} style={{marginBottom: 24}}>
          <h3
            style={{
              margin: '0 0 8px',
              fontSize: 12,
              letterSpacing: 0.7,
              textTransform: 'uppercase',
              color: resolveColor(mode, SemanticColor.TextSecondary),
            }}
          >
            {role}
          </h3>
          {tokens
            .filter((token) => roleOf(token) === role)
            .map((token) => {
              const value = resolveColor(mode, token)
              return (
                <div
                  key={token}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: `1px solid ${resolveColor(
                      mode,
                      SemanticColor.BorderDefault,
                    )}`,
                  }}
                >
                  <Swatch color={value} size={32} />
                  <div style={{minWidth: 0}}>
                    <div style={{fontWeight: 600, fontSize: 14}}>
                      {tokenName(token)}
                    </div>
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: 11,
                        color: resolveColor(mode, SemanticColor.TextSecondary),
                      }}
                    >
                      {namedName(value)} · {value}
                    </div>
                  </div>
                </div>
              )
            })}
        </section>
      ))}
    </div>
  )
}

const SemanticColors = () => (
  <div style={{display: 'flex', flexWrap: 'wrap'}}>
    <ThemePanel mode="light" />
    <ThemePanel mode="dark" />
  </div>
)

export const Named: Story = {render: () => <NamedColors />}
export const Semantic: Story = {render: () => <SemanticColors />}
