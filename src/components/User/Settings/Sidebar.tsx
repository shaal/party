import {
  BeakerIcon,
  ClipboardListIcon,
  IdentificationIcon,
  LockClosedIcon,
  PuzzleIcon,
  ShareIcon,
  UserIcon
} from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import AppContext from '~/components/utils/AppContext'

interface MenuProps {
  children: React.ReactNode
  current: boolean
  url: string
}

const Menu: React.FC<MenuProps> = ({ children, current, url }) => (
  <Link href={url} passHref>
    <a
      className={clsx(
        'flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-brand-100 hover:text-brand-500 dark:hover:bg-opacity-20 dark:bg-opacity-20 hover:bg-opacity-100',
        { 'bg-brand-100 text-brand-500 font-bold': current }
      )}
    >
      {children}
    </a>
  </Link>
)

const Sidebar: React.FC = () => {
  const router = useRouter()
  const { currentUser, staffMode } = useContext(AppContext)

  return (
    <div className="space-y-1.5 mb-4 px-3 sm:px-0">
      <Menu
        current={router.pathname == '/settings/profile'}
        url="/settings/profile"
      >
        <UserIcon className="h-4 w-4" />
        <div>Profile</div>
      </Menu>
      <Menu
        current={router.pathname == '/settings/social'}
        url="/settings/social"
      >
        <ShareIcon className="h-4 w-4" />
        <div>Social</div>
      </Menu>
      <Menu
        current={router.pathname == '/settings/security'}
        url="/settings/security"
      >
        <LockClosedIcon className="h-4 w-4" />
        <div>Security</div>
      </Menu>
      <Menu
        current={router.pathname == '/settings/integration'}
        url="/settings/integration"
      >
        <PuzzleIcon className="h-4 w-4" />
        <div>Integrations</div>
      </Menu>
      <Menu
        current={router.pathname == '/settings/sessions'}
        url="/settings/sessions"
      >
        <IdentificationIcon className="h-4 w-4" />
        <div>Sessions</div>
      </Menu>
      {currentUser?.isStaff && staffMode && (
        <>
          <Menu
            current={router.pathname == '/settings/logs'}
            url="/settings/logs"
          >
            <ClipboardListIcon className="h-4 w-4" />
            <div>Audit Logs</div>
          </Menu>
          <Menu
            current={router.pathname == '/settings/labs'}
            url="/settings/labs"
          >
            <BeakerIcon className="h-4 w-4" />
            <div>Labs</div>
          </Menu>
        </>
      )}
    </div>
  )
}

export default Sidebar
