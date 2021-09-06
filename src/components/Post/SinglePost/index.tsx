import { gql, useMutation } from '@apollo/client'
import { ChatIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import * as timeago from 'timeago.js'

import { Post, User } from '~/__generated__/schema.generated'
import Slug from '~/components/shared/Slug'
import UserProfile from '~/components/shared/UserProfile'
import { Card, CardBody } from '~/components/ui/Card'
import AppContext from '~/components/utils/AppContext'

import DeleteButton from '../DeleteButton'
import LikeButton from '../LikeButton'
import {
  TogglePostLikeMutation,
  TogglePostLikeMutationVariables
} from './__generated__/index.generated'
import SelectedProduct from './SelectedProduct'
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
    createdAt
    parent {
      id
      user {
        id
        username
      }
    }
    replies {
      totalCount
    }
    likes(first: 5) {
      totalCount
      edges {
        node {
          user {
            id
            username
            profile {
              id
              avatar
            }
          }
        }
      }
    }
    user {
      id
      username
      hasFollowed
      isVerified
      profile {
        id
        name
        avatar
        bio
      }
    }
    product {
      id
      name
      slug
      avatar
    }
  }
`

interface Props {
  post: Post
  showParent?: boolean
}

const SinglePost: React.FC<Props> = ({ post, showParent = false }) => {
  const { currentUser } = useContext(AppContext)
  const [togglePostLike] = useMutation<
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
    `,
    {
      onError() {
        toast.error('Something went wrong!')
      },
      onCompleted(data) {
        if (data?.togglePostLike?.hasLiked) {
          toast.success('Post liked successfully')
        } else {
          toast.success('Post disliked successfully')
        }
      }
    }
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
        {post?.parent && showParent && (
          <div className="text-sm flex space-x-1">
            <Link href={`/posts/${post?.parent?.id}`} passHref>
              <a className="text-gray-500 dark:text-gray-400">Replying to</a>
            </Link>
            <Link href={`/@/${post?.parent?.user?.username}`} passHref>
              <a>
                <Slug slug={post?.parent?.user?.username} prefix="@"></Slug>
              </a>
            </Link>
          </div>
        )}
        <div className="flex justify-between items-center">
          <UserProfile user={post?.user as User} />
          <Link href={`/posts/${post?.id}`} passHref>
            <a className="text-sm cursor-pointer">
              {timeago.format(post?.createdAt)}
            </a>
          </Link>
        </div>
        {post?.type === 'POST' && <PostType post={post} />}
        {post?.type === 'REPLY' && <PostType post={post} />}
        {post?.type === 'TASK' && <TaskType task={post} />}
        {post?.type === 'QUESTION' && <QuestionType question={post} />}
      </CardBody>
      <div className="flex px-4 py-3 gap-7 border-t dark:border-gray-800">
        <LikeButton entity={post} handleLike={handleLike} loading={false} />
        <Link href={`/posts/${post?.id}`} passHref>
          <button className="text-blue-500 hover:text-blue-400 flex items-center space-x-2">
            <ChatIcon className="h-5 w-5" />
            {(post?.replies?.totalCount as number) > 0 && (
              <div className="text-xs">{post?.replies?.totalCount}</div>
            )}
          </button>
        </Link>
        {post?.user?.id === currentUser?.id && <DeleteButton entity={post} />}
        {(post?.likes?.totalCount as number) > 0 && (
          <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
            <div>Liked by</div>
            <div className="flex -space-x-1.5 overflow-hidden">
              {post?.likes?.edges?.map((like) => (
                <Link
                  key={like?.node?.user?.id}
                  href={`/@/${like?.node?.user?.username}`}
                  passHref
                >
                  <a>
                    <img
                      className="rounded-full border h-5 w-5"
                      src={like?.node?.user?.profile?.avatar as string}
                      alt={`@${like?.node?.user?.username}'s avatar`}
                    />
                  </a>
                </Link>
              ))}
            </div>
            {(post?.likes?.totalCount as number) > 5 && (
              <div>and {(post?.likes?.totalCount as number) - 5} others...</div>
            )}
          </div>
        )}
        {post?.product && <SelectedProduct product={post?.product} />}
      </div>
    </Card>
  )
}

export default SinglePost
