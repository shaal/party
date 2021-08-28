import { ShareIcon, UserIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

interface MenuProps {
  children: React.ReactNode
}

const Menu: React.FC<MenuProps> = ({ children }) => (
  <a className="flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-indigo-100 hover:text-indigo-500 dark:hover:bg-opacity-20 hover:bg-opacity-100">
    {children}
  </a>
)

const Sidebar: React.FC = () => {
  return (
    <div>
      <Link href="/settings" passHref>
        <Menu>
          <UserIcon className="h-4 w-4" />
          <div>Account</div>
        </Menu>
      </Link>
      <Link href="/settings/social" passHref>
        <Menu>
          <ShareIcon className="h-4 w-4" />
          <div>Social</div>
        </Menu>
      </Link>
    </div>
  )
}

export default Sidebar
