import React from 'react'
import {StyleSheet, Text as RNText, View} from 'react-native'
import {Stack} from '../Stack'
import {Touchable} from '../Touchable'
import {useColors, ColorPrimaryLight} from '../../colors'
import {ThemeStyle} from '@models'

export interface PanelTab {
  key: string
  label: string
}

export interface PanelTabRowProps {
  tabs: PanelTab[]
  activeKey: string
  onSelect: (key: string) => void
}

// The tab strip always sits on the always-dark content card (`DarkSurface`),
// so its hairline divider is a fixed translucent white rather than a theme
// token.
const DIVIDER_COLOR = 'rgba(255,255,255,0.12)'

/** The desktop-web Luach layout's panel switcher — Dashboard/Zmanim/Agenda/
 * Calendar tabs above the active panel, replacing the phone swiper's
 * `ViewPager` paging on the wider (860-979px) web-only breakpoint. Always
 * renders in the forced dark palette, matching the dark content card it
 * sits on. */
export const PanelTabRow: React.FunctionComponent<PanelTabRowProps> = ({
  tabs,
  activeKey,
  onSelect,
}) => {
  const colors = useColors(ThemeStyle.Dark)
  return (
    <View style={styles.border}>
      <Stack
        direction="rowReverse"
        gap="sm"
        paddingHorizontal="sm"
        paddingTop="sm"
      >
        {tabs.map((tab) => {
          const active = tab.key === activeKey
          return (
            <Touchable key={tab.key} onPress={() => onSelect(tab.key)}>
              <View
                style={[
                  styles.tab,
                  active && {backgroundColor: colors.backgroundColorDirty},
                ]}
              >
                <RNText
                  style={[
                    styles.label,
                    {
                      color: active
                        ? ColorPrimaryLight
                        : colors.secondaryTextColor,
                    },
                  ]}
                >
                  {tab.label}
                </RNText>
              </View>
            </Touchable>
          )
        })}
      </Stack>
    </View>
  )
}

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DIVIDER_COLOR,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  label: {fontSize: 15, fontWeight: '600'},
})
