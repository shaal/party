import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import Slug from '@components/shared/Slug'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import AppContext from '@components/utils/AppContext'
import { imagekitURL } from '@components/utils/imagekitURL'
import { linkifyOptions } from '@components/utils/linkifyOptions'
import {
  ClockIcon,
  FingerPrintIcon,
  PencilIcon,
  UsersIcon
} from '@heroicons/react/outline'
import Linkify from 'linkify-react'
import Link from 'next/link'
import { useContext } from 'react'
import { Community } from 'src/__generated__/schema.generated'
import * as timeago from 'timeago.js'

import Join from './Join'

interface Props {
  community: Community
}

const Details: React.FC<Props> = ({ community }) => {
  const { currentUser } = useContext(AppContext)

  return (
    <Card className="mb-4">
      <CardBody>
        <GridLayout className="!p-0">
          <GridItemEight>
            <div className="flex items-center space-x-5">
              <img
                src={imagekitURL(community?.avatar as string, 200, 200)}
                className="rounded-lg h-28 w-28 sm:h-40 sm:w-40 ring-8 ring-gray-50 dark:ring-black"
                alt={`#${community?.slug}`}
              />
              <div>
                <div>
                  <div className="text-2xl font-bold flex items-center gap-1.5">
                    {community?.name}
                  </div>
                  <div className="text-xl">{community?.slug}</div>
                </div>
                {community?.description && (
                  <div className="linkify">
                    <Linkify options={linkifyOptions}>
                      {community?.description}
                    </Linkify>
                  </div>
                )}
              </div>
            </div>
          </GridItemEight>
          <GridItemFour>
            <Card forceRounded>
              <CardBody className="space-y-3">
                <div className="flex items-center space-x-1.5">
                  <UsersIcon className="h-5 w-5" />
                  <div>{community?.members?.totalCount} members joined</div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <FingerPrintIcon className="h-5 w-5" />
                  <div>Moderated by</div>
                  <div className="flex items-center space-x-1">
                    <img
                      className="h-5 w-5 rounded-lg"
                      src={community?.owner?.profile?.avatar}
                      alt={`@${community?.owner?.username}'s username'`}
                    />
                    <Link href={`/u/${community?.owner?.username}`}>
                      <a href={`/u/${community?.owner?.username}`}>
                        <Slug slug={community?.owner?.username} prefix="@" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ClockIcon className="h-5 w-5" />
                  <div>Created {timeago.format(community?.createdAt)}</div>
                </div>
              </CardBody>
            </Card>
          </GridItemFour>
        </GridLayout>
      </CardBody>
      <div className="border-t" />
      <div className="flex items-center justify-between py-4 px-5">
        <div className="flex items-center space-x-3">
          <Button variant="secondary" outline>
            <Link href={`/communities/${community?.slug}`}>
              <a href={`/communities/${community?.slug}`}>
                <div>Home</div>
              </a>
            </Link>
          </Button>
          <Button variant="primary" light>
            <Link href={`/communities/${community?.slug}/members`}>
              <a href={`/communities/${community?.slug}/members`}>
                <div>Members</div>
              </a>
            </Link>
          </Button>
          <Button variant="primary" light>
            <Link href={`/communities/${community?.slug}/about`}>
              <a href={`/communities/${community?.slug}/about`}>
                <div>About</div>
              </a>
            </Link>
          </Button>
        </div>
        <div>
          {currentUser?.id !== community?.owner?.id ? (
            <Join community={community} showText />
          ) : (
            <Link href={`/communities/${community?.slug}/settings`}>
              <a href={`/communities/${community?.slug}/settings`}>
                <Button
                  size="md"
                  variant="success"
                  icon={<PencilIcon className="h-4 w-4" />}
                >
                  Edit Community
                </Button>
              </a>
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}

export default Details
