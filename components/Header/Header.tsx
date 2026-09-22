import React, {useState} from 'react'
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native'
import {ModalType} from '@models'
import {useNavigation} from '@hooks'
import {useModal} from '@modal'
import {isNullOrEmpty, Log} from '@utils'
import {Zman} from 'siddurCalendar/zmanim/zman.model'
import {useIsWideReader} from 'widgets/header/readerBreakpoint'
import {useColors, Colors, ColorPrimary, withOpacity} from '../../colors'
import {layout} from '../../layout'
import {Icon, IconName} from '../Icon'
import {AnchoredPopover} from '../AnchoredPopover'
import {
  PopoverHeading,
  ReaderSection,
  SectionsList,
  ZmanimList,
} from '../ReaderLists'

const TAG = 'Header'

export type {ReaderSection}

export interface HeaderProps {
  subTitle?: string
  title?: string
  goBack?: boolean | (() => void)
  onTitlePress?: () => void
  openSettings?: () => void
  translateY?: number
  focusZmanim?: Zman[]
  // Wide-layout-only extras: raw data so the title/zmanim/settings buttons
  // can open a popover anchored under the header instead of a bottom
  // sheet. Below the wide breakpoint these are unused — the buttons keep
  // calling onTitlePress/openSettings/showing the zman sheet as before.
  sections?: ReaderSection[]
  currentSectionKey?: string
  onSelectSection?: (key: string) => void
  settingsContent?: React.ReactNode
}

type Popover = 'title' | 'zmanim' | 'settings' | null

// Wide-only icon button: padding/radius/pressed-tint per the reader header
// spec. Narrow/native keeps using bare Pressable+Icon below, untouched, so
// phone visuals never pass through this at all.
const WideIconButton = ({
  name,
  onPress,
  tone,
  size = 21,
  variant = 'trailing',
  styles,
}: {
  name: IconName
  onPress: () => void
  tone: keyof Colors
  size?: number
  variant?: 'back' | 'trailing'
  styles: ReturnType<typeof styleCreator>
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      variant === 'back' ? styles.wideBackButton : styles.wideIconButton,
      pressed && styles.pressedTint,
    ]}
  >
    <Icon name={name} size={size} tone={tone} />
  </Pressable>
)

// This lives under `src/design/components/` rather than a screen/widget
// file, so — like `Stack`/`Card`/`Screen` — it composes raw RN
// `View`/`Text`+`StyleSheet` internally (a fixed-height accent bar with an
// animated `translateY` collapse and legacy pixel typography have no
// equivalent `Stack`/`Text` token) alongside `@design` primitives
// (`Icon`, `AnchoredPopover`, `ReaderLists`) for the pieces that do.
export const Header = ({
  goBack: _goBack,
  onTitlePress: openSectionPicker,
  subTitle: sectionName,
  title: tefilaName,
  focusZmanim,
  openSettings,
  translateY = 0,
  sections,
  currentSectionKey,
  onSelectSection,
  settingsContent,
}: HeaderProps) => {
  const colors = useColors()
  const styles = styleCreator(colors)
  const {showModal} = useModal()
  const {goBack: doGoBack} = useNavigation()
  const isWide = useIsWideReader()
  const [popover, setPopover] = useState<Popover>(null)
  const togglePopover = (which: Popover) =>
    setPopover((current) => (current === which ? null : which))

  const onTitlePress = () => {
    if (!openSectionPicker) return
    if (isWide && sections) {
      togglePopover('title')
      return
    }
    openSectionPicker()
  }

  const showFocusZmanim = () => {
    if (isNullOrEmpty(focusZmanim)) {
      Log.w(TAG, 'no focus zmanim')
      return
    }
    if (isWide) {
      togglePopover('zmanim')
      return
    }
    showModal({
      type: ModalType.ZmanSheet,
      zmanim: focusZmanim!,
    })
  }

  const onSettingsPress = () => {
    if (isWide && settingsContent) {
      togglePopover('settings')
      return
    }
    openSettings?.()
  }

  const goBack = () => {
    if (_goBack && typeof _goBack === 'function') {
      _goBack()
      return
    }
    if (_goBack && typeof _goBack === 'boolean') {
      doGoBack()
      return
    }
  }

  const backIconName: IconName =
    Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'

  return (
    <View
      style={[
        styles.base,
        isWide && styles.baseWide,
        {transform: [{translateY}]},
      ]}
    >
      {isWide ? (
        <View style={styles.titleBox} pointerEvents="box-none">
          <Pressable
            onPress={onTitlePress}
            disabled={!openSectionPicker}
            style={({pressed}) => [
              styles.titleButtonWide,
              pressed && styles.pressedTint,
            ]}
          >
            <Text style={[styles.tefilaTitle, styles.tefilaTitleWide]}>
              {tefilaName ?? ''}
            </Text>
            {!!openSectionPicker && sectionName && (
              <Text style={[styles.sectionTitle, styles.sectionTitleWide]}>
                {sectionName ?? ''}
              </Text>
            )}
            {!!openSectionPicker && (
              <View style={styles.titleChevron}>
                <Icon name="chevron-down" size={14} tone="primaryTextColor" />
              </View>
            )}
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={onTitlePress} style={styles.titleBox}>
          <View>
            <Text style={styles.tefilaTitle}>{tefilaName ?? ''}</Text>
            {!!openSectionPicker && sectionName && (
              <Text style={styles.sectionTitle}>{sectionName ?? ''}</Text>
            )}
          </View>
        </Pressable>
      )}
      {_goBack &&
        (isWide ? (
          <WideIconButton
            name={backIconName}
            onPress={goBack}
            tone="primaryTextColor"
            size={20}
            variant="back"
            styles={styles}
          />
        ) : (
          <Pressable style={styles.icon} onPress={goBack}>
            <Icon name={backIconName} tone="headerTextColor" />
          </Pressable>
        ))}
      <View style={[styles.buttonBox, isWide && styles.buttonBoxWide]}>
        {!isNullOrEmpty(focusZmanim) &&
          (isWide ? (
            <WideIconButton
              name="clock-outline"
              onPress={showFocusZmanim}
              tone="primaryTextColor"
              styles={styles}
            />
          ) : (
            <Pressable style={styles.icon} onPress={showFocusZmanim}>
              <Icon name="clock-outline" tone="headerTextColor" />
            </Pressable>
          ))}
        {(!!openSettings || !!settingsContent) &&
          (isWide ? (
            <WideIconButton
              name="settings"
              onPress={onSettingsPress}
              tone="primaryTextColor"
              styles={styles}
            />
          ) : (
            <Pressable style={styles.icon} onPress={onSettingsPress}>
              <Icon name="settings" tone="headerTextColor" />
            </Pressable>
          ))}
      </View>
      {isWide && (
        <>
          <AnchoredPopover
            visible={popover === 'title'}
            onDismiss={() => setPopover(null)}
            align="center"
            maxWidth={360}
            contentPadding={10}
          >
            <SectionsList
              sections={sections ?? []}
              currentSectionKey={currentSectionKey}
              onSelectSection={(key) => {
                onSelectSection?.(key)
                setPopover(null)
              }}
            />
          </AnchoredPopover>
          <AnchoredPopover
            visible={popover === 'zmanim'}
            onDismiss={() => setPopover(null)}
            align="end"
            maxWidth={320}
            widthPercent={0.88}
          >
            <PopoverHeading>{`זמני ${tefilaName ?? ''}`}</PopoverHeading>
            <ZmanimList zmanim={focusZmanim ?? []} />
          </AnchoredPopover>
          <AnchoredPopover
            visible={popover === 'settings'}
            onDismiss={() => setPopover(null)}
            align="end"
            maxWidth={340}
          >
            {settingsContent}
          </AnchoredPopover>
        </>
      )}
    </View>
  )
}

const styleCreator = (colors: Colors) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      // iOS and narrow web match the screen's own background (was
      // `backgroundColorDirty` — harmless back when that was a
      // near-neutral gray close to `backgroundColor`, but now that it's
      // `surfaceCard`/white against a warm cream screen, the mismatch
      // actually shows). Android keeps its own filled colored app-bar
      // convention.
      backgroundColor:
        Platform.OS === 'android'
          ? colors.primaryColor
          : colors.backgroundColor,
      height: layout.headerHeight,
      borderBottomWidth: Platform.OS === 'android' ? undefined : 1,
      borderBottomColor: colors.scrimColor,
      elevation: 6,
      // A z-index set only on the popovers nested inside this View doesn't
      // help them paint over the reading pane/rail — those are siblings of
      // *this* View, not of the popovers, and z-index only resolves within
      // the nearest ancestor that itself establishes a stacking context.
      // This is that context: without it, the later sibling (content)
      // wins the default same-z-index tiebreak (document order) and paints
      // over the header's popovers regardless of their own z-index.
      zIndex: 100,
    },
    // Wide layout drops the accent-filled bar (tuned for a mobile status
    // bar) for a header that matches the screen background, per the
    // reader spec — title/icon colors switch from headerTextColor (tuned
    // for that filled bar) to the ink token to match.
    baseWide: {
      backgroundColor: colors.backgroundColor,
      paddingHorizontal: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.scrimColor,
    },
    titleBox: {
      ...StyleSheet.absoluteFill,
      alignSelf: 'stretch',
      flex: 1,
      alignItems: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      justifyContent: 'center',
    },
    titleButtonWide: {
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 10,
      gap: 2,
    },
    pressedTint: {
      backgroundColor: colors.backgroundColorDirty,
    },
    tefilaTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.headerTextColor,
      textAlign: 'center',
    },
    tefilaTitleWide: {
      fontSize: 26,
      color: ColorPrimary,
    },
    sectionTitle: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.headerTextColor,
    },
    sectionTitleWide: {
      fontSize: 13,
      color: withOpacity(colors.primaryTextColor, 0.65),
    },
    titleChevron: {
      marginTop: 2,
    },
    buttonBox: {
      flexDirection: 'row',
    },
    buttonBoxWide: {
      gap: 6,
    },
    icon: {
      padding: 16,
    },
    wideIconButton: {
      padding: 9,
      borderRadius: 9,
    },
    wideBackButton: {
      padding: 8,
      borderRadius: 8,
    },
  })
