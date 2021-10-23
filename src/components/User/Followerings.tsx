import { humanize } from '@components/utils/humanize'
import Link from 'next/link'
import React from 'react'
import { User } from 'src/__generated__/schema.generated'

interface Props {
  user: User
}

const Followerings: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex gap-5">
      <Link href={`/u/${user?.username}/following`}>
        <a href={`/u/${user?.username}/following`}>
          <div className="text-xl">{humanize(user?.following?.totalCount)}</div>
          <div className="text-gray-500">Following</div>
        </a>
      </Link>
      <Link href={`/u/${user?.username}/followers`}>
        <a href={`/u/${user?.username}/followers`}>
          <div className="text-xl">{humanize(user?.followers?.totalCount)}</div>
          <div className="text-gray-500">Followers</div>
        </a>
      </Link>
    </div>
  )
}

export default Followerings
