import React, {useContext} from 'react'

/** What a bottom sheet needs from whatever presents it (an app's modal
 * system): whether it has been asked to close, a way to ask, and a callback
 * for when its close animation has finished and it can be unmounted. */
export interface SheetHost {
  dismissed: boolean
  /** Ask the host to close the sheet (starts the close animation). */
  dismiss: () => void
  /** The close animation finished — the host may unmount the sheet. */
  onClosed: () => void
}

export const SheetHostContext = React.createContext<SheetHost>({
  dismissed: true,
  dismiss: () => {},
  onClosed: () => {},
})

export const useSheetHost = () => useContext(SheetHostContext)
