import React from 'react'
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native'
import {SemanticColor} from '../../colors'
import {useColorResolver, ColorResolver} from '../../theme'
import {layout} from '../../layout'
import {Icon, IconName} from '../Icon'

export interface HeaderAction {
  icon: IconName
  onPress: () => void
}

export interface HeaderProps {
  title?: string
  subtitle?: string
  /** Makes the title area tappable (e.g. to open a section picker). In the
   * wide layout it also shows a chevron and the subtitle. */
  onTitlePress?: () => void
  /** Shows a back button. */
  onBack?: () => void
  /** Trailing icon buttons, in order. */
  actions?: HeaderAction[]
  /** The roomier layout for wide windows (iPad, desktop): the title becomes
   * a button with a chevron, icons get padded hit areas. */
  wide?: boolean
  /** Vertical offset, for a collapse-on-scroll header. */
  translateY?: number
  /** Rendered inside the header after its content — e.g. popovers anchored
   * under it in the wide layout. */
  children?: React.ReactNode
}

// Wide-only icon button: padding/radius/pressed-tint per the reader header
// spec. Narrow/native keeps using bare Pressable+Icon below, untouched, so
// phone visuals never pass through this at all.
const WideIconButton = ({
  name,
  onPress,
  color,
  size = 21,
  variant = 'trailing',
  styles,
}: {
  name: IconName
  onPress: () => void
  color: SemanticColor
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
    <Icon name={name} size={size} color={color} />
  </Pressable>
)

/** The screen header: a fixed-height bar with a centered title (and
 * optional subtitle), a back button and trailing icon actions. Composes raw
 * RN `View`/`Text`+`StyleSheet` internally (a fixed-height bar with an
 * animated `translateY` collapse and pixel typography have no equivalent
 * `Stack`/`Text` token) alongside `Icon`. Apps put their own behavior
 * (navigation, popovers, sheets) around it. */
export const Header = ({
  title,
  subtitle,
  onTitlePress,
  onBack,
  actions = [],
  wide = false,
  translateY = 0,
  children,
}: HeaderProps) => {
  const resolve = useColorResolver()
  const styles = styleCreator(resolve)

  const backIconName: IconName =
    Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'

  return (
    <View
      style={[
        styles.base,
        wide && styles.baseWide,
        {transform: [{translateY}]},
      ]}
    >
      {wide ? (
        <View style={styles.titleBox} pointerEvents="box-none">
          <Pressable
            onPress={onTitlePress}
            disabled={!onTitlePress}
            style={({pressed}) => [
              styles.titleButtonWide,
              pressed && styles.pressedTint,
            ]}
          >
            <Text style={[styles.tefilaTitle, styles.tefilaTitleWide]}>
              {title ?? ''}
            </Text>
            {!!onTitlePress && subtitle && (
              <Text style={[styles.sectionTitle, styles.sectionTitleWide]}>
                {subtitle ?? ''}
              </Text>
            )}
            {!!onTitlePress && (
              <View style={styles.titleChevron}>
                <Icon
                  name="chevron-down"
                  size={14}
                  color={SemanticColor.TextPrimary}
                />
              </View>
            )}
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={onTitlePress} style={styles.titleBox}>
          <View>
            <Text style={styles.tefilaTitle}>{title ?? ''}</Text>
            {!!onTitlePress && subtitle && (
              <Text style={styles.sectionTitle}>{subtitle ?? ''}</Text>
            )}
          </View>
        </Pressable>
      )}
      {onBack &&
        (wide ? (
          <WideIconButton
            name={backIconName}
            onPress={onBack}
            color={SemanticColor.TextPrimary}
            size={20}
            variant="back"
            styles={styles}
          />
        ) : (
          <Pressable style={styles.icon} onPress={onBack}>
            <Icon name={backIconName} color={SemanticColor.TextAccent} />
          </Pressable>
        ))}
      <View style={[styles.buttonBox, wide && styles.buttonBoxWide]}>
        {actions.map(({icon, onPress}, index) =>
          wide ? (
            <WideIconButton
              key={`${icon}-${index}`}
              name={icon}
              onPress={onPress}
              color={SemanticColor.TextPrimary}
              styles={styles}
            />
          ) : (
            <Pressable
              key={`${icon}-${index}`}
              style={styles.icon}
              onPress={onPress}
            >
              <Icon name={icon} color={SemanticColor.TextAccent} />
            </Pressable>
          ),
        )}
      </View>
      {children}
    </View>
  )
}

const styleCreator = (resolve: ColorResolver) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      // Matches the screen's own background on every platform.
      backgroundColor: resolve(SemanticColor.SurfaceBackground),
      height: layout.headerHeight,
      borderBottomWidth: 1,
      borderBottomColor: resolve(SemanticColor.BorderStrong),
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
    // The wide layout is the same bar with roomier padding and a hairline.
    baseWide: {
      backgroundColor: resolve(SemanticColor.SurfaceBackground),
      paddingHorizontal: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: resolve(SemanticColor.BorderStrong),
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
      backgroundColor: resolve(SemanticColor.SurfaceCard),
    },
    tefilaTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: resolve(SemanticColor.TextAccent),
      textAlign: 'center',
    },
    tefilaTitleWide: {
      fontSize: 26,
      color: resolve(SemanticColor.AccentPrimary),
    },
    sectionTitle: {
      fontSize: 16,
      textAlign: 'center',
      color: resolve(SemanticColor.TextAccent),
    },
    sectionTitleWide: {
      fontSize: 13,
      color: resolve(SemanticColor.TextSecondary),
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
