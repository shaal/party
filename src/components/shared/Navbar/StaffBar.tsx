import { DatabaseIcon, ShieldCheckIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

const StaffBar: React.FC = () => {
  return (
    <div className="bg-gray-200 dark:bg-black px-3 py-1 flex justify-between text-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          React.js{' '}
          <span className="text-xs font-bold bg-gray-300 dark:bg-gray-900 py-0.5 px-1.5 rounded-md">
            v{React.version}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://app.planetscale.com/yo/devparty"
          title="Planetscale"
          target="_blank"
          rel="noreferrer"
        >
          <DatabaseIcon className="h-4 w-4" />
        </a>
        <Link href="/stafftools">
          <a title="Staff panel">
            <ShieldCheckIcon className="h-4 w-4" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default StaffBar
