import { gql, useMutation } from '@apollo/client'
import Slug from '@components/shared/Slug'
import UserProfile from '@components/shared/UserProfile'
import { Card, CardBody } from '@components/ui/Card'
import AppContext from '@components/utils/AppContext'
import { imagekitURL } from '@components/utils/imagekitURL'
import { useOembed } from '@components/utils/useOembed'
import { ChatIcon } from '@heroicons/react/outline'
import mixpanel from 'mixpanel-browser'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { Post, User } from 'src/__generated__/schema.generated'
import * as timeago from 'timeago.js'

import DeleteButton from '../DeleteButton'
import LikeButton from '../LikeButton'
import {
  TogglePostLikeMutation,
  TogglePostLikeMutationVariables
} from './__generated__/index.generated'
import Oembed from './Oembed'
import SelectedTarget from './SelectedTarget'
import CommitType from './Type/Commit'
import NFTType from './Type/NFT'
import PollType from './Type/Poll'
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
    oembedUrl
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
  const router = useRouter()
  const { currentUser } = useContext(AppContext)
  const { oembed, isLoading, isError } = useOembed(post?.oembedUrl)
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
      onError(error) {
        toast.error(error.message)
      }
    }
  )

  const handleLike = (post: any) => {
    mixpanel.track('post.like.click')
    togglePostLike({
      variables: {
        input: { id: post?.id }
      },
      onError() {
        mixpanel.track('post.like.failed')
      },
      onCompleted() {
        mixpanel.track('post.like.success')
      }
    })
  }

  return (
    <Card>
      <CardBody className="space-y-4">
        {!post?.parent &&
          post?.type === 'REPLY' &&
          router.pathname === '/posts/[postId]' && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Post author deleted the parent post
            </div>
          )}
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
        {post?.type === 'POLL' && <PollType post={post} />}
        {post?.type === 'COMMIT' && <CommitType post={post} />}
        {post?.type === 'NFT' && <NFTType post={post} />}
        {post?.type !== 'COMMIT' &&
          post?.oembedUrl &&
          !isLoading &&
          !isError && <Oembed url={post?.oembedUrl} oembed={oembed} />}
      </CardBody>
      <div className="flex px-4 py-3 gap-7 border-t dark:border-gray-800">
        <LikeButton entity={post} handleLike={handleLike} loading={false} />
        <Link href={`/posts/${post?.id}`} passHref>
          <a className="text-blue-500 hover:text-blue-400 flex items-center space-x-2">
            <ChatIcon className="h-5 w-5" />
            {(post?.replies?.totalCount as number) > 0 && (
              <div className="text-xs">{post?.replies?.totalCount}</div>
            )}
          </a>
        </Link>
        {post?.user?.id === currentUser?.id && <DeleteButton post={post} />}
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
                      src={imagekitURL(
                        like?.node?.user?.profile?.avatar as string,
                        50,
                        50
                      )}
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
        <div className="ml-auto">
          {post?.product && <SelectedTarget product={post?.product} />}
        </div>
      </div>
    </Card>
  )
}

export default SinglePost
