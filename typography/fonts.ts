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

export const AppFonts = {
  'Taamey Frank CLM': require('../../../assets/fonts/frank.ttf'),
  'Mekorot-Vilna': require('../../../assets/fonts/vilna.ttf'),
  'Ezra SIL SR': require('../../../assets/fonts/ezra.ttf'),
  'Hadasim CLM': require('../../../assets/fonts/hadassim.ttf'),
  'David CLM': require('../../../assets/fonts/david.ttf'),
  'TaameyFrankCLM-Bold': require('../../../assets/fonts/TaameyFrankCLM-Bold.ttf'),
  SiddurIcons: require('../../../assets/fonts/SiddurIcons.ttf'),
  Rubik: require('../../../assets/fonts/rubik.ttf'),
  // The editorial type ramp's Latin/Hebrew serif (`text/page-header`,
  // `text/item`) — unrelated to `Taamey Frank CLM` above despite the
  // similar name (that one's a Hebrew liturgical/cantillation face).
  FrankRuhlLibre_400Regular,
  FrankRuhlLibre_700Bold,
  // Cardo (selectable davening typeface, `Cardo` in TypeFace) — the one
  // Google Fonts Hebrew face with real OpenType niqqud + te'amim support.
  Cardo_400Regular,
  Cardo_700Bold,
  // Noto Serif/Rashi Hebrew — loaded for future use, not yet wired to a
  // selectable typeface or design-system token.
  NotoSerifHebrew_400Regular,
  NotoSerifHebrew_700Bold,
  NotoRashiHebrew_400Regular,
  NotoRashiHebrew_700Bold,
}
