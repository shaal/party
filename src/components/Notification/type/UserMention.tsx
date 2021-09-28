import SinglePost from '@components/Post/SinglePost'
import Slug from '@components/shared/Slug'
import { Card, CardBody } from '@components/ui/Card'
import Link from 'next/link'
import React from 'react'
import { Notification, Post } from 'src/__generated__/schema.generated'
import * as timeago from 'timeago.js'

import MarkAsRead from '../Read'

interface Props {
  notification: Notification
}

const UserMention: React.FC<Props> = ({ notification }) => {
  return (
    <Card>
      <CardBody className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center linkify space-x-1">
            <Slug slug={notification?.dispatcher?.username} prefix="@" />
            <div>mentioned you in the</div>
            <Link href={`/posts/${notification?.post?.id}`}>
              <a>post</a>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm cursor-pointer">
              {timeago.format(notification?.createdAt)}
            </div>
            <MarkAsRead notification={notification} />
          </div>
        </div>
        <SinglePost post={notification?.post as Post} />
      </CardBody>
    </Card>
  )
}

export default UserMention
