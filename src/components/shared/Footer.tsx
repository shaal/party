import {
  ShieldCheckIcon,
  ShieldExclamationIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useContext } from 'react'

import AppContext from '../utils/AppContext'

const Footer: React.FC = () => {
  const { currentUser, staffMode } = useContext(AppContext)

  return (
    <footer className="mt-4 space-x-4">
      <span className="text-gray-500 dark:text-gray-300 font-bold">
        © Devparty
      </span>
      <Link href="/">About</Link>
      <Link href="/">Terms</Link>
      <Link href="/">Privacy</Link>
      <a href="https://gitlab.com/yo/devparty" target="_blank" rel="noreferrer">
        GitLab
      </a>
      {currentUser?.isStaff &&
        (staffMode ? (
          <div className="flex items-center space-x-1 text-red-500">
            <ShieldCheckIcon className="h-4 w-4" />
            <div>Staff mode on</div>
          </div>
        ) : (
          <div className="flex items-center space-x-1 text-green-600">
            <ShieldExclamationIcon className="h-4 w-4" />
            <div>Staff mode off</div>
          </div>
        ))}
    </footer>
  )
}

export default Footer
