import React from 'react'
import {Modal, ScrollView, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {spacing} from '../../spacing'
import {useIsWideLayout} from '../../layout'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Divider} from '../Divider'
import {IconButton} from '../IconButton'

export interface DetailOverlayProps {
  visible: boolean
  onClose: () => void
  title?: string
  /** A right-to-left (Hebrew) title. */
  titleRtl?: boolean
  /** Extra header controls (e.g. a bookmark toggle), before the close
   * button. */
  headerActions?: React.ReactNode
  children?: React.ReactNode
  /** Docked width on wide layouts. */
  panelWidth?: number
}

/** A detail view for one item of a list: a panel docked beside the list on
 * wide layouts, a page sheet over it on phones. Pass it as `Screen`'s
 * `aside` so the docked panel sits outside the reading column; on phones
 * `Modal` overlays wherever it is in the tree. */
export const DetailOverlay: React.FunctionComponent<DetailOverlayProps> = ({
  visible,
  onClose,
  title,
  titleRtl,
  headerActions,
  children,
  panelWidth = 420,
}) => {
  const isWide = useIsWideLayout()
  const insets = useSafeAreaInsets()
  const resolve = useColorResolver()

  const body = (
    <>
      <Stack
        direction="row"
        align="center"
        gap="sm"
        paddingHorizontal="md"
        paddingVertical="sm"
      >
        <Stack grow width={0}>
          {!!title && (
            <Text variant="headline" rtl={titleRtl}>
              {title}
            </Text>
          )}
        </Stack>
        {headerActions}
        <IconButton name="close" accessibilityLabel="Close" onPress={onClose} />
      </Stack>
      <Divider />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {paddingBottom: spacing.lg + insets.bottom},
        ]}
      >
        {children}
      </ScrollView>
    </>
  )

  if (!isWide) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
      >
        <View
          style={[
            styles.sheet,
            {backgroundColor: resolve(SemanticColor.SurfaceBackground)},
          ]}
        >
          {body}
        </View>
      </Modal>
    )
  }

  if (!visible) return null

  return (
    <View
      style={[
        styles.panel,
        {
          width: panelWidth,
          paddingTop: insets.top,
          backgroundColor: resolve(SemanticColor.SurfaceCard),
          borderColor: resolve(SemanticColor.BorderDefault),
        },
      ]}
    >
      {body}
    </View>
  )
}

const styles = StyleSheet.create({
  sheet: {flex: 1},
  panel: {height: '100%', borderStartWidth: StyleSheet.hairlineWidth},
  scroll: {flex: 1},
  content: {padding: spacing.md, gap: spacing.md},
})
