import {useEffect, useState} from 'react'
import {AccessibilityInfo} from 'react-native'

/** Whether the user asked the OS to reduce motion. Components snap between
 * states instead of animating when it's `true`. */
export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    let live = true
    try {
      AccessibilityInfo.isReduceMotionEnabled?.()
        ?.then((value) => live && setReduced(!!value))
        .catch(() => {})
    } catch {
      // Unsupported platform: animate.
    }
    const sub = AccessibilityInfo.addEventListener?.(
      'reduceMotionChanged',
      setReduced,
    )
    return () => {
      live = false
      sub?.remove?.()
    }
  }, [])
  return reduced
}
