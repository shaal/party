import Link from 'next/link'
import React, { useContext } from 'react'

import { User } from '../../__generated__/schema.generated'
import Follow from '../Users/Follow'
import AppContext from '../utils/AppContext'
import Slug from './Slug'

interface Props {
  user: User
  showFollow?: boolean
}

const UserProfile: React.FC<Props> = ({ user, showFollow = false }) => {
  const { currentUser } = useContext(AppContext)

  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <img
          src={user?.profile?.avatar as string}
          className="h-11 w-11 rounded-full bg-gray-200"
          alt={`@${user?.username}'s avatar`}
        />
        <div>
          <div className="flex items-center gap-1.5">
            <Link href={`/${user?.username}`} passHref>
              <div className="font-bold cursor-pointer">
                {user?.profile?.name}
              </div>
            </Link>
          </div>
          <Slug slug={user?.username} prefix="@" />
        </div>
      </div>
      {currentUser && showFollow && <Follow user={user} showText={false} />}
    </div>
  )
}

export default UserProfile
