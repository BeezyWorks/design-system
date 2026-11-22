import React from 'react'
import {SemanticColor} from '../../colors'
import {Button} from '../Button'
import {IconButton} from '../IconButton'
import {Stack} from '../Stack'

export interface ZoomStepperProps {
  /** The current zoom; `1` is "fit". */
  zoom: number
  min: number
  max: number
  onZoomIn: () => void
  onZoomOut: () => void
  /** Resets to fit. */
  onFit: () => void
  /** Default `Fit`. */
  fitTitle?: string
  /** Default `Zoom out`. */
  zoomOutLabel?: string
  /** Default `Zoom in`. */
  zoomInLabel?: string
  /** Screen-reader label of the fit button. Default `fitTitle`. */
  fitLabel?: string
  /** Screen-reader label of the whole group. Default `Zoom`. */
  groupLabel?: string
}

// Float steps (1.1 × n) land a hair off the limit.
const EPSILON = 0.01

/** − / Fit / + as one pill. Each end disables at its limit; Fit is quiet
 * while the zoom is already 1 and a tinted button while there is something
 * to reset. Ported from limud-baderech's `ZoomControls`. */
export const ZoomStepper: React.FunctionComponent<ZoomStepperProps> = ({
  zoom,
  min,
  max,
  onZoomIn,
  onZoomOut,
  onFit,
  fitTitle = 'Fit',
  zoomOutLabel = 'Zoom out',
  zoomInLabel = 'Zoom in',
  fitLabel,
  groupLabel = 'Zoom',
}) => (
  <Stack
    direction="row"
    align="center"
    gap="xs"
    padding="xs"
    radius="full"
    background={SemanticColor.SurfaceCard}
    borderWidth={1}
    borderColor={SemanticColor.BorderDefault}
    accessibilityLabel={groupLabel}
  >
    <IconButton
      name="remove"
      variant="filled"
      accessibilityLabel={zoomOutLabel}
      disabled={zoom <= min + EPSILON}
      onPress={onZoomOut}
    />
    <Button
      title={fitTitle}
      size="sm"
      variant={zoom === 1 ? 'ghost' : 'secondary'}
      accessibilityLabel={fitLabel ?? fitTitle}
      onPress={onFit}
    />
    <IconButton
      name="add"
      variant="filled"
      accessibilityLabel={zoomInLabel}
      disabled={zoom >= max - EPSILON}
      onPress={onZoomIn}
    />
  </Stack>
)
