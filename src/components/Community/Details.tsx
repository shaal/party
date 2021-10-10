import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import UserProfileLarge from '@components/shared/UserProfileLarge'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import AppContext from '@components/utils/AppContext'
import { imagekitURL } from '@components/utils/imagekitURL'
import { linkifyOptions } from '@components/utils/linkifyOptions'
import { PencilIcon } from '@heroicons/react/outline'
import Linkify from 'linkify-react'
import Link from 'next/link'
import { useContext } from 'react'
import { Community } from 'src/__generated__/schema.generated'

import Join from './Join'

interface Props {
  community: Community
}

const Details: React.FC<Props> = ({ community }) => {
  const { currentUser, staffMode } = useContext(AppContext)

  return (
    <div className="mb-4">
      <div className="px-5 sm:px-0 space-y-5">
        <img
          src={imagekitURL(community?.avatar as string, 200, 200)}
          className="rounded-lg h-28 w-28 sm:h-40 sm:w-40 ring-8 ring-gray-50 dark:ring-black"
          alt={`#${community?.slug}'s avatar`}
        />
        <div>
          <div className="text-2xl font-bold flex items-center gap-1.5">
            {community?.name}
          </div>
          <div className="text-xl">{community?.slug}</div>
        </div>
        {currentUser?.id !== community?.owner?.id ? (
          <Join community={community} showText />
        ) : (
          <Link href={`/community/${community?.slug}/settings`} passHref>
            <Button
              size="md"
              variant="success"
              icon={<PencilIcon className="h-4 w-4" />}
            >
              Edit Community
            </Button>
          </Link>
        )}
        {community?.description && (
          <div className="linkify">
            <Linkify options={linkifyOptions}>{community?.description}</Linkify>
          </div>
        )}
        <div className="space-y-2">
          <div className="font-bold">Owned by</div>
          <Card>
            <CardBody>
              <UserProfileLarge user={community?.owner} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Details
