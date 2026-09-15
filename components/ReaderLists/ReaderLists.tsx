import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {useThemeContext} from 'theme/themeRoot'
import {useSelector} from 'state/store'
import {getHebrewDate} from '@selectors'
import {useTranslation} from 'translation/translation.hook'
import {getValuesForZmanim} from 'siddurCalendar/zmanim/zman.calculator'
import {Zman, zmanimNames} from 'siddurCalendar/zmanim/zman.model'
import moment from 'moment'
import {useColors, Colors, ColorPrimary, withOpacity} from '../../colors'

// Shared list content for the reader's wide-layout header popovers — plain
// React Native, no web-only APIs.
//
// These rows use raw RN `Text` rather than `@design`'s `Text` component:
// the design `Text` deliberately exposes no `style` prop (only the token
// ramp), and these rows need precise legacy metrics (letter-spacing,
// uppercase, a theme-invariant accent color) the ramp has no token for —
// the same reason `Stack`/`Card` reach for raw `View`+`StyleSheet`
// internally rather than nesting another `@design` primitive.

export interface ReaderSection {
  key: string
  label: string
}

export const PopoverHeading = ({children}: {children: React.ReactNode}) => {
  const colors = useColors()
  const styles = styleCreator(colors)
  return <Text style={styles.heading}>{children}</Text>
}

export const SectionsList = ({
  sections,
  currentSectionKey,
  onSelectSection,
}: {
  sections: ReaderSection[]
  currentSectionKey?: string
  onSelectSection?: (key: string) => void
}) => {
  const colors = useColors()
  const {themeStyle} = useThemeContext()
  const styles = styleCreator(colors)
  // Light theme tints the selected row with the accent color; on dark
  // backgrounds that same tint reads as muddy, so a neutral white wash is
  // used instead — same relationship the reference design specifies.
  const selectedBg =
    themeStyle === 'dark'
      ? withOpacity('#ffffff', 0.08)
      : withOpacity(ColorPrimary, 0.1)
  return (
    <>
      {sections.map((section) => {
        const active = section.key === currentSectionKey
        return (
          <Pressable
            key={section.key}
            onPress={() => onSelectSection?.(section.key)}
            style={({pressed}) => [
              styles.sectionRow,
              active && {backgroundColor: selectedBg},
              !active && pressed && styles.pressedTint,
            ]}
          >
            <View
              style={[styles.dot, active && {backgroundColor: ColorPrimary}]}
            />
            <Text
              style={[styles.rowText, active && styles.rowTextActive]}
              numberOfLines={1}
            >
              {section.label}
            </Text>
          </Pressable>
        )
      })}
    </>
  )
}

export const ZmanimList = ({zmanim}: {zmanim: Zman[]}) => {
  const colors = useColors()
  const styles = styleCreator(colors)
  const hebcal = useSelector(getHebrewDate)
  const {formatTime, translateSheet} = useTranslation()
  const labels = translateSheet(zmanimNames, false)
  const now = moment()
  const resolvedZmanim = getValuesForZmanim(zmanim, hebcal)
  return (
    <>
      {resolvedZmanim.map((zman, index) => {
        const past = zman.date.isBefore(now)
        return (
          <View
            style={[
              styles.zmanRow,
              index === resolvedZmanim.length - 1 && styles.noBorder,
            ]}
            key={zman.key}
          >
            <Text style={[styles.rowText, past && styles.past]}>
              {labels[zman.key]}
            </Text>
            <Text
              style={[
                styles.zmanTime,
                past ? styles.past : styles.zmanTimeUpcoming,
              ]}
            >
              {formatTime(zman.date)}
            </Text>
          </View>
        )
      })}
    </>
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
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 13,
      paddingHorizontal: 16,
      borderRadius: 9,
    },
    pressedTint: {
      backgroundColor: colors.backgroundColorDirty,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'transparent',
    },
    rowText: {
      flex: 1,
      fontSize: 15,
      color: colors.primaryTextColor,
      textAlign: 'right',
      fontWeight: '400',
    },
    rowTextActive: {
      color: ColorPrimary,
      fontWeight: '700',
    },
    zmanRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.scrimColor,
    },
    noBorder: {
      borderBottomWidth: 0,
    },
    zmanTime: {
      fontSize: 14,
      fontWeight: '600',
    },
    zmanTimeUpcoming: {
      color: ColorPrimary,
    },
    past: {
      color: colors.secondaryTextColor,
    },
  })
