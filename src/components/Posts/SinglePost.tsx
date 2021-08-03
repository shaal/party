import Link from 'next/link'
import React from 'react'
import { Post, User } from '~/__generated__/schema.generated'
import { Card, CardBody } from '../ui/Card'
import UserProfileLarge from '../ui/UserProfileLarge'
import { formatDistanceToNowStrict } from 'date-fns'

interface Props {
  post: Post
}

export const SinglePost: React.FC<Props> = ({ post }) => {
  return (
    <Card>
      <CardBody>
        <div>
          <div className="flex justify-between items-center">
            <UserProfileLarge user={post?.user as User} />
            <Link href={`/posts/${post?.id}`} passHref>
              <div className="text-sm cursor-pointer">
                {formatDistanceToNowStrict(new Date(post?.createdAt), {
                  addSuffix: true
                })}
              </div>
            </Link>
          </div>
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a>
              <div>{post.text}</div>
            </a>
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}
