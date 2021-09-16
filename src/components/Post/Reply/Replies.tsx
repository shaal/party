import { gql, useQuery } from '@apollo/client'
import { ReplyIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'

import { Post } from '~/__generated__/schema.generated'
import PostsShimmer from '@components/shared/Shimmer/PostsShimmer'
import { EmptyState } from '@components/ui/EmptyState'
import { ErrorMessage } from '@components/ui/ErrorMessage'

import SinglePost, { PostFragment } from '../SinglePost'
import { RepliesQuery } from './__generated__/Replies.generated'

export const REPLIES_QUERY = gql`
  query RepliesQuery($after: String, $id: ID!) {
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
    <div className="pb-5">
      <ErrorMessage title="Failed to load replies" error={error} />
      <div className="space-y-3">
        {replies?.length === 0 ? (
          <EmptyState
            message="Be the first one to reply!"
            icon={<ReplyIcon className="h-8 w-8" />}
          />
        ) : (
          replies?.map((reply: any) => (
            <SinglePost key={reply?.id} post={reply} />
          ))
        )}
        {pageInfo?.hasNextPage && <span ref={observe}></span>}
      </div>
    </div>
  )
}

export default Replies
