import SinglePost from '@components/Post/SinglePost'
import Slug from '@components/shared/Slug'
import { Card, CardBody } from '@components/ui/Card'
import Link from 'next/link'
import React from 'react'
import { Notification, Post } from 'src/__generated__/schema.generated'

interface Props {
  notification: Notification
}

const PostReply: React.FC<Props> = ({ notification }) => {
  return (
    <Card>
      <CardBody className="space-y-3">
        <div className="space-y-3">
          <div className="flex items-center space-x-1">
            <Slug slug={notification?.dispatcher?.username} prefix="@" />
            <div className="linkify">
              Replied to your{' '}
              <Link href={`/posts/${notification?.post?.id}`}>
                <a>post</a>
              </Link>
            </div>
          </div>
        </div>
        <SinglePost post={notification?.post as Post} />
      </CardBody>
    </Card>
  )
}

export default PostReply
