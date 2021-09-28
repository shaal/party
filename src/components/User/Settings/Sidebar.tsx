import AppContext from '@components/utils/AppContext'
import clsx from 'clsx'
import {
  ClipboardList,
  Coins,
  Contact,
  Gavel,
  Lock,
  Share2,
  User
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

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
        <User size={16} />
        <div>Profile</div>
      </Menu>
      <Menu
        current={router.pathname == '/settings/social'}
        url="/settings/social"
      >
        <Share2 size={16} />
        <div>Social</div>
      </Menu>
      <Menu current={router.pathname == '/settings/tips'} url="/settings/tips">
        <Coins size={16} />
        <div>Tips</div>
      </Menu>
      <Menu
        current={router.pathname == '/settings/security'}
        url="/settings/security"
      >
        <Lock size={16} />
        <div>Security</div>
      </Menu>
      <Menu
        current={router.pathname == '/settings/integration'}
        url="/settings/integration"
      >
        <Gavel size={16} />
        <div>Integrations</div>
      </Menu>
      <Menu
        current={router.pathname == '/settings/sessions'}
        url="/settings/sessions"
      >
        <Contact size={16} />
        <div>Sessions</div>
      </Menu>
      {currentUser?.isStaff && staffMode && (
        <>
          <Menu
            current={router.pathname == '/settings/logs'}
            url="/settings/logs"
          >
            <ClipboardList size={16} />
            <div>Audit Logs</div>
          </Menu>
        </>
      )}
    </div>
  )
}

export default Sidebar
