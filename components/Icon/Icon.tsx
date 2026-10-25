import React from 'react'
import {TouchableOpacity} from 'react-native'
import {
  ALargeSmall,
  Calendar,
  Book,
  BookOpen,
  ScrollText,
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
  Printer,
  Home,
  Compass,
  Bookmark,
  BarChart2,
  SlidersHorizontal,
  ChevronsLeft,
  ChevronsRight,
  Minus,
  AlertCircle,
  FileText,
  Mail,
  ExternalLink,
  Share,
  Check,
  Search,
  EllipsisVertical,
  Star,
  ScanQrCode,
  LucideIcon,
} from 'lucide-react-native'
import {Shul, Tefillin} from './customIcons'
import {SemanticColor} from '../../colors'
import {useResolvedColor} from '../../theme'

export type IconName =
  | 'calendar-today'
  | 'book'
  | 'book-open'
  | 'scroll-text'
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
  | 'print'
  | 'home'
  | 'compass'
  | 'bookmark'
  | 'bookmark-outline'
  | 'stats-chart'
  | 'sliders'
  | 'chevrons-left'
  | 'chevrons-right'
  | 'remove'
  | 'alert-circle'
  | 'document'
  | 'mail'
  | 'external-link'
  | 'share'
  | 'check'
  | 'search'
  | 'more-vertical'
  | 'text-size'
  | 'tefillin'
  | 'star'
  | 'star-outline'
  | 'scan-qr'
  | 'shul'

const lucideIconForName: Record<IconName, LucideIcon> = {
  'calendar-today': Calendar,
  book: Book,
  'book-open': BookOpen,
  'scroll-text': ScrollText,
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
  print: Printer,
  home: Home,
  compass: Compass,
  bookmark: Bookmark,
  'bookmark-outline': Bookmark,
  'stats-chart': BarChart2,
  sliders: SlidersHorizontal,
  'chevrons-left': ChevronsLeft,
  'chevrons-right': ChevronsRight,
  remove: Minus,
  'alert-circle': AlertCircle,
  document: FileText,
  mail: Mail,
  'external-link': ExternalLink,
  share: Share,
  check: Check,
  search: Search,
  'more-vertical': EllipsisVertical,
  'text-size': ALargeSmall,
  tefillin: Tefillin,
  star: Star,
  'star-outline': Star,
  'scan-qr': ScanQrCode,
  shul: Shul,
}

// Lucide draws line glyphs only; an "active" icon (a saved bookmark) is the
// same glyph filled with its own color rather than a second glyph.
const filledIcons: Partial<Record<IconName, true>> = {
  bookmark: true,
  star: true,
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
  const icon = (
    <IconComponent
      size={size}
      color={resolvedColor}
      fill={filledIcons[name] ? resolvedColor : 'none'}
    />
  )

  if (!onPress) return icon
  return (
    <TouchableOpacity onPress={onPress} accessibilityLabel={accessibilityLabel}>
      {icon}
    </TouchableOpacity>
  )
}
