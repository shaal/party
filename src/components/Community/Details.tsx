import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import Slug from '@components/shared/Slug'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import AppContext from '@components/utils/AppContext'
import { imagekitURL } from '@components/utils/imagekitURL'
import { linkifyOptions } from '@components/utils/linkifyOptions'
import {
  FingerPrintIcon,
  PencilIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import Linkify from 'linkify-react'
import Link from 'next/link'
import { useContext } from 'react'
import { Community } from 'src/__generated__/schema.generated'

import Join from './Join'

interface Props {
  community: Community
}

const Details: React.FC<Props> = ({ community }) => {
  const { currentUser } = useContext(AppContext)

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
        <Card>
          <CardBody className="space-y-3">
            <Link href={`/communities/${community?.slug}/members`}>
              <a className="flex items-center space-x-1.5">
                <UserGroupIcon className="h-5 w-5" />
                <div>{community?.members?.totalCount}</div>
                <div>members joined</div>
              </a>
            </Link>
            <div className="flex items-center space-x-1.5">
              <FingerPrintIcon className="h-5 w-5" />
              <div>Moderated by</div>
              <div className="flex items-center space-x-1">
                <img
                  className="h-5 w-5 rounded-lg"
                  src={community?.owner?.profile?.avatar}
                  alt={`@${community?.owner?.username}'s username'`}
                />
                <Link href={`/@/${community?.owner?.username}`}>
                  <a>
                    <Slug slug={community?.owner?.username} prefix="@" />
                  </a>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Details