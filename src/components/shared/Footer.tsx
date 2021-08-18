import {
  ShieldCheckIcon,
  ShieldExclamationIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useContext } from 'react'

import AppContext from '../utils/AppContext'

const Footer: React.FC = () => {
  const { currentUser, staffMode, setStaffMode } = useContext(AppContext)
  const toggleStaffMode = () => {
    localStorage.setItem('staffMode', String(!staffMode))
    setStaffMode(!staffMode)
  }

  return (
    <footer className="mt-4 leading-7 text-sm sticky top-20">
      <span className="text-gray-500 dark:text-gray-300 font-bold pr-3">
        © Devparty
      </span>
      <span className="pr-3">
        <Link href="/">About</Link>
      </span>
      <span className="pr-3">
        <Link href="/">Terms</Link>
      </span>
      <span className="pr-3">
        <Link href="/">Privacy</Link>
      </span>
      <a
        className="pr-3"
        href="https://gitlab.com/yo/devparty"
        target="_blank"
        rel="noreferrer"
      >
        Status
      </a>
      <a
        className="pr-3"
        href="https://gitlab.com/yo/devparty"
        target="_blank"
        rel="noreferrer"
      >
        GitLab
      </a>
      <div className="flex mt-1">
        <a
          className="pr-3 hover:font-bold"
          href="https://vercel.com/?utm_source=Devparty&utm_campaign=oss"
          target="_blank"
          rel="noreferrer"
        >
          ▲ Powered by Vercel
        </a>
        {currentUser?.isStaff && (
          <a onClick={toggleStaffMode} className="cursor-pointer">
            {staffMode ? (
              <div className="flex items-center space-x-1 text-red-500">
                <ShieldCheckIcon className="h-4 w-4" />
                <div>Staff mode on</div>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-green-600">
                <ShieldExclamationIcon className="h-4 w-4" />
                <div>Staff mode off</div>
              </div>
            )}
          </a>
        )}
      </div>
    </footer>
  )
}

export default Footer
