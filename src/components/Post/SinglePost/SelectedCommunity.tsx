import { Tooltip } from '@components/ui/Tooltip'
import { imagekitURL } from '@components/utils/imagekitURL'
import { UsersIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import { Community } from 'src/__generated__/schema.generated'

interface Props {
  community: Community
}

const SelectedCommunity: React.FC<Props> = ({ community }) => {
  return (
    <div className="text-sm flex items-center space-x-2">
      <Tooltip content="Community">
        <UsersIcon className="h-4 w-4 text-gray-500" />
      </Tooltip>
      <Link href={`/communities/${community?.slug}`}>
        <a
          href={`/communities/${community?.slug}`}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <img
            className="h-4 w-4 rounded"
            src={imagekitURL(community?.avatar as string, 50, 50)}
            alt={`#${community?.slug}'s avatar'`}
          />
          <div className="font-bold text-gray-600 dark:text-gray-200">
            {community?.name}
          </div>
        </a>
      </Link>
    </div>
  )
}

export default SelectedCommunity
