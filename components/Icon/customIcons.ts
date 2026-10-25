import {createLucideIcon} from 'lucide-react-native'

// Glyphs Lucide doesn't ship, drawn on its 24px grid with its 2px round
// stroke so they sit beside the stock icons unnoticed.

/** A tefillin bayis with its shin, on the titura, the retzua running off. */
export const Tefillin = createLucideIcon('tefillin', [
  ['rect', {x: '6', y: '2', width: '12', height: '12', rx: '1', key: 'bayis'}],
  ['rect', {x: '3', y: '14', width: '18', height: '4', rx: '1', key: 'titura'}],
  ['path', {d: 'M9 5v3a3 3 0 0 0 6 0V5', key: 'shin'}],
  ['path', {d: 'M12 5v6', key: 'shin-middle'}],
  ['path', {d: 'M21 16a3 3 0 0 1 0 6H5', key: 'retzua'}],
])

/** A shul: a gabled house with a Magen David filling its front. */
export const Shul = createLucideIcon('shul', [
  ['path', {d: 'M3 21V10l9-8 9 8v11z', key: 'house'}],
  ['path', {d: 'M12 9l4.76 8.25H7.24z', key: 'star-up'}],
  ['path', {d: 'M12 20l-4.76-8.25h9.52z', key: 'star-down'}],
])
