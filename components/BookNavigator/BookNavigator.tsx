import React from 'react'
import {formatGematriya} from 'siddurCalendar/hebcal.utils'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'
import {IconButton} from '../IconButton'
import {Divider} from '../Divider'

export interface BookNavigatorProps {
  title?: string
  chapter: number
  lastChapter: number
  onNext: () => void
  onPrevious: () => void
  titleClick: () => void
}

const iconSize = 30

/** The floating bottom chapter-navigation bar shared by the book reader
 * screens (Parsha, Pirkei Avos, the plain Tanach viewer) — two chevrons
 * (RTL: left = forward/next, right = back/previous) flanking a tappable
 * chapter title. */
export const BookNavigator: React.FunctionComponent<BookNavigatorProps> = ({
  title,
  chapter,
  lastChapter,
  onNext,
  onPrevious,
  titleClick,
}) => (
  <Stack
    position="absolute"
    bottom="none"
    left="none"
    right="none"
    background="backgroundColorDirty"
  >
    <Divider tone="overlay" />
    <Stack
      direction="row"
      justify="spaceBetween"
      align="center"
      paddingHorizontal="md"
      height={64}
    >
      <IconButton
        name="chevron-left"
        size={iconSize}
        tone={chapter < lastChapter ? 'primaryColor' : 'backgroundColorDirty'}
        onPress={onNext}
        accessibilityLabel="הפרק הבא"
      />

      <Touchable onPress={titleClick}>
        <Stack padding="md">
          <Text variant="largeTitle" tone="primaryColor">
            {title ? title : 'פרק ' + formatGematriya(chapter + 1)}
          </Text>
        </Stack>
      </Touchable>

      <IconButton
        name="chevron-right"
        size={iconSize}
        tone={chapter === 0 ? 'backgroundColorDirty' : 'primaryColor'}
        onPress={onPrevious}
        accessibilityLabel="הפרק הקודם"
      />
    </Stack>
  </Stack>
)
