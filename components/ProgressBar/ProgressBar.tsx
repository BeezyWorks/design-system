import React from 'react'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'

export interface ProgressBarProps {
  /** 0–1; clamped. */
  progress: number
  /** `accent` (default) for the brand, `success` for a finished bar. */
  tone?: 'accent' | 'success'
  size?: 'sm' | 'md'
}

const trackHeight = {sm: 6, md: 10} as const

/** A rounded completion bar on the "off" track color. */
export const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  progress,
  tone = 'accent',
  size = 'sm',
}) => {
  const clamped = Math.max(0, Math.min(1, progress))
  return (
    <Stack
      width="100%"
      height={trackHeight[size]}
      radius="full"
      overflow="hidden"
      background={SemanticColor.SurfaceTrackOff}
      accessibilityRole="progressbar"
      accessibilityLabel={`${Math.round(clamped * 100)}%`}
    >
      <Stack
        height="100%"
        width={`${Math.round(clamped * 100)}%`}
        radius="full"
        background={
          tone === 'success'
            ? SemanticColor.AccentSuccess
            : SemanticColor.AccentPrimary
        }
      />
    </Stack>
  )
}
