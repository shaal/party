import { CubeIcon } from '@heroicons/react/outline'
import React from 'react'

import packageJson from '../../../../package.json'

const StaffBar: React.FC = () => {
  return (
    <div className="bg-gray-200 dark:bg-black px-3 py-1 flex justify-between text-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <CubeIcon className="h-4 w-4" />
          <span className="font-bold">v{packageJson?.version}</span>
        </div>
        <div className="flex items-center gap-1">
          Next.js{' '}
          <span className="text-xs font-bold bg-gray-300 dark:bg-gray-900 py-0.5 px-1.5 rounded-md">
            v{packageJson?.dependencies?.next}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>100ms</div>
      </div>
    </div>
  )
}

export default StaffBar
