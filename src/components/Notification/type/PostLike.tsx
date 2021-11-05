import SinglePost from '@components/Post/SinglePost'
import UserProfile from '@components/shared/UserProfile'
import { Card, CardBody } from '@components/UI/Card'
import { Notification, Post } from '@graphql/types.generated'
import { HeartIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import * as timeago from 'timeago.js'

import MarkAsRead from '../Read'

interface Props {
  notification: Notification
}

const PostLike: React.FC<Props> = ({ notification }) => {
  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HeartIcon className="h-6 w-6 text-pink-500" />
              <UserProfile user={notification?.dispatcher} />
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm cursor-pointer">
                {timeago.format(notification?.createdAt)}
              </div>
              <MarkAsRead notification={notification} />
            </div>
          </div>
          <div className="linkify">
            liked your{' '}
            <Link href={`/posts/${notification?.like?.post?.id}`}>
              <a href={`/posts/${notification?.like?.post?.id}`}>post</a>
            </Link>
          </div>
        </div>
        <SinglePost post={notification?.like?.post as Post} />
      </CardBody>
    </Card>
  )
}

export default PostLike
