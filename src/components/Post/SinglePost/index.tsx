import { gql, useMutation } from '@apollo/client'
import { ChatIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import * as timeago from 'timeago.js'

import { Post, User } from '~/__generated__/schema.generated'
// import { HOME_FEED_QUERY } from '~/components/Home/Feed'
import AppContext from '~/components/utils/AppContext'

import UserProfileLarge from '../../shared/UserProfileLarge'
import { Card, CardBody } from '../../ui/Card'
// import DeleteButton from '../DeleteButton'
import LikeButton from '../LikeButton'
import {
  TogglePostLikeMutation,
  TogglePostLikeMutationVariables
} from './__generated__/index.generated'
import PostType from './Type/Post'
import QuestionType from './Type/Question'
import TaskType from './Type/Task'

export const PostFragment = gql`
  fragment PostFragment on Post {
    id
    title
    body
    done
    attachments
    type
    hasLiked
    likesCount
    repliesCount
    likes(first: 5) {
      edges {
        node {
          user {
            id
            username
            profile {
              id
              name
              avatar
            }
          }
        }
      }
    }
    createdAt
    user {
      id
      username
      hasFollowed
      profile {
        id
        name
        avatar
      }
    }
  }
`

interface Props {
  post: Post
  showReplies?: boolean
}

const SinglePost: React.FC<Props> = ({ post, showReplies = false }) => {
  const { currentUser } = useContext(AppContext)
  const [togglePostLike, togglePostLikeResult] = useMutation<
    TogglePostLikeMutation,
    TogglePostLikeMutationVariables
  >(
    gql`
      mutation TogglePostLikeMutation($input: TogglePostLikeInput!) {
        togglePostLike(input: $input) {
          ...PostFragment
        }
      }
      ${PostFragment}
    `
  )

  const handleLike = (post: any) => {
    togglePostLike({
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
            {(post?.repliesCount as number) > 0 && (
              <div className="text-xs">{post?.repliesCount}</div>
            )}
          </button>
        </Link>
        {/* {post?.user?.id === currentUser?.id && (
          <DeleteButton entity={post} refreshQuery={HOME_FEED_QUERY} />
        )} */}
        {(post?.likesCount as number) > 0 && (
          <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
            <div>Liked by</div>
            <div className="flex -space-x-1.5 overflow-hidden">
              {post?.likes?.edges?.map((like) => (
                <img
                  key={like?.node?.user?.id}
                  className="rounded-full border h-5 w-5"
                  src={like?.node?.user?.profile?.avatar as string}
                  alt={`@${like?.node?.user?.username}'s avatar`}
                />
              ))}
            </div>
            {(post?.likesCount as number) > 5 && (
              <div>and {(post?.likesCount as number) - 5} others...</div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}

export default SinglePost
