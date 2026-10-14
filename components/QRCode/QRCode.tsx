import React, {forwardRef, useImperativeHandle, useMemo, useRef} from 'react'
import {ImageSourcePropType, Platform} from 'react-native'
import Svg, {Image as SvgImage, Path, Rect} from 'react-native-svg'
import {SemanticColor} from '../../colors'
import {ThemeScope, useQRLogo, useResolvedColor} from '../../theme'
import {createQRMatrix, matrixToPath} from './qrMatrix'
import {qrSvgString} from './qrSvg'
import {logoToDataUri, svgToBase64Png} from './webExport'

// A scanner needs dark modules on a light field in every mode, so the code
// always renders on white inside a light scope — a dark-mode app still shows
// a scannable code (`SurfaceCard` is pure white in the light scope).
/** Share of the code's width the logo plate covers. Level H recovers ~30% of
 * the modules; staying near 22% leaves headroom for glare and bad prints. */
const LOGO_FRACTION = 0.22

export interface QRCodeHandle {
  /** The code as a base64 PNG (no `data:` prefix) — for saving to a file
   * and the share sheet. `pixels` is the side length of the image (web
   * only; native exports at the rendered `size`). */
  toBase64: (pixels?: number) => Promise<string>
}

export interface QRCodeProps {
  /** What the code encodes (usually a URL). */
  value: string
  /** Rendered side length in px, quiet zone included. */
  size?: number
  /** Modules of blank margin each side. The QR spec asks for 4. */
  quietZone?: number
  /** Overrides the app's `qrLogo` from `DesignSystemProvider`; `false` draws
   * the code without one. */
  logo?: ImageSourcePropType | false
}

const QRCodeInner = forwardRef<QRCodeHandle, QRCodeProps>(
  ({value, size = 200, quietZone = 4, logo}, ref) => {
    const appLogo = useQRLogo()
    const source = logo === false ? undefined : (logo ?? appLogo)
    const color = useResolvedColor(SemanticColor.AccentPrimaryDeep)
    const background = useResolvedColor(SemanticColor.SurfaceCard)
    const svgRef = useRef<Svg>(null)

    const {path, viewBox, plate} = useMemo(() => {
      const matrix = createQRMatrix(value)
      const total = matrix.size + quietZone * 2
      // An odd plate width keeps it centered on the module grid.
      let plateModules = Math.floor(matrix.size * LOGO_FRACTION)
      if (plateModules % 2 === 0) {
        plateModules += 1
      }
      const from = Math.floor((matrix.size - plateModules) / 2)
      return {
        path: matrixToPath(
          matrix,
          source ? {from, to: from + plateModules} : undefined,
        ),
        viewBox: total,
        plate: {from: from + quietZone, modules: plateModules},
      }
    }, [value, quietZone, source])

    useImperativeHandle(
      ref,
      () => ({
        toBase64: async (pixels = 1024) => {
          if (Platform.OS === 'web') {
            const logoHref = source ? await logoToDataUri(source) : undefined
            return svgToBase64Png(
              qrSvgString(
                {path, viewBox, quietZone, color, background, plate, logoHref},
                pixels,
              ),
              pixels,
            )
          }
          return new Promise<string>((resolve, reject) => {
            const svg = svgRef.current
            if (!svg || typeof svg.toDataURL !== 'function') {
              reject(new Error('QRCode: PNG export is not available here.'))
              return
            }
            svg.toDataURL(resolve)
          })
        },
      }),
      [path, viewBox, quietZone, color, background, plate, source],
    )

    const pad = 0.4
    return (
      <Svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${viewBox} ${viewBox}`}
      >
        <Rect width={viewBox} height={viewBox} fill={background} />
        <Path
          fill={color}
          transform={`translate(${quietZone} ${quietZone})`}
          d={path}
        />
        {!!source && (
          <>
            <Rect
              x={plate.from - pad}
              y={plate.from - pad}
              width={plate.modules + pad * 2}
              height={plate.modules + pad * 2}
              rx={1.2}
              fill={background}
            />
            <SvgImage
              x={plate.from + 0.5}
              y={plate.from + 0.5}
              width={plate.modules - 1}
              height={plate.modules - 1}
              preserveAspectRatio="xMidYMid meet"
              href={source}
            />
          </>
        )}
      </Svg>
    )
  },
)

/** A scannable QR code tinted with the app's deep brand color and, when the
 * app gives `qrLogo` to `DesignSystemProvider`, its logo in the middle. */
export const QRCode = forwardRef<QRCodeHandle, QRCodeProps>((props, ref) => (
  <ThemeScope mode="light">
    <QRCodeInner ref={ref} {...props} />
  </ThemeScope>
))
QRCode.displayName = 'QRCode'
