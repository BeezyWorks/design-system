import React from 'react'
import {Stack, StackProps} from '../Stack'

export interface CardProps extends Omit<
  StackProps,
  'shadow' | 'radius' | 'background' | 'padding'
> {
  padding?: StackProps['padding']
  radius?: StackProps['radius']
  background?: StackProps['background']
  shadow?: StackProps['shadow']
}

/** A raised surface — the design-system replacement for a one-off
 * `{borderRadius, backgroundColor, shadow...}` style block. */
export const Card: React.FunctionComponent<CardProps> = ({
  padding = 'md',
  radius = 'md',
  background = 'surfaceRaised',
  shadow = 'card',
  ...stackProps
}) => (
  <Stack
    padding={padding}
    radius={radius}
    background={background}
    shadow={shadow}
    {...stackProps}
  />
)
