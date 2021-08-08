import { gql, useMutation } from '@apollo/client'
import { ChatIcon, TrashIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useContext } from 'react'
import * as timeago from 'timeago.js'

import { Post, User } from '~/__generated__/schema.generated'
import AppContext from '~/components/utils/AppContext'

import UserProfileLarge from '../../shared/UserProfileLarge'
import { Card, CardBody } from '../../ui/Card'
import LikeButton from '../LikeButton'
import {
  ToggleLikeMutation,
  ToggleLikeMutationVariables
} from './__generated__/index.generated'
import PostType from './Type/Post'
import QuestionType from './Type/Question'
import TaskType from './Type/Task'

interface Props {
  post: Post
}

const SinglePost: React.FC<Props> = ({ post }) => {
  const { currentUser } = useContext(AppContext)
  const router = useRouter()
  const [toggleLike, toggleLikeResult] = useMutation<
    ToggleLikeMutation,
    ToggleLikeMutationVariables
  >(
    gql`
      mutation ToggleLikeMutation($input: ToggleLikeInput!) {
        toggleLike(input: $input) {
          id
          hasLiked
          likesCount
        }
      }
    `
  )

  const handleLike = (post: any) => {
    toggleLike({
      variables: {
        input: {
          postId: post?.id
        }
      }
    })
  }

  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="flex justify-between items-center">
          <UserProfileLarge user={post?.user as User} />
          <Link href={`/posts/${post?.id}`} passHref>
            <div className="text-sm cursor-pointer">
              {timeago.format(post?.createdAt)}
            </div>
          </Link>
        </div>
        {post?.type === 'POST' && <PostType post={post} />}
        {post?.type === 'TASK' && <TaskType task={post} />}
        {post?.type === 'QUESTION' && <QuestionType question={post} />}
      </CardBody>
      <div className="flex px-4 py-3 gap-7 border-t dark:border-gray-800">
        <LikeButton entity={post} handleLike={handleLike} loading={false} />
        <Link href={`/posts/${post?.id}`} passHref>
          <button className="text-blue-500 hover:text-blue-400 flex items-center space-x-2">
            <ChatIcon className="h-5 w-5" />
          </button>
        </Link>
        {post?.user?.id === currentUser?.id && (
          <button
            className="text-red-500 hover:text-red-400 flex items-center space-x-2"
            onClick={() => console.log('WIP')}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </Card>
  )
}

export default SinglePost
