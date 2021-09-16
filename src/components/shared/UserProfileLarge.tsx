import { Tooltip } from '@components/ui/Tooltip'
import Follow from '@components/User/Follow'
import AppContext from '@components/utils/AppContext'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React, { useContext } from 'react'
import { User } from 'src/__generated__/schema.generated'

import Slug from './Slug'

interface Props {
  user: User
  showFollow?: boolean
}

const UserProfileLarge: React.FC<Props> = ({ user, showFollow = false }) => {
  const { currentUser } = useContext(AppContext)

  return (
    <div className="flex justify-between items-center space-x-5">
      <div className="flex space-x-3 items-center">
        <img
          src={user?.profile?.avatar as string}
          className="h-14 w-14 rounded-full bg-gray-200"
          alt={`@/${user?.username}'s avatar`}
        />
        <div className="space-y-2">
          <div>
            <div className="flex items-center gap-1.5">
              <Link href={`/@/${user?.username}`} passHref>
                <a className="font-bold cursor-pointer flex items-center space-x-1">
                  <div>{user?.profile?.name}</div>
                  {user?.isVerified && (
                    <Tooltip content={'Verified'}>
                      <BadgeCheckIcon className="h-4 w-4 text-brand-500" />
                    </Tooltip>
                  )}
                </a>
              </Link>
            </div>
            <Slug slug={user?.username} prefix="@" />
          </div>
          <div>{user?.profile?.bio}</div>
        </div>
      </div>
      {currentUser && showFollow && <Follow user={user} showText />}
    </div>
  )
}

export default UserProfileLarge
