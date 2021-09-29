import Slug from '@components/shared/Slug'
import { HeartIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import { Log } from 'src/__generated__/schema.generated'
import * as timeago from 'timeago.js'

interface Props {
  log: Log
}

const SingleLog: React.FC<Props> = ({ log }) => {
  return (
    <div className="border dark:border-gray-700 p-3 rounded-lg flex items-center space-x-3">
      <img
        className="h-7 w-7 rounded-full"
        src={log?.user?.profile?.avatar}
        alt={`@${log?.user?.username}'s avatar`}
      />
      <div className="space-y-1">
        <div className="flex items-center space-x-1">
          <Slug slug={log?.user?.username} prefix="@" />
          <div>–</div>
          <div className="text-sm font-bold">{log?.action}</div>
        </div>
        <div className="linkify">
          {log?.action === 'POST_LIKE' && (
            <div className="flex items-center space-x-1">
              <HeartIcon className="h-4 w-4 text-pink-500" />
              <div>
                Liked a <Link href={`/posts/${log?.entityId}`}>post</Link>
              </div>
            </div>
          )}
        </div>
        <div className="text-sm">{timeago.format(log?.createdAt)}</div>
      </div>
    </div>
  )
}

export default SingleLog
