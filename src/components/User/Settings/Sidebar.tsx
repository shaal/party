import { LockClosedIcon, ShareIcon, UserIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface MenuProps {
  children: React.ReactNode
  current: boolean
  url: string
}

const Menu: React.FC<MenuProps> = ({ children, current, url }) => (
  <Link href={url} passHref>
    <a
      className={clsx(
        'flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-indigo-100 hover:text-indigo-500 dark:hover:bg-opacity-20 hover:bg-opacity-100',
        { 'bg-indigo-100 text-indigo-500 font-bold': current }
      )}
    >
      {children}
    </a>
  </Link>
)

const Sidebar: React.FC = () => {
  const router = useRouter()

  return (
    <div className="space-y-1.5">
      <Menu
        current={router.pathname == '/settings/profile'}
        url="/settings/profile"
      >
        <UserIcon className="h-4 w-4" />
        <div>Account</div>
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
    </div>
  )
}

export default Sidebar
