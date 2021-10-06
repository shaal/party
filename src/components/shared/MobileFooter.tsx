import AppContext from '@components/utils/AppContext'
import { CubeIcon, GlobeIcon, HomeIcon } from '@heroicons/react/outline'
import {
  CubeIcon as CubeIconSolid,
  GlobeIcon as GlobeIconSolid,
  HomeIcon as HomeIconSolid
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const MobileFooter: React.FC = () => {
  const router = useRouter()
  const { currentUser } = useContext(AppContext)

  return (
    <div className="block sm:hidden">
      <div className="bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-150 border-gray-200 dark:border-gray-700 border-t bottom-0 fixed w-full z-50 flex items-center justify-between">
        <Link href={currentUser ? '/home' : '/'}>
          <a className="py-4 px-8">
            {router.pathname == '/home' ? (
              <HomeIconSolid className="h-6 w-6 text-brand-500" />
            ) : (
              <HomeIcon className="h-6 w-6" />
            )}
          </a>
        </Link>
        <Link href="/products">
          <a className="py-4 px-8">
            {router.pathname == '/products' ? (
              <CubeIconSolid className="h-6 w-6 text-brand-500" />
            ) : (
              <CubeIcon className="h-6 w-6" />
            )}
          </a>
        </Link>
        <Link href="/explore">
          <a className="py-4 px-8">
            {router.pathname == '/explore' ? (
              <GlobeIconSolid className="h-6 w-6 text-brand-500" />
            ) : (
              <GlobeIcon className="h-6 w-6" />
            )}
          </a>
        </Link>
      </div>
    </div>
  )
}

export default MobileFooter
