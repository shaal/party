import SinglePost from '@components/Post/SinglePost'
import UserProfile from '@components/shared/UserProfile'
import { Card, CardBody } from '@components/ui/Card'
import Link from 'next/link'
import React from 'react'
import { Notification, Post } from 'src/__generated__/schema.generated'
import * as timeago from 'timeago.js'

interface Props {
  notification: Notification
}

const LikeNotification: React.FC<Props> = ({ notification }) => {
  return (
    <Card>
      <CardBody className="space-y-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <UserProfile user={notification?.dispatcher} />
            <div className="text-sm cursor-pointer">
              {timeago.format(notification?.createdAt)}
            </div>
          </div>
          <div className="linkify">
            Liked your{' '}
            <Link href={`/posts/${notification?.like?.post?.id}`}>
              <a>post</a>
            </Link>
          </div>
        </div>
        <SinglePost post={notification?.like?.post as Post} />
      </CardBody>
    </Card>
  )
}

export default LikeNotification
