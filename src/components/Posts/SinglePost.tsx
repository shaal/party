import Link from 'next/link'
import React from 'react'
import { Post, User } from '@__generated__/schema.generated'
import { Card, CardBody } from '../ui/Card'
import UserProfileLarge from '../ui/UserProfileLarge'
import Linkify from 'linkifyjs/react'

interface Props {
  post: Post
}

export const SinglePost: React.FC<Props> = ({ post }) => {
  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="flex justify-between items-center">
          <UserProfileLarge user={post?.user as User} />
          <Link href={`/posts/${post?.id}`} passHref>
            <div className="text-sm cursor-pointer">{post?.createdAt}</div>
          </Link>
        </div>
        <div className="text-lg post">
          <Linkify>{post?.text}</Linkify>
        </div>
      </CardBody>
    </Card>
  )
}
