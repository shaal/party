import { useEffect, useState } from 'react'

const getOnlineStatus = (): boolean => {
  return typeof navigator !== 'undefined' &&
    typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true
}

export const useIsOffline = () => {
  const [offlineStatus, setOfflineStatus] = useState<boolean>(
    !getOnlineStatus()
  )
  const goOnline = () => setOfflineStatus(false)
  const goOffline = () => setOfflineStatus(true)

  useEffect(() => {
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  })

  return offlineStatus
}
