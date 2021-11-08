import { imagekitURL } from '@components/utils/imagekitURL'
import { Community } from '@graphql/types.generated'
import Link from 'next/link'
import React from 'react'

import Slug from './Slug'

interface Props {
  community: Community
}

const CommunityProfileLarge: React.FC<Props> = ({ community }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <img
          src={imagekitURL(community?.avatar as string, 100, 100)}
          className="h-16 w-16 rounded-lg bg-gray-200"
          alt={`#${community?.slug}`}
        />
        <div>
          <div className="flex items-center gap-1.5">
            <Link href={`/communities/${community?.slug}`} passHref>
              <a
                href={`/communities/${community?.slug}`}
                className="font-bold cursor-pointer"
              >
                {community?.name}
              </a>
            </Link>
          </div>
          <Slug slug={community?.slug} />
          {community?.description && (
            <div className="mt-2 text-gray-600 dark:text-gray-300">
              {community?.description}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommunityProfileLarge
