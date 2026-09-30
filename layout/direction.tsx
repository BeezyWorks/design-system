import React, {createContext, useContext} from 'react'

const RtlContext = createContext(false)

export interface RtlScopeProps {
  children?: React.ReactNode
  /** Default `true`. */
  rtl?: boolean
}

/** Lays out everything inside right-to-left — titles on the right, trailing
 * controls and chevrons mirrored to the left — regardless of the app's own
 * layout direction or the script of any one label. Components that support
 * it read this via `useRtl` as the default for their `rtl` prop. */
export const RtlScope: React.FunctionComponent<RtlScopeProps> = ({
  children,
  rtl = true,
}) => <RtlContext.Provider value={rtl}>{children}</RtlContext.Provider>

/** An explicit `rtl` prop wins; otherwise the nearest `RtlScope`'s. */
export const useRtl = (rtl?: boolean): boolean => {
  const scoped = useContext(RtlContext)
  return rtl ?? scoped
}
