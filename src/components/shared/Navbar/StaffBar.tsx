import { Disclosure } from '@headlessui/react'
import { DatabaseIcon, ShieldCheckIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

const StaffBar: React.FC = () => {
  const reactVersion = React.version.split('-')
  return (
    <div className="bg-gray-200 dark:bg-black px-3 py-1 flex justify-between text-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div>React.js</div>
          <Disclosure>
            <span className="flex text-xs font-bold bg-gray-300 dark:bg-gray-900 py-0.5 px-1.5 rounded-md">
              <Disclosure.Button className="font-bold">
                v{reactVersion[0]}
              </Disclosure.Button>
              <Disclosure.Panel>
                <span className="mx-0.5">·</span>
                <span>{reactVersion[1]}</span>
                <span className="mx-0.5">·</span>
                <span>{reactVersion[2]}</span>
              </Disclosure.Panel>
            </span>
          </Disclosure>
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
