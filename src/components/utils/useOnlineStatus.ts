import { useEffect, useState } from 'react'

const getOnlineStatus = () => {
  return typeof navigator !== 'undefined' &&
    typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true
}

export const useIsOffline = () => {
  const [offlineStatus, setOfflineStatus] = useState(!getOnlineStatus())
  const goOnline = () => setOfflineStatus(false)
  const goOffline = () => setOfflineStatus(true)

  useEffect(() => {
    console.log('called')

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  })

  return offlineStatus
}
