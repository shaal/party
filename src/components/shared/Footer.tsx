import AppContext from '@components/utils/AppContext'
import {
  ShieldCheckIcon,
  ShieldExclamationIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useContext } from 'react'

const Footer: React.FC = () => {
  const { currentUser, staffMode, setStaffMode } = useContext(AppContext)
  const toggleStaffMode = () => {
    localStorage.setItem('staffMode', String(!staffMode))
    setStaffMode(!staffMode)
  }

  return (
    <footer
      className={`mt-4 leading-7 text-sm sticky flex flex-wrap px-3 lg:px-0 ${
        staffMode ? 'top-28' : 'top-20'
      }`}
    >
      <span className="text-gray-500 dark:text-gray-300 font-bold pr-3">
        © Devparty
      </span>
      <span className="pr-3">
        <Link href="/about" passHref>
          About
        </Link>
      </span>
      <span className="pr-3">
        <Link href="/terms" passHref>
          Terms
        </Link>
      </span>
      <span className="pr-3">
        <Link href="/privacy" passHref>
          Privacy
        </Link>
      </span>
      <a
        className="pr-3"
        href="https://gitlab.com/yo/devparty"
        target="_blank"
        rel="noreferrer"
      >
        Status
      </a>
      <span className="pr-3">
        <Link href="/thanks" passHref>
          Thanks
        </Link>
      </span>
      <a
        className="pr-3"
        href="https://gitlab.com/yo/devparty"
        target="_blank"
        rel="noreferrer"
      >
        GitLab
      </a>
      <a
        className="pr-3 hover:font-bold"
        href="https://vercel.com/?utm_source=Devparty&utm_campaign=oss"
        target="_blank"
        rel="noreferrer"
      >
        ▲ Powered by Vercel
      </a>
      {currentUser?.isStaff && (
        <a href="#" onClick={toggleStaffMode}>
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
    </footer>
  )
}

export default Footer
