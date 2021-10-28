import { gql, useMutation } from '@apollo/client'
import Slug from '@components/shared/Slug'
import UserProfile from '@components/shared/UserProfile'
import { Card, CardBody } from '@components/UI/Card'
import { useOembed } from '@components/utils/hooks/useOembed'
import { humanize } from '@components/utils/humanize'
import { imagekitURL } from '@components/utils/imagekitURL'
import { ChatAlt2Icon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import toast from 'react-hot-toast'
import { Post, User } from 'src/__generated__/schema.generated'
import * as timeago from 'timeago.js'

import LikeButton from '../LikeButton'
import {
  TogglePostLikeMutation,
  TogglePostLikeMutationVariables
} from './__generated__/index.generated'
import PostMenu from './Menu'
import Oembed from './Oembed'
import SelectedCommunity from './SelectedCommunity'
import SelectedProduct from './SelectedProduct'
import CommitType from './Type/Commit'
import PollType from './Type/Poll'
import PostType from './Type/Post'
import QuestionType from './Type/Question'
import TaskType from './Type/Task'

const ViewNFT = dynamic(() => import('./ViewNFT'), {
  loading: () => <div className="shimmer h-10 w-full" />
})

export const PostFragment = gql`
  fragment PostFragment on Post {
    id
    title
    body
    done
    type
    oembedUrl
    hasLiked
    hasBookmarked
    createdAt
    parent {
      id
      user {
        id
        username
      }
    }
    attachments {
      id
      url
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
    community {
      id
      name
      slug
      avatar
    }
    nft {
      id
      address
      tokenId
    }
  }
`

interface Props {
  post: Post
  showParent?: boolean
}

const SinglePost: React.FC<Props> = ({ post, showParent = false }) => {
  const router = useRouter()
  const { oembed, isLoading, isError } = useOembed(post?.oembedUrl)
  const [togglePostLike] = useMutation<
    TogglePostLikeMutation,
    TogglePostLikeMutationVariables
  >(
    gql`
      mutation TogglePostLikeMutation($input: TogglePostLikeInput!) {
        togglePostLike(input: $input) {
          id
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
    togglePostLike({
      variables: {
        input: { id: post?.id }
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
            <Link href={`/posts/${post?.parent?.id}`}>
              <a
                href={`/posts/${post?.parent?.id}`}
                className="text-gray-500 dark:text-gray-400"
              >
                Replying to
              </a>
            </Link>
            <Link href={`/u/${post?.parent?.user?.username}`}>
              <a href={`/u/${post?.parent?.user?.username}`}>
                <Slug slug={post?.parent?.user?.username} prefix="@"></Slug>
              </a>
            </Link>
          </div>
        )}
        <div className="flex justify-between items-center">
          <UserProfile user={post?.user as User} />
          <Link href={`/posts/${post?.id}`}>
            <a href={`/posts/${post?.id}`} className="text-sm cursor-pointer">
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
        {post?.type !== 'COMMIT' &&
          post?.oembedUrl &&
          !isLoading &&
          !isError && <Oembed url={post?.oembedUrl} oembed={oembed} />}
      </CardBody>
      <div className="flex px-3 py-1.5 space-x-5 border-t dark:border-gray-800">
        <LikeButton entity={post} handleLike={handleLike} loading={false} />
        <Link href={`/posts/${post?.id}`}>
          <a
            href={`/posts/${post?.id}`}
            className="text-blue-500 hover:text-blue-400 flex items-center space-x-1"
          >
            <div className="hover:bg-blue-300 hover:bg-opacity-20 p-1.5 rounded-full">
              <ChatAlt2Icon className="h-5 w-5" />
            </div>
            {(post?.replies?.totalCount as number) > 0 && (
              <div className="text-xs">
                {humanize(post?.replies?.totalCount)}
              </div>
            )}
          </a>
        </Link>
        <PostMenu post={post} />
        {(post?.likes?.totalCount as number) > 0 && (
          <div className="text-gray-600 dark:text-gray-400 text-sm items-center gap-2 hidden sm:flex">
            <div>Liked by</div>
            <div className="flex -space-x-1.5 overflow-hidden">
              {post?.likes?.edges?.map((like) => (
                <Link
                  key={like?.node?.user?.id}
                  href={`/u/${like?.node?.user?.username}`}
                >
                  <a href={`/u/${like?.node?.user?.username}`}>
                    <img
                      className="rounded-full border h-5 w-5"
                      src={imagekitURL(
                        like?.node?.user?.profile?.avatar as string,
                        50,
                        50
                      )}
                      alt={`@${like?.node?.user?.username}`}
                    />
                  </a>
                </Link>
              ))}
            </div>
            {(post?.likes?.totalCount as number) > 5 && (
              <div>
                and {humanize((post?.likes?.totalCount as number) - 5)}{' '}
                others...
              </div>
            )}
          </div>
        )}
        {post?.product && <SelectedProduct product={post?.product} />}
        {post?.community && <SelectedCommunity community={post?.community} />}
      </div>
      {post?.nft && <ViewNFT nft={post?.nft} />}
    </Card>
  )
}

export default SinglePost
