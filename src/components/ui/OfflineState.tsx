import { StatusOfflineIcon } from '@heroicons/react/outline'
import React from 'react'

export const OfflineState: React.FC = () => {
  return (
    <div style={{ color: '#6B7280', textAlign: 'center' }}>
      <StatusOfflineIcon
        style={{ height: '2rem', width: '2rem', margin: '0 auto' }}
      />
      <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
        Looks like you lost your connection. Please check it and try again.
      </div>
    </div>
  )
}
