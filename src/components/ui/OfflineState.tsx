import { StatusOfflineIcon } from '@heroicons/react/outline'
import React from 'react'

export const OfflineState: React.FC = () => {
  return (
    <div className="grid justify-items-center text-center space-y-2 text-gray-500 ">
      <StatusOfflineIcon className="h-8 w-8" />
      <div className="text-sm">
        Looks like you lost your connection. Please check it and try again.
      </div>
    </div>
  )
}
