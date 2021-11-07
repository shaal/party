import { ExclamationIcon, ShareIcon, UserIcon } from '@heroicons/react/outline'
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
  <Link href={url}>
    <a
      href={url}
      className={clsx(
        'flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-brand-100 hover:text-brand-500 dark:hover:bg-opacity-20 dark:bg-opacity-20 hover:bg-opacity-100',
        { 'bg-brand-100 text-brand-500 font-bold': current }
      )}
    >
      {children}
    </a>
  </Link>
)

interface Props {
  slug: string
}

const Sidebar: React.FC<Props> = ({ slug }) => {
  const router = useRouter()

  return (
    <div className="space-y-1.5 mb-4 px-3 sm:px-0">
      <Menu
        current={router.pathname == '/products/[slug]/settings/profile'}
        url={`/products/${slug}/settings/profile`}
      >
        <UserIcon className="h-4 w-4" />
        <div>Profile</div>
      </Menu>
      <Menu
        current={router.pathname == '/products/[slug]/settings/social'}
        url={`/products/${slug}/settings/social`}
      >
        <ShareIcon className="h-4 w-4" />
        <div>Social</div>
      </Menu>
      <Menu
        current={router.pathname == '/products/[slug]/settings/delete'}
        url={`/products/${slug}/settings/delete`}
      >
        <ExclamationIcon className="h-4 w-4 text-red-500" />
        <div className="text-red-500">Danger Zone</div>
      </Menu>
    </div>
  )
}

export default Sidebar
