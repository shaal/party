import { LocationMarkerIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useContext } from 'react'

import { Profile, User } from '../../__generated__/schema.generated'
import Username from '../shared/Username'
import { Button } from '../ui/Button'
import AppContext from '../utils/AppContext'
import Follow from './Follow'
import Followerings from './Followerings'
import Social from './Social'

interface Props {
  user: User
}

const Details: React.FC<Props> = ({ user }) => {
  const { currentUser } = useContext(AppContext)

  return (
    <div className="space-y-5 w-96">
      <img
        src={user?.profile?.avatar as string}
        className="rounded-full h-40 w-40 -mt-24 ring-8 ring-gray-50 dark:ring-black"
        alt={`@${user?.username}'s avatar`}
      />
      <div>
        <div className="text-2xl font-bold flex items-center gap-1.5">
          {user?.profile?.name}
        </div>
        <Username username={user?.username} className="text-xl" />
      </div>
      <div>
        <Followerings user={user} />
      </div>
      {currentUser?.id !== user?.id ? (
        <Follow user={user} showText={true} />
      ) : (
        <Link href="/settings" passHref>
          <Button size="md" variant="success">
            Edit Profile
          </Button>
        </Link>
      )}
      {user?.profile?.bio && <div>{user?.profile?.bio}</div>}
      {user?.profile?.location && (
        <div className="flex items-center gap-2">
          <LocationMarkerIcon className="h-4 w-4" />
          <div>{user?.profile?.location}</div>
        </div>
      )}
      <Social profile={user?.profile as Profile} />
    </div>
  )
}

export default Details
