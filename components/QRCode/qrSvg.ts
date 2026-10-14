export interface QRSvgParts {
  /** Dark modules, in module units (see `matrixToPath`). */
  path: string
  /** Modules per side including the quiet zone. */
  viewBox: number
  quietZone: number
  color: string
  background: string
  /** The logo plate in viewBox units; omit for a plain code. */
  plate?: {from: number; modules: number}
  /** A `data:` URI — export can't rely on the page's asset URLs. */
  logoHref?: string
}

const PLATE_PAD = 0.4

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** A standalone SVG document of the code — the same geometry `QRCode`
 * renders, for rasterizing outside the React tree (web export). */
export const qrSvgString = (
  {path, viewBox, quietZone, color, background, plate, logoHref}: QRSvgParts,
  px: number,
): string => {
  const logo =
    plate && logoHref
      ? `<rect x="${plate.from - PLATE_PAD}" y="${plate.from - PLATE_PAD}" ` +
        `width="${plate.modules + PLATE_PAD * 2}" height="${
          plate.modules + PLATE_PAD * 2
        }" rx="1.2" fill="${background}"/>` +
        `<image x="${plate.from + 0.5}" y="${plate.from + 0.5}" ` +
        `width="${plate.modules - 1}" height="${plate.modules - 1}" ` +
        `preserveAspectRatio="xMidYMid meet" href="${escapeAttr(logoHref)}"/>`
      : ''
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" ` +
    `viewBox="0 0 ${viewBox} ${viewBox}">` +
    `<rect width="${viewBox}" height="${viewBox}" fill="${background}"/>` +
    `<path fill="${color}" transform="translate(${quietZone} ${quietZone})" d="${path}"/>` +
    logo +
    '</svg>'
  )
}
