import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { User } from '~/__generated__/schema.generated'

import Username from './Username'

interface Props {
  user: User
  showFollow?: boolean
}

const UserProfileLarge: React.FC<Props> = ({ user, showFollow = false }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <Image
          height="45"
          width="45"
          src={user?.profile?.avatar as string}
          className="rounded-full"
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
          <Username username={user?.username} />
        </div>
      </div>
    </div>
  )
}

export default UserProfileLarge
