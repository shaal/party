import {
  ChipIcon,
  HashtagIcon,
  ServerIcon,
  ShieldCheckIcon,
  TerminalIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Badge: React.FC<Props> = ({ children }) => (
  <span className="text-xs font-bold bg-gray-300 dark:bg-gray-900 py-0.5 px-1.5 rounded-md">
    {children}
  </span>
)

const StaffBar: React.FC = () => {
  return (
    <div className="bg-gray-200 dark:bg-black px-3 py-1 flex justify-between text-sm">
      <div className="flex items-center space-x-2">
        {process.env.VERCEL_URL && (
          <a
            className="flex items-center space-x-1"
            href={`https://${process.env.VERCEL_URL}`}
            title="Vercel Deployment URL"
            target="_blank"
            rel="noreferrer"
          >
            <ServerIcon className="h-4 w-4" />
          </a>
        )}
        {process.env.VERCEL_REGION && <div>{process.env.VERCEL_REGION}</div>}
        {process.env.GIT_COMMIT_REF && (
          <div className="flex items-center space-x-1" title="Git commit ref">
            <TerminalIcon className="h-4 w-4" />
            <Badge>{process.env.GIT_COMMIT_REF}</Badge>
          </div>
        )}
        {process.env.GIT_COMMIT_SHA && (
          <div className="flex items-center space-x-1" title="Git commit SHA">
            <HashtagIcon className="h-4 w-4" />
            <Badge>{process.env.GIT_COMMIT_SHA?.slice(0, 7)}</Badge>
          </div>
        )}
        <div className="flex items-center space-x-1" title="React.js Version">
          <ChipIcon className="h-4 w-4" />
          <span>
            React.js <Badge>v{React.version}</Badge>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
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
