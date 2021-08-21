import { Button } from '@components/ui/Button'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import AppContext from '@components/utils/AppContext'
import { LocationMarkerIcon, SupportIcon } from '@heroicons/react/outline'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import Linkify from 'linkifyjs/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Fragment, useContext } from 'react'

import { Profile, User } from '../../__generated__/schema.generated'
import Slug from '../shared/Slug'
import Follow from './Follow'
import Followerings from './Followerings'
import OwnedProducts from './OwnedProducts'
import Social from './Social'

const UserMod = dynamic(() => import('./Mod'))

interface Props {
  user: User
}

const Details: React.FC<Props> = ({ user }) => {
  const { currentUser, staffMode } = useContext(AppContext)

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
          {user?.isVerified && (
            <span title="Verified">
              <BadgeCheckIcon className="h-6 w-6 text-indigo-500" />
            </span>
          )}
          {user?.isStaff && (
            <span title="Staff">
              <SupportIcon className="h-6 w-6 text-yellow-600" />
            </span>
          )}
        </div>
        <Slug slug={user?.username} prefix="@" className="text-xl" />
      </div>
      <Followerings user={user} />
      {currentUser?.id !== user?.id ? (
        <Follow user={user} showText={true} />
      ) : (
        <Link href="/settings" passHref>
          <Button size="md" variant="success">
            Edit Profile
          </Button>
        </Link>
      )}
      {user?.profile?.bio && (
        <div className="linkify">
          <Linkify>{user?.profile?.bio}</Linkify>
        </div>
      )}
      {user?.profile?.location && (
        <div className="flex items-center gap-2">
          <LocationMarkerIcon className="h-4 w-4" />
          <div>{user?.profile?.location}</div>
        </div>
      )}
      <Social profile={user?.profile as Profile} />
      <OwnedProducts user={user} />
      {currentUser?.isStaff && staffMode && (
        <Fragment>
          {user?.spammy && (
            <ErrorMessage
              title="Oops!"
              error={new Error('This user is marked as spammy!')}
            />
          )}
          <UserMod user={user} />
        </Fragment>
      )}
    </div>
  )
}

export default Details
