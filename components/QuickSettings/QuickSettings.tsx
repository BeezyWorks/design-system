import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {
  FontSize,
  getTypefaceDisplayName,
  isNightTefila,
  ThemeStyle,
  TypeFace,
} from '@models'
import {useDispatch, useSelector} from 'state/store'
import {UserPrefActions} from '@actions'
import {
  getAppNightTheme,
  getAppTheme,
  getCurrentTefila,
  getFontSize,
  getTypeface,
} from '@selectors'
import {createTranslationSheet} from 'translation/translation.model'
import {useTranslation} from 'translation/translation.hook'
import {
  useColors,
  Colors,
  ColorPrimary,
  BackgroundDark,
  BackgroundLight,
  withOpacity,
} from '../../colors'

const labelSheet = createTranslationSheet({
  hebrew: {
    heading: 'הגדרות מהירות',
    textSize: 'גודל טקסט',
    typeface: 'גופן',
    color: 'צבע',
  },
  english: {
    heading: 'Quick Settings',
    textSize: 'Text Size',
    typeface: 'Typeface',
    color: 'Color',
  },
})

// ThemeStyle.System has no single background of its own — approximate it
// with a neutral mid-tone so its swatch reads as distinct from the two
// concrete themes rather than arbitrarily picking one of their colors.
const SYSTEM_SWATCH_COLOR = '#C7C2B8'

const themeSwatchColor: Record<ThemeStyle, string> = {
  [ThemeStyle.Light]: BackgroundLight,
  [ThemeStyle.Dark]: BackgroundDark,
  [ThemeStyle.System]: SYSTEM_SWATCH_COLOR,
}

// Compact popover-only counterpart to the full DisplaySettings screen (used
// as-is in the narrow bottom sheet) — same underlying prefs/actions, laid
// out as the three quick controls from the wide-reader spec: text size
// stepper, typeface chips, color swatches. Leading is intentionally
// omitted here; it stays reachable via the full settings screen.
//
// Raw RN `View`/`Text`+`StyleSheet` throughout (rather than `@design`'s
// `Stack`/`Text`) — this popover's chip/stepper/swatch rows need exact
// legacy metrics with no equivalent token (borderWidth 1.5, custom
// pressed-state backgrounds, a theme-invariant accent color), the same
// reasoning `Stack`/`Card` use raw primitives internally.
export const QuickSettings = () => {
  const colors = useColors()
  const styles = styleCreator(colors)
  const dispatch = useDispatch()
  const {translateSheet, translate} = useTranslation()
  const labels = translateSheet(labelSheet, true)

  const currentTefila = useSelector(getCurrentTefila)
  const isNight = isNightTefila(currentTefila)
  const themeAction = isNight
    ? UserPrefActions.setNightTheme
    : UserPrefActions.setTheme
  const themeValue = useSelector(isNight ? getAppNightTheme : getAppTheme)

  const fontSize = useSelector(getFontSize)
  const typeface = useSelector(getTypeface)

  const fontSizeIndex = FontSize.indexOf(fontSize)
  const stepFontSize = (direction: 1 | -1) => {
    const nextIndex = Math.min(
      Math.max(fontSizeIndex + direction, 0),
      FontSize.length - 1,
    )
    dispatch(UserPrefActions.setFontSize(FontSize[nextIndex]))
  }

  return (
    <View>
      <Text style={styles.heading}>{labels.heading}</Text>
      <View style={[styles.row, styles.bordered]}>
        <Text style={styles.rowLabel}>{labels.textSize}</Text>
        <View style={styles.stepper}>
          <Pressable
            onPress={() => stepFontSize(-1)}
            disabled={fontSizeIndex <= 0}
            style={({pressed}) => [
              styles.stepperButton,
              styles.stepperButtonLeft,
              fontSizeIndex <= 0 && styles.stepperButtonDisabled,
              pressed && styles.pressedTint,
            ]}
          >
            <Text style={styles.stepperLabel}>A−</Text>
          </Pressable>
          <Pressable
            onPress={() => stepFontSize(1)}
            disabled={fontSizeIndex >= FontSize.length - 1}
            style={({pressed}) => [
              styles.stepperButton,
              fontSizeIndex >= FontSize.length - 1 &&
                styles.stepperButtonDisabled,
              pressed && styles.pressedTint,
            ]}
          >
            <Text style={styles.stepperLabel}>A+</Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.column, styles.bordered]}>
        <Text style={styles.rowLabel}>{labels.typeface}</Text>
        <View style={styles.chipRow}>
          {TypeFace.map((face) => {
            const selected = face === typeface
            return (
              <Pressable
                key={face}
                onPress={() => dispatch(UserPrefActions.setTypeface(face))}
                style={({pressed}) => [
                  styles.chip,
                  selected && styles.chipSelected,
                  pressed && !selected && styles.pressedTint,
                ]}
              >
                <Text
                  style={[
                    styles.chipLabel,
                    selected && styles.chipLabelSelected,
                  ]}
                >
                  {translate(getTypefaceDisplayName(face), true)}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{labels.color}</Text>
        <View style={styles.swatchRow}>
          {Object.keys(ThemeStyle).map((key) => {
            const value = ThemeStyle[key as keyof typeof ThemeStyle]
            const selected = value === themeValue
            return (
              <Pressable
                key={value}
                onPress={() => dispatch(themeAction(value))}
                style={[
                  styles.swatch,
                  {backgroundColor: themeSwatchColor[value]},
                  selected && styles.swatchSelected,
                ]}
              />
            )
          })}
        </View>
      </View>
    </View>
  )
}

const styleCreator = (colors: Colors) =>
  StyleSheet.create({
    heading: {
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      color: withOpacity(colors.primaryTextColor, 0.55),
      textAlign: 'right',
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 14,
    },
    column: {
      paddingVertical: 14,
      gap: 10,
    },
    bordered: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.scrimColor,
    },
    rowLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.primaryTextColor,
      textAlign: 'right',
    },
    stepper: {
      flexDirection: 'row',
    },
    stepperButton: {
      width: 36,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: colors.scrimColor,
      borderRadius: 7,
    },
    stepperButtonLeft: {
      marginEnd: 6,
    },
    stepperButtonDisabled: {
      opacity: 0.4,
    },
    stepperLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primaryTextColor,
    },
    pressedTint: {
      backgroundColor: colors.backgroundColorDirty,
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      gap: 6,
    },
    chip: {
      borderWidth: 1.5,
      borderColor: colors.scrimColor,
      borderRadius: 7,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    chipSelected: {
      borderColor: ColorPrimary,
      backgroundColor: withOpacity(ColorPrimary, 0.1),
    },
    chipLabel: {
      fontSize: 13,
      color: colors.primaryTextColor,
    },
    chipLabelSelected: {
      color: ColorPrimary,
    },
    swatchRow: {
      flexDirection: 'row',
      gap: 10,
    },
    swatch: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: colors.scrimColor,
    },
    swatchSelected: {
      borderWidth: 2.5,
      borderColor: ColorPrimary,
    },
  })
