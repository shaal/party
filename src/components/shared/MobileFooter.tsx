import AppContext from '@components/utils/AppContext'
import {
  GlobeIcon,
  HomeIcon,
  LightningBoltIcon,
  UserIcon
} from '@heroicons/react/outline'
import {
  GlobeIcon as GlobeIconSolid,
  HomeIcon as HomeIconSolid,
  LightningBoltIcon as LightningBoltIconSolid,
  UserIcon as UserIconSolid
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const MobileFooter: React.FC = () => {
  const router = useRouter()
  const { currentUser } = useContext(AppContext)

  return (
    <div className="block sm:hidden">
      <div className="mobile-footer bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-150 border-gray-200 dark:border-gray-700 border-t bottom-0 fixed w-full z-50 flex items-center justify-between px-3">
        <Link href={currentUser ? '/home' : '/'}>
          <a className="text-xs py-1.5">
            {router.pathname == '/home' ? (
              <div className="text-brand-500 font-bold space-y-0.5">
                <HomeIconSolid className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Home</div>
              </div>
            ) : (
              <div className="space-y-0.5">
                <HomeIcon className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Home</div>
              </div>
            )}
          </a>
        </Link>
        <Link href="/notifications">
          <a className="text-xs py-1.5">
            {router.pathname == '/notifications' ? (
              <div className="text-brand-500 font-bold space-y-0.5">
                <LightningBoltIconSolid className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Notifications</div>
              </div>
            ) : (
              <div className="space-y-0.5">
                <LightningBoltIcon className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Notifications</div>
              </div>
            )}
          </a>
        </Link>
        <Link href="/explore">
          <a className="text-xs py-1.5">
            {router.pathname == '/explore' ? (
              <div className="text-brand-500 font-bold space-y-0.5">
                <GlobeIconSolid className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Explore</div>
              </div>
            ) : (
              <div className="space-y-0.5">
                <GlobeIcon className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Explore</div>
              </div>
            )}
          </a>
        </Link>
        <Link href={`/@/${currentUser?.username}`}>
          <a className="text-xs py-1.5">
            {router.pathname == '/@/[username]' ? (
              <div className="text-brand-500 font-bold space-y-0.5">
                <UserIconSolid className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Profile</div>
              </div>
            ) : (
              <div className="space-y-0.5">
                <UserIcon className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Profile</div>
              </div>
            )}
          </a>
        </Link>
      </div>
    </div>
  )
}

export default MobileFooter
