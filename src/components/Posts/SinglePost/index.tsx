import Link from 'next/link'
import React from 'react'
import { Post, User } from '~/__generated__/schema.generated'
import { Card, CardBody } from '../../ui/Card'
import UserProfileLarge from '../../shared/UserProfileLarge'
import { ChatIcon, TrashIcon } from '@heroicons/react/outline'
import { useContext } from 'react'
import AppContext from '~/components/utils/AppContext'
import * as timeago from 'timeago.js'
import PostType from './Type/Post'
import TaskType from './Type/Task'
import QuestionType from './Type/Question'
import { gql, Reference, useMutation } from '@apollo/client'
import {
  DeletePostMutation,
  DeletePostMutationVariables
} from './__generated__/index.generated'
import { useRouter } from 'next/router'

interface Props {
  post: Post
}

export const SinglePost: React.FC<Props> = ({ post }) => {
  const { currentUser } = useContext(AppContext)
  const router = useRouter()
  const [deletePost, deletePostResult] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(
    gql`
      mutation DeletePostMutation($input: DeletePostInput!) {
        deletePost(input: $input) {
          id
        }
      }
    `,
    {
      update(cache) {
        cache.modify({
          fields: {
            notes(existingPosts, { readField }) {
              return existingPosts.filter(
                (postRef: Reference) => post?.id !== readField('id', postRef)
              )
            }
          }
        })
      },
      onCompleted() {
        router.reload()
      }
    }
  )

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
      <div className="flex p-3 gap-7 border-t dark:border-gray-800">
        <Link href={`/posts/${post?.id}`} passHref>
          <button className="text-blue-500 hover:text-blue-400 flex items-center space-x-2">
            <ChatIcon className="h-5 w-5" />
          </button>
        </Link>
        {post?.user?.id === currentUser?.id && (
          <button
            className="text-red-500 hover:text-red-400 flex items-center space-x-2"
            onClick={() =>
              deletePost({ variables: { input: { id: post?.id } } })
            }
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </Card>
  )
}
