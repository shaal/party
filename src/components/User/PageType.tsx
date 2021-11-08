import { User } from '@graphql/types.generated'
import { CollectionIcon, CubeIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface TabProps {
  children: React.ReactNode
  current: boolean
  url: string
}

const Tab: React.FC<TabProps> = ({ children, current, url }) => (
  <Link href={url} passHref>
    <a
      href={url}
      className={clsx(
        'flex items-center space-x-2 rounded-lg px-3 py-1 text-gray-500 hover:bg-purple-100 hover:text-purple-500 dark:hover:bg-opacity-20 hover:bg-opacity-100',
        { 'bg-brand-100 text-brand-500 font-bold': current }
      )}
    >
      {children}
    </a>
  </Link>
)

interface Props {
  user: User
}

const PageType: React.FC<Props> = ({ user }) => {
  const router = useRouter()

  return (
    <div className="flex gap-3 px-2 sm:px-0">
      <Tab
        current={router.pathname == '/u/[username]'}
        url={`/u/${user?.username}`}
      >
        <CollectionIcon className="h-4 w-4" />
        <div>Posts</div>
      </Tab>
      <Tab
        current={router.pathname == '/u/[username]/products'}
        url={`/u/${user?.username}/products`}
      >
        <CubeIcon className="h-4 w-4" />
        <div>Products</div>
      </Tab>
    </div>
  )
}

export default PageType
