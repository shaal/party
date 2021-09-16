import Slug from '@components/shared/Slug'
import { Button } from '@components/ui/Button'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import AppContext from '@components/utils/AppContext'
import { LocationMarkerIcon, SupportIcon } from '@heroicons/react/outline'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import Linkify from 'linkifyjs/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useContext } from 'react'
import { Profile, User } from 'src/__generated__/schema.generated'

import { Tooltip } from '../ui/Tooltip'
import Badges from './Badges'
import Follow from './Follow'
import Followerings from './Followerings'
import Spotify from './Highlights/Spotify'
import Wakatime from './Highlights/Wakatime'
import OwnedProducts from './OwnedProducts'
import Social from './Social'

const UserMod = dynamic(() => import('./Mod'))

interface Props {
  user: User
}

const Details: React.FC<Props> = ({ user }) => {
  const { currentUser, staffMode } = useContext(AppContext)

  return (
    <div className="mb-4">
      <div className="px-5 sm:px-0 space-y-5">
        <img
          src={user?.profile?.avatar as string}
          className="rounded-full h-28 w-28 sm:h-40 sm:w-40 -mt-24 ring-8 bg-gray-300 dark:bg-gray-600 ring-gray-50 dark:ring-black"
          alt={`@${user?.username}'s avatar`}
        />
        <div>
          <div className="text-2xl font-bold flex items-center gap-1.5">
            {user?.profile?.name}
            {user?.isVerified && (
              <Tooltip content={'Verified'}>
                <BadgeCheckIcon className="h-6 w-6 text-brand-500" />
              </Tooltip>
            )}
            {user?.isStaff && (
              <Tooltip content={'Staff'}>
                <SupportIcon className="h-6 w-6 text-yellow-600" />
              </Tooltip>
            )}
          </div>
          <Slug slug={user?.username} prefix="@" className="text-xl" />
        </div>
        <Followerings user={user} />
        {currentUser?.id !== user?.id ? (
          <Follow user={user} showText={true} />
        ) : (
          <Link href="/settings/profile" passHref>
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
        {user?.hasWakatimeIntegration && <Wakatime user={user} />}
        {user?.hasSpotifyIntegration && <Spotify user={user} />}
        <Badges user={user} />
      </div>
      {currentUser?.isStaff && staffMode && (
        <>
          {user?.spammy && (
            <ErrorMessage
              title="Oops!"
              error={new Error('This user is marked as spammy!')}
            />
          )}
          <UserMod user={user} />
        </>
      )}
    </div>
  )
}

export default Details
