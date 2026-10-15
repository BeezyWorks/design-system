import React from 'react'
import {ActivityIndicator, Pressable} from 'react-native'
import Svg, {Path} from 'react-native-svg'
import {spacing} from '../../spacing'
import {radius} from '../../radius'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {useRtl} from '../../layout'
import {Text} from '../Text'

export type AuthProvider = 'google' | 'apple'

const providerColors: Record<
  AuthProvider,
  {background: SemanticColor; label: SemanticColor; border?: SemanticColor}
> = {
  google: {
    background: SemanticColor.SurfaceProviderGoogle,
    label: SemanticColor.TextProviderGoogle,
    border: SemanticColor.BorderProviderGoogle,
  },
  apple: {
    background: SemanticColor.SurfaceProviderApple,
    label: SemanticColor.TextProviderApple,
  },
}

const defaultLabel: Record<AuthProvider, string> = {
  google: 'Continue with Google',
  apple: 'Continue with Apple',
}

const MARK_SIZE = 18

const GoogleMark = () => {
  const resolve = useColorResolver()
  return (
    <Svg width={MARK_SIZE} height={MARK_SIZE} viewBox="0 0 48 48">
      <Path
        fill={resolve(SemanticColor.MarkGoogleRed)}
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <Path
        fill={resolve(SemanticColor.MarkGoogleBlue)}
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <Path
        fill={resolve(SemanticColor.MarkGoogleYellow)}
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <Path
        fill={resolve(SemanticColor.MarkGoogleGreen)}
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </Svg>
  )
}

const AppleMark = () => {
  const resolve = useColorResolver()
  return (
    <Svg width={MARK_SIZE} height={MARK_SIZE} viewBox="0 0 814 1000">
      <Path
        fill={resolve(SemanticColor.TextProviderApple)}
        d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
      />
    </Svg>
  )
}

export interface ProviderButtonProps {
  provider: AuthProvider
  /** Defaults to "Continue with Google/Apple"; pass a translation. */
  label?: string
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
  testID?: string
}

/** A full-width "Continue with …" button for a third-party sign-in
 * provider. Colors follow each provider's own button guidelines (Google:
 * white or near-black with a gray stroke and the four-color "G"; Apple:
 * black on light, white on dark), not the app's brand — they're the
 * `*Provider*` semantic tokens. As tall as a `lg` Button (≥44pt, Apple's minimum). */
export const ProviderButton: React.FunctionComponent<ProviderButtonProps> = ({
  provider,
  label,
  loading,
  disabled,
  onPress,
  testID,
}) => {
  const resolve = useColorResolver()
  const rtl = useRtl()
  const colors = providerColors[provider]
  const isDisabled = !!(disabled || loading)
  const title = label ?? defaultLabel[provider]
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{disabled: isDisabled, busy: !!loading}}
      disabled={isDisabled}
      onPress={onPress}
      testID={testID}
      style={({pressed}) => ({
        alignSelf: 'stretch',
        minHeight: 44,
        // A `lg` Button's padding, so the two stack at the same height.
        paddingVertical: spacing.md,
        flexDirection: rtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm + 2,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        backgroundColor: resolve(colors.background),
        borderWidth: colors.border ? 1 : 0,
        borderColor: colors.border ? resolve(colors.border) : undefined,
        opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator color={resolve(colors.label)} />
      ) : (
        <>
          {provider === 'google' ? <GoogleMark /> : <AppleMark />}
          <Text variant="headline" color={colors.label}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  )
}
