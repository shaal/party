import { Tooltip } from '@components/ui/Tooltip'
import { imagekitURL } from '@components/utils/imagekitURL'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import { User } from 'src/__generated__/schema.generated'

import Slug from './Slug'

interface Props {
  user: User
}

const UserProfileSmall: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <img
          src={imagekitURL(user?.profile?.avatar as string, 100, 100)}
          className="h-7 w-7 rounded-full bg-gray-200"
          alt={`@${user?.username}`}
        />
        <div>
          <div className="flex items-center text-sm -mb-1">
            <Link href={`/@/${user?.username}`}>
              <a
                href={`/@/${user?.username}`}
                className="font-bold cursor-pointer flex items-center space-x-1"
              >
                <div>{user?.profile?.name}</div>
                {user?.isVerified && (
                  <Tooltip content={'Verified'}>
                    <BadgeCheckIcon className="h-4 w-4 text-brand-500" />
                  </Tooltip>
                )}
              </a>
            </Link>
          </div>
          <Slug slug={user?.username} prefix="@" className="text-sm" />
        </div>
      </div>
    </div>
  )
}

export default UserProfileSmall
