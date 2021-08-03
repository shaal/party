import Link from 'next/link'
import React from 'react'
import { Post, User } from '@__generated__/schema.generated'
import { Card, CardBody } from '../ui/Card'
import UserProfileLarge from '../ui/UserProfileLarge'
import Linkify from 'linkifyjs/react'
import { ChatIcon, TrashIcon } from '@heroicons/react/outline'
import { useContext } from 'react'
import AppContext from '@components/utils/AppContext'

interface Props {
  post: Post
}

export const SinglePost: React.FC<Props> = ({ post }) => {
  const { currentUser } = useContext(AppContext)

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
          <Linkify>{post?.body}</Linkify>
        </div>
      </CardBody>
      <div className="flex p-3 gap-7 border-t dark:border-gray-800">
        <Link href={`/posts/${post?.id}`} passHref>
          <button className="text-blue-500 hover:text-blue-400 flex items-center space-x-2">
            <ChatIcon className="h-5 w-5" />
          </button>
        </Link>
        {post?.user?.id === currentUser?.id && (
          <button className="text-red-500 hover:text-red-400 flex items-center space-x-2">
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </Card>
  )
}
