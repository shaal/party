import Link from 'next/link'
import React from 'react'
import { User } from 'src/__generated__/schema.generated'

interface Props {
  user: User
}

const Followerings: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex gap-5">
      <Link href={`/@/${user?.username}/following`} passHref>
        <a>
          <div className="text-xl">{user?.following?.totalCount}</div>
          <div className="text-gray-500">Following</div>
        </a>
      </Link>
      <Link href={`/@/${user?.username}/followers`} passHref>
        <a>
          <div className="text-xl">{user?.followers?.totalCount}</div>
          <div className="text-gray-500">Followers</div>
        </a>
      </Link>
    </div>
  )
}

export default Followerings
