import {
  FrankRuhlLibre_400Regular,
  FrankRuhlLibre_700Bold,
} from '@expo-google-fonts/frank-ruhl-libre'
import {Cardo_400Regular, Cardo_700Bold} from '@expo-google-fonts/cardo'
import {
  NotoSerifHebrew_400Regular,
  NotoSerifHebrew_700Bold,
} from '@expo-google-fonts/noto-serif-hebrew'
import {
  NotoRashiHebrew_400Regular,
  NotoRashiHebrew_700Bold,
} from '@expo-google-fonts/noto-rashi-hebrew'
import {FontFamily} from './fontFamily'

// The font assets, keyed by family name — hand this to expo-font's
// `useFonts()` once at the app root. Every `FontFamily` entry has exactly one
// asset here (asserted in fonts.test.ts). Frank Ruhl Libre (the editorial
// serif) is unrelated to Taamey Frank CLM despite the similar name — that one
// is a Hebrew liturgical/cantillation face.
export const DesignFonts = {
  [FontFamily.TaameyFrank]: require('../assets/fonts/frank.ttf'),
  [FontFamily.TaameyFrankBold]: require('../assets/fonts/TaameyFrankCLM-Bold.ttf'),
  [FontFamily.MekorotVilna]: require('../assets/fonts/vilna.ttf'),
  [FontFamily.EzraSIL]: require('../assets/fonts/ezra.ttf'),
  [FontFamily.Hadasim]: require('../assets/fonts/hadassim.ttf'),
  [FontFamily.David]: require('../assets/fonts/david.ttf'),
  [FontFamily.Rubik]: require('../assets/fonts/rubik.ttf'),
  [FontFamily.SiddurIcons]: require('../assets/fonts/SiddurIcons.ttf'),
  [FontFamily.FrankRuhlLibre]: FrankRuhlLibre_400Regular,
  [FontFamily.FrankRuhlLibreBold]: FrankRuhlLibre_700Bold,
  [FontFamily.Cardo]: Cardo_400Regular,
  [FontFamily.CardoBold]: Cardo_700Bold,
  [FontFamily.NotoSerifHebrew]: NotoSerifHebrew_400Regular,
  [FontFamily.NotoSerifHebrewBold]: NotoSerifHebrew_700Bold,
  [FontFamily.NotoRashiHebrew]: NotoRashiHebrew_400Regular,
  [FontFamily.NotoRashiHebrewBold]: NotoRashiHebrew_700Bold,
}
