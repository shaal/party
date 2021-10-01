import { BeakerIcon } from '@heroicons/react/outline'
import React from 'react'

const BetaBadge: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 text-xs rounded-md px-1.5 py-0.5 text-white bg-gradient-to-r from-brand-500 to-pink-500">
      <BeakerIcon className="h-3 w-3" />
      <div>beta</div>
    </div>
  )
}

export default BetaBadge
