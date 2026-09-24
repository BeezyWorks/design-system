/* eslint-env jest */

// Pin the clock before any module loads: react-native-calendars captures its
// "today" at import time, so a clock frozen later never reaches it.
jest.useFakeTimers({
  now: new Date(2020, 5, 16, 10, 0, 0),
  doNotFake: [
    'hrtime',
    'nextTick',
    'performance',
    'queueMicrotask',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'requestIdleCallback',
    'cancelIdleCallback',
    'setImmediate',
    'clearImmediate',
    'setInterval',
    'clearInterval',
    'setTimeout',
    'clearTimeout',
  ],
})

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
)
