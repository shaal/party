import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import Slug from '@components/shared/Slug'
import { Button } from '@components/ui/Button'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Tooltip } from '@components/ui/Tooltip'
import AppContext from '@components/utils/AppContext'
import { linkifyOptions } from '@components/utils/linkifyOptions'
import {
  LocationMarkerIcon,
  PencilIcon,
  SupportIcon
} from '@heroicons/react/outline'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import Linkify from 'linkify-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useContext } from 'react'
import { Profile, User } from 'src/__generated__/schema.generated'

import Badges from './Badges'
import Follow from './Follow'
import Followerings from './Followerings'
import Spotify from './Highlights/Spotify'
import Wakatime from './Highlights/Wakatime'
import OwnedProducts from './OwnedProducts'
import Social from './Social'
import Tips from './Tips'
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
          <div className="flex items-center space-x-2">
            <Slug slug={user?.username} prefix="@" className="text-xl" />
            {user?.isFollowing && (
              <span className="text-xs bg-gray-200 dark:bg-gray-800 border py-0.5 px-1.5 rounded-md">
                Follows you
              </span>
            )}
          </div>
        </div>
        <Followerings user={user} />
        <div className="flex items-center space-x-2">
          {currentUser?.id !== user?.id ? (
            <Follow user={user} showText={true} />
          ) : (
            <Link href="/settings/profile" passHref>
              <Button
                size="md"
                variant="success"
                className="text-sm"
                icon={<PencilIcon className="h-4 w-4" />}
              >
                Edit Profile
              </Button>
            </Link>
          )}
          {user?.tip && <Tips user={user} />}
        </div>
        {user?.profile?.bio && (
          <div className="linkify">
            <Linkify options={linkifyOptions}>{user?.profile?.bio}</Linkify>
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
