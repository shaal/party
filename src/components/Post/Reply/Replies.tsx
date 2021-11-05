import { gql, useQuery } from '@apollo/client'
import PostsShimmer from '@components/shared/Shimmer/PostsShimmer'
import { EmptyState } from '@components/UI/EmptyState'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import { Post, RepliesQuery } from '@graphql/types.generated'
import { ReplyIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'

import SinglePost, { PostFragment } from '../SinglePost'

export const REPLIES_QUERY = gql`
  query Replies($after: String, $id: ID!) {
    post(id: $id) {
      id
      replies(first: 10, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            ...PostFragment
          }
        }
      }
    }
  }
  ${PostFragment}
`

interface Props {
  post: Post
}

const Replies: React.FC<Props> = ({ post }) => {
  const { data, loading, error, fetchMore } = useQuery<RepliesQuery>(
    REPLIES_QUERY,
    {
      variables: {
        after: null,
        id: post?.id
      }
    }
  )
  const replies = data?.post?.replies?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.post?.replies?.pageInfo

  const { observe } = useInView({
    threshold: 1,
    onChange: ({ observe, unobserve }) => {
      unobserve()
      observe()
    },
    onEnter: () => {
      if (pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            after: pageInfo?.endCursor ? pageInfo?.endCursor : null
          }
        })
      }
    }
  })

  if (loading) return <PostsShimmer />

  return (
    <div>
      <ErrorMessage title="Failed to load replies" error={error} />
      <div className="space-y-3">
        {replies?.length === 0 ? (
          <EmptyState
            message="Be the first one to reply!"
            icon={<ReplyIcon className="h-8 w-8 text-brand-500" />}
          />
        ) : (
          replies?.map((reply) => (
            <SinglePost key={reply?.id} post={reply as Post} />
          ))
        )}
        {pageInfo?.hasNextPage && (
          <span ref={observe} className="flex justify-center p-5">
            <Spinner size="md" />
          </span>
        )}
      </div>
    </div>
  )
}

export default Replies
