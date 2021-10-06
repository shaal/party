import AppContext from '@components/utils/AppContext'
import {
  CubeIcon,
  GlobeIcon,
  HomeIcon,
  UserIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import React, { useContext } from 'react'

const MobileFooter: React.FC = () => {
  const { currentUser, currentUserLoading, staffMode } = useContext(AppContext)

  return (
    <div className="block sm:hidden">
      <div className="bg-white border-gray-200 border-t bottom-0 fixed w-full z-40 flex items-center justify-between">
        <Link href="/">
          <a className="py-4 px-8">
            <HomeIcon className="h-6 w-6" />
          </a>
        </Link>
        <Link href="/">
          <a className="py-4 px-8">
            <CubeIcon className="h-6 w-6" />
          </a>
        </Link>
        <Link href="/">
          <a className="py-4 px-8">
            <GlobeIcon className="h-6 w-6" />
          </a>
        </Link>
        <Link href="/">
          <a className="py-4 px-8">
            <UserIcon className="h-6 w-6" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default MobileFooter
