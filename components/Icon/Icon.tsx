import React from 'react'
import {TouchableOpacity} from 'react-native'
import {
  Calendar,
  Book,
  Library,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Trash2,
  Navigation,
  Plus,
  Clock,
  X,
  Pencil,
  Download,
  LucideIcon,
} from 'lucide-react-native'
import {SemanticColor} from '../../colors'
import {useResolvedColor} from '../../theme'

export type IconName =
  | 'calendar-today'
  | 'book'
  | 'bookshelf'
  | 'cog'
  | 'settings'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-back'
  | 'chevron-down'
  | 'arrow-back'
  | 'delete'
  | 'navigation'
  | 'add'
  | 'clock-outline'
  | 'close'
  | 'edit'
  | 'download'

const lucideIconForName: Record<IconName, LucideIcon> = {
  'calendar-today': Calendar,
  book: Book,
  bookshelf: Library,
  cog: Settings,
  settings: Settings,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-back': ChevronLeft,
  'chevron-down': ChevronDown,
  'arrow-back': ArrowLeft,
  delete: Trash2,
  navigation: Navigation,
  add: Plus,
  'clock-outline': Clock,
  close: X,
  edit: Pencil,
  download: Download,
}

export interface IconProps {
  name: IconName
  size?: number
  /** Semantic color token — never a raw hex value. Defaults to
   * `SemanticColor.TextPrimary`. */
  color?: SemanticColor
  onPress?: () => void
  accessibilityLabel?: string
}

export const Icon: React.FunctionComponent<IconProps> = ({
  name,
  size = 24,
  color = SemanticColor.TextPrimary,
  onPress,
  accessibilityLabel,
}) => {
  const resolvedColor = useResolvedColor(color)
  const IconComponent = lucideIconForName[name] ?? Settings
  const icon = <IconComponent size={size} color={resolvedColor} />

  if (!onPress) return icon
  return (
    <TouchableOpacity onPress={onPress} accessibilityLabel={accessibilityLabel}>
      {icon}
    </TouchableOpacity>
  )
}
