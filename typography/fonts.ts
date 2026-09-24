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
import {
  SourceSerif4_400Regular,
  SourceSerif4_700Bold,
  SourceSerif4_400Regular_Italic,
} from '@expo-google-fonts/source-serif-4'
import {
  CrimsonPro_400Regular,
  CrimsonPro_700Bold,
  CrimsonPro_400Regular_Italic,
} from '@expo-google-fonts/crimson-pro'
import {
  LibreBaskerville_400Regular,
  LibreBaskerville_700Bold,
  LibreBaskerville_400Regular_Italic,
} from '@expo-google-fonts/libre-baskerville'
import {
  Inter_400Regular,
  Inter_700Bold,
  Inter_400Regular_Italic,
} from '@expo-google-fonts/inter'
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
  [FontFamily.SourceSerif4]: SourceSerif4_400Regular,
  [FontFamily.SourceSerif4Bold]: SourceSerif4_700Bold,
  [FontFamily.SourceSerif4Italic]: SourceSerif4_400Regular_Italic,
  [FontFamily.CrimsonPro]: CrimsonPro_400Regular,
  [FontFamily.CrimsonProBold]: CrimsonPro_700Bold,
  [FontFamily.CrimsonProItalic]: CrimsonPro_400Regular_Italic,
  [FontFamily.LibreBaskerville]: LibreBaskerville_400Regular,
  [FontFamily.LibreBaskervilleBold]: LibreBaskerville_700Bold,
  [FontFamily.LibreBaskervilleItalic]: LibreBaskerville_400Regular_Italic,
  [FontFamily.Inter]: Inter_400Regular,
  [FontFamily.InterBold]: Inter_700Bold,
  [FontFamily.InterItalic]: Inter_400Regular_Italic,
}
