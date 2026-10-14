import {Image, ImageSourcePropType} from 'react-native'

// Browser-only helpers for exporting a QR as PNG (react-native-svg's
// `toDataURL` is a native bridge). Never import on native paths without the
// `Platform.OS === 'web'` guard in QRCode.

const blobToDataUri = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })

// A source on web is a URL string, a `{uri}` (or array of them), or — in
// Metro-web — a numeric asset id that only `resolveAssetSource` understands
// (react-native-web's `Image` doesn't always ship it).
const sourceToUri = (source: ImageSourcePropType): string | undefined => {
  const first = Array.isArray(source) ? source[0] : source
  if (typeof first === 'string') {
    return first
  }
  if (typeof first === 'number') {
    const resolve = (Image as unknown as {resolveAssetSource?: Function})
      .resolveAssetSource
    return resolve?.(first)?.uri
  }
  return first?.uri
}

/** The logo as a `data:` URI, so the rasterized SVG carries it with it. */
export const logoToDataUri = async (
  source: ImageSourcePropType,
): Promise<string | undefined> => {
  const uri = sourceToUri(source)
  if (!uri) {
    return undefined
  }
  if (uri.startsWith('data:')) {
    return uri
  }
  const response = await fetch(uri)
  return blobToDataUri(await response.blob())
}

/** Rasterizes an SVG document string to a base64 PNG (no `data:` prefix). */
export const svgToBase64Png = (svg: string, px: number) =>
  new Promise<string>((resolve, reject) => {
    const img = new window.Image(px, px)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = px
      canvas.height = px
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('QRCode: canvas is unavailable.'))
        return
      }
      ctx.drawImage(img, 0, 0, px, px)
      resolve(canvas.toDataURL('image/png').split(',')[1])
    }
    img.onerror = () => reject(new Error('QRCode: could not rasterize.'))
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  })
