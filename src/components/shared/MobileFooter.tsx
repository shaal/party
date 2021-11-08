import AppContext from '@components/utils/AppContext'
import {
  GlobeAltIcon,
  HomeIcon,
  LightningBoltIcon,
  UsersIcon
} from '@heroicons/react/outline'
import {
  GlobeAltIcon as GlobeAltIconSolid,
  HomeIcon as HomeIconSolid,
  LightningBoltIcon as LightningBoltIconSolid,
  UsersIcon as UsersIconSolid
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const MobileFooter: React.FC = () => {
  const router = useRouter()
  const { currentUser } = useContext(AppContext)

  return (
    <div className="block sm:hidden">
      <div className="mobile-footer bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-150 border-gray-200 dark:border-gray-700 border-t bottom-0 fixed w-full z-10 flex items-center justify-between px-5">
        <Link href={currentUser ? '/home' : '/'} passHref>
          <a
            href={currentUser ? '/home' : '/'}
            className="text-[0.7rem] py-1.5"
          >
            {router.pathname == '/home' ? (
              <div className="text-brand-500 font-bold space-y-[0.3rem]">
                <HomeIconSolid className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Home</div>
              </div>
            ) : (
              <div className="space-y-[0.3rem]">
                <HomeIcon className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Home</div>
              </div>
            )}
          </a>
        </Link>
        <Link href="/notifications" passHref>
          <a href="/notifications" className="text-[0.7rem] py-1.5">
            {router.pathname == '/notifications' ? (
              <div className="text-brand-500 font-bold space-y-[0.3rem]">
                <LightningBoltIconSolid className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Notifications</div>
              </div>
            ) : (
              <div className="space-y-[0.3rem]">
                <LightningBoltIcon className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Notifications</div>
              </div>
            )}
          </a>
        </Link>
        <Link href="/explore" passHref>
          <a href="/explore" className="text-[0.7rem] py-1.5">
            {router.pathname == '/explore' ? (
              <div className="text-brand-500 font-bold space-y-[0.3rem]">
                <GlobeAltIconSolid className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Explore</div>
              </div>
            ) : (
              <div className="space-y-[0.3rem]">
                <GlobeAltIcon className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Explore</div>
              </div>
            )}
          </a>
        </Link>
        <Link href="/communities" passHref>
          <a href="/communities" className="text-[0.7rem] py-1.5">
            {router.pathname == '/communities' ? (
              <div className="text-brand-500 font-bold space-y-[0.3rem]">
                <UsersIconSolid className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Communities</div>
              </div>
            ) : (
              <div className="space-y-[0.3rem]">
                <UsersIcon className="h-[1.3rem] w-[1.3rem] mx-auto" />
                <div>Communities</div>
              </div>
            )}
          </a>
        </Link>
      </div>
    </div>
  )
}

export default MobileFooter
